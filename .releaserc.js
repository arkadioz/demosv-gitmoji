// en ".releaserc.js" o "release.config.js"
const path = require('path');
const { promisify } = require('util');
const dateFormat = require('dateformat');
const readFileAsync = promisify(require('fs').readFile);

// los archivos *.hbs deben pasarse como cadenas de contenido
const template = readFileAsync(path.join(__dirname, '/lib/assets/templates/default-template.hbs'));
const commitTemplate = readFileAsync(path.join(__dirname, '/lib/assets/templates/commit-template.hbs'));

module.exports = {
  branches: [
    "main",
    {name: 'cookie', prerelease: true},
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
              return dateFormat(new Date(), format);
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
      "@semantic-release/exec",
      {
        "prepareCmd": "mvn versions:set -DnewVersion=\"${nextRelease.version}\" && mvn clean install"
      }
    ],
    [
          "@semantic-release/changelog",
          {
            "changelogFile": "docs/CHANGELOG.md",
            "changelogTitle": "# :balloon: Gitmoji Changelog :lollipop:"
          }
    ],
    [
      '@semantic-release/git',
      {
        assets: [
                "**/pom.xml",
                "docs/CHANGELOG.md"
              ],
        message: [
          ':bookmark: v${nextRelease.version} [skip ci]'
        ]
      }
    ]
  ]
};
