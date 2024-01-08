const Handlebars = require('handlebars');
const path = require('path');
const {
   promisify
} = require('util');
const dateFormat = require('dateformat');
const readFileAsync = promisify(require('fs').readFile);

// the *.hbs template and partials should be passed as strings of contents
const template = readFileAsync(path.join(__dirname, '/lib/assets/templates/default-template.hbs'));
const commitTemplate = readFileAsync(path.join(__dirname, '/lib/assets/templates/commit-template.hbs'));

module.exports = {
   branches: [
      "main",
      {
         name: 'cookie',
         prerelease: true
      },
   ],
   plugins: [
      [
         'semantic-release-gitmoji', {
            releaseRules: {
               major: [':boom:'],
               minor: [':sparkles:'],
               patch: [
                  ':bug:',
                  ':ambulance:',
                  ':lock:',
                  ':zap:',
                  ':hammer:'
               ]
            },
            releaseNotes: {
               template,
               partials: {
                  commitTemplate
               },
               helpers: {
                  formatDate: function(date) {
                    return dateFormat(date, 'yyyy-mm-dd HH:MM:ss');
                  },
                  split: function(string) {
                     return string.trim().split('\n');
                  },
                  formatDateCol: function(date) {
                   return date.toLocaleString('en-US', { timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(',', '');
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
            "changelogTitle": "# Gitmoji Changelog \uD83C\uDF88"
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
               ':bookmark: v${nextRelease.version} [skip ci]',
               '',
               'https://github.com/arkadioz/demosv-gitmoji/releases/tag/${nextRelease.gitTag}'
            ].join('\n')
         }
      ]
   ]
};