const core = require('@actions/core');
const { exec } = require('child_process');

try {
  const branchPrefix = core.getInput('branch-prefix');
  const semanticVersion = core.getInput('semantic-version');
  const branchName = branchPrefix + semanticVersion;
  console.log("branchName : ", branchName)
  const regexp = /^[A-Za-z0-9_-]*$/;
  if (regexp.test(branchName)) {
    const commands = 'set -e &&\ git checkout -b "$branchName" &&\ git push --set-upstream origin "$branchName" &&\ echo ""Created " $branchName"';
    const output = cutReleaseBranch(commands);
    console.log('output', output);
    // output.then(function(result){
    //   if (result["semanticVersion"]) {
    //     console.log('\x1b[32m%s\x1b[0m', `Last Semantic Version Found: ${result["semanticVersion"]}`);
    //     core.setOutput("last-semver", result["semanticVersion"]);
    //   }
    // });
  } else {
    const regexError = "Branch prefix and semantic version must contain only numbers, strings, underscores, and dashes.";
    console.log('\x1b[33m%s\x1b[0m', regexError);
    core.setFailed(regexError);
  }
} catch (error) {
  core.setFailed(error.message);
}

function cutReleaseBranch(commands) {
  try{
    const { err, stdout, stderr } = exec(commands, [{ shell: "bash" }]);

    if (err) {
      console.log('\x1b[33m%s\x1b[0m', 'Could not create new release branch because: ');
      console.log('\x1b[31m%s\x1b[0m', stderr);
      process.exit(1);
  
      return;
    }
    // console.log("stdout :", stdout)
    // const data = JSON.parse(stdout);
    // if (data) {
    //   return data;
    // }
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
}