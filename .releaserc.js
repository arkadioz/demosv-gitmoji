// in ".releaserc.js" or "release.config.js"
const path = require('path')
const { promisify } = require('util')
const dateFormat = require('dateformat')
const readFileAsync = promisify(require('fs').readFile)

// Given a `const` variable `TEMPLATE_DIR` which points to "<semantic-release-gitmoji>/lib/assets/templates"

// the *.hbs template and partials should be passed as strings of contents
const template = readFileAsync(path.join(__dirname, 'default-template.hbs'))
const commitTemplate = readFileAsync(path.join(__dirname, 'commit-template.hbs'))

module.exports = {
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
  ],
     "branches": [
       "main",
       {
         "name": "beta",
         "prerelease": true
       }
     ]
}