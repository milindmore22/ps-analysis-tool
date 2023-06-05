<h1 align="center" style="display: block; font-size: 2.5em; font-weight: bold; margin-block-start: 1em; margin-block-end: 1em;">
<a name="logo" href="https://www.privacysandbox.com"><img align="center" src="https://github.com/GoogleChromeLabs/cookie-analysis-tool/assets/506089/62ae89de-430a-4a5b-b5bf-2a1b2f86c712" alt="Privacy Sandbox" style="width:30%;height:100%"/></a>
</h1>

# cookie-analysis-tool!

Cookie Analysis Tooling for learning, understanding, and preparing for the upcoming deprecation of the 3P cookies and the release of [Privacy Sandbox APIs](https://privacysandbox.com/open-web/#proposals-for-the-web).

## Table of contents[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#table-of-contents)
- [Privacy Sandbox](#privacy-sandbox)
- [Cookie Analysis](#cookie-analysis)
- [Examples](#examples)
- [Call to action](#call-to-action)
- [Resources](#resources)

# Privacy Sandbox

[Privacy Sandbox](https://privacysandbox.com/) is a multi-year [initiative by Google](https://developer.chrome.com/docs/privacy-sandbox/overview/) for building a more private web by defining a set of building blocks (i.e. proposed APIs) enabling [a new privacy model for the web](https://github.com/michaelkleber/privacy-model). This Initiative encompasses three tracks:

1. Replacing functionality powered by third-party cookies with privacy-preserving alternatives.

2. Turning down third-party cookies, while  ensuring that the ecosystem has the technical capabilities for embracing new privacy-preserving solutions (e.g. First Party Sets, Topics, etc.)

3. Mitigating workarounds, by ensuring developers have a well-lit path to the new capabilities of the platform, and avoid pursuing tracking via other means. 

# Cookie Analysis

## Extension
A chrome extension to give info about cookie usage in a browsing experience.

## CLI

A CLI tool which crawls a sitemap (provided as an argument) and outputs a JSON file in out folder. This JSON file will have all lists of all 3p cookies set on a site visit

## Usage instructions

- Clone this Cookie Analysis Tool Repository
- `npm install` Install all dependencies

### Extension

- `npm run extension:dev` or `npm run extension:build` to genrate a build in `/dist/extension`
- Click on "Load Unpacked" button on [chrome://extensions/](chrome://extensions/) and upload `dist/extension` folder

### CLI

- `npm run cli:build` to genrate a build in `/dist/cli`.
- Run the cli util providing a sitemap as input. E.g. `node dist/cli/index.js -s https://<example.com>/sitemap_index.xml\`.

# Examples

# Call to Action

# Resources

* [The Privacy Sandbox](https://privacysandbox.com/)
* [A Potential New Privacy Model for the Web](https://github.com/michaelkleber/privacy-model)

# Contributing
Please refer to our contribution [guidelines](docs/CONTRIBUTING.md) and [code of conduct](docs/code-of-conduct.md).
