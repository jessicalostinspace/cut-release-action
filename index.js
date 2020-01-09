const core = require('@actions/core');
const exec = require('@actions/exec');

const src = __dirname;
console.log("src: ", src)
core.debug(`src: ${src}`);

try {
  const branchPrefix = core.getInput('branch-prefix');
  const semanticVersion = core.getInput('semantic-version');
  const branchName = branchPrefix + semanticVersion;

  const repositoryUrl = core.getInput('repo-url2');
  console.log('repository-url', repositoryUrl);

  const regexp = /^[\.A-Za-z0-9_-]*$/;
  if (regexp.test(branchName)) {
    const output = cutReleaseBranch(branchName, repositoryUrl);
    output.then(function(result){
        console.log("result: ", result)
    //   if (result["semanticVersion"]) {
    //     console.log('\x1b[32m%s\x1b[0m', `Last Semantic Version Found: ${result["semanticVersion"]}`);
        // core.setOutput("last-semver", result["semanticVersion"]);
    //   }
    });
  } else {
    const regexError = "Branch prefix and semantic version must contain only numbers, strings, underscores, periods, and dashes.";
    console.log('\x1b[33m%s\x1b[0m', regexError);
    core.setFailed(regexError);
  }
} catch (error) {
  core.setFailed(error.message);
}

async function cutReleaseBranch(branchName, repositoryUrl) {
  try{
    const execOutput = await exec.exec(`${src}/cut-release.sh ${branchName} ${repositoryUrl}`);
    core.debug("execOutput:", execOutput.then((result) => console.log("result", result)))

    if (err) {
      console.log('\x1b[33m%s\x1b[0m', 'Could not create new release branch because: ');
      console.log('\x1b[31m%s\x1b[0m', stderr);
      process.exit(1);
  
      return;
    }

    // const data = JSON.parse(stdout);
    // if (data) {
    //   return data;
    // }
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
}