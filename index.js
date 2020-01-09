const core = require('@actions/core');
const exec = require('@actions/exec');

const src = __dirname;

try {
  const branchPrefix = core.getInput('branch-prefix');
  const semanticVersion = core.getInput('semantic-version');
  const branchName = branchPrefix + semanticVersion;
  const repositoryUrl = core.getInput('repository-url');
  const regexp = /^[\.A-Za-z0-9_-]*$/;

  if (regexp.test(branchName)) {
    cutReleaseBranch(branchName, repositoryUrl);
  } else {
    const regexError = "Branch prefix and semantic version must contain only numbers, strings, underscores, periods, and dashes.";
    console.log('\x1b[33m%s\x1b[0m', regexError);
    core.setFailed(regexError);
  }
} catch (error) {
  core.setFailed(error.message);
}

async function cutReleaseBranch(branchName, repositoryUrl) {
  try {
    let output = '';
    let err = '';

    const options = {};
    options.listeners = {
      stdout: (data) => {
        output += data.toString();
      },
      stderr: (data) => {
        err += data.toString();
      }
    };
    options.cwd = './';

    await exec.exec(`${src}/cut-release.sh`, [branchName, repositoryUrl], options);
    console.log("output: ", output)
    if (output) {
      console.log('\x1b[32m%s\x1b[0m', `Github Output: ${output}`);
      core.setOutput("release-branch-name", branchName);
    }

    if (err) {
      core.setFailed(`Could not cut release branch because: ${err}`);
      process.exit(1);

      return;
    }
  } catch (err) {
    core.setFailed(err.message);
    process.exit(0);
  }
}