// in ".releaserc.js" or "release.config.js"
const path = require('path')
const { promisify } = require('util')
const dateFormat = require('dateformat')
const readFileAsync = promisify(require('fs').readFile)

// the *.hbs template and partials should be passed as strings of contents
const template = readFileAsync(path.join(__dirname, '/lib/assets/templates/default-template.hbs'))
const commitTemplate = readFileAsync(path.join(__dirname, '/lib/assets/templates/commit-template.hbs'))

module.exports = {
  branches: [
    "main",
  ],
  plugins: [
    [
      'semantic-release-gitmoji', {
        releaseRules: {
          major: [ ':boom:' ],
          minor: [ ':sparkles:' ],
          patch: [
            ':bug:',
            ':ambulance:',
            ':lock:',
            ':zap:'
          ]
        },
        releaseNotes: {
          template,
          partials: { commitTemplate },
          helpers: {
            datetime: function (format = 'UTC:yyyy-mm-dd') {
              return dateFormat(new Date(), format)
            }
          },
          issueResolution: {
            template: '{baseUrl}/{owner}/{repo}/issues/{ref}',
            baseUrl: 'https://github.com',
            source: 'github.com',
            removeFromCommit: false,
            regex: /#\d+/g
          }
        }
      }
    ],
    '@semantic-release/github',
    [
          '@semantic-release/git',
          {
            message: [
              ':bookmark: v${nextRelease.version} [skip ci]',
              '',
              'https://github.com/arkadioz/demosv-gitmoji/releases/tag/${nextRelease.gitTag}'
            ].join('\n')
          }
    ]
  ]
}