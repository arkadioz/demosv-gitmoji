const path = require('path')
const fs = require('fs')
const dateFormat = require('dateformat')

// the *.hbs template and partials should be passed as strings of contents
const tplFile = path.resolve(__dirname, '/lib/assets/templates/default-template.hbs')
const commitTemplate = path.resolve(__dirname, '/lib/assets/templates/commit-template.hbs')

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
          template: fs.readFileSync(tplFile, 'utf-8'),
          partials: fs.readFileSync(commitTemplate, 'utf-8'),
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
    '@semantic-release/github'
  ]
}
