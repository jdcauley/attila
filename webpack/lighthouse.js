require('dotenv').config()
const fs = require('fs')
const lighthouse = require('lighthouse')
const ReportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
const chromeLauncher = require('chrome-launcher')
const opn = require('opn')
let siteUrl = process.env.DEV_URL

if ( process.env.LIGHTHOUSE_URL ) {
  siteUrl = process.env.LIGHTHOUSE_URL
}

if ( process.argv.includes('-url') ) {
  if ( process.argv[2] === '-url' ) {
    siteUrl = process.argv[3]
  }
}

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results => {
      // use results.lhr for the JS-consumeable output
      // https://github.com/GoogleChrome/lighthouse/blob/master/types/lhr.d.ts
      // use results.report for the HTML/JSON/CSV output as a string
      // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
      console.log(results.reports)
      return chrome.kill().then(() => results.lhr)
    });
  });
}

// Usage:
setTimeout(() => {
  launchChromeAndRunLighthouse(siteUrl, {}).then(results => {
    // Use results!
    const html = ReportGenerator.generateReport(results, 'html')
    fs.writeFileSync('lighthouse.html', html)
    opn('lighthouse.html', {app: ['google chrome']})
    process.exit(0)
  }).catch( (err) => {
    console.log(err)
  })
}, 5000)
