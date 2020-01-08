#!/bin/bash

set -eou pipefail

branchName=$1
repositoryUrl=$2

git checkout -b $branchName
git push --set-upstream origin 'https://$GITHUB_ACTOR:$GITHUB_TOKEN@github.com/$GITHUB_REPOSITORY.git' $branchName
echo '"Created " $branchName"'