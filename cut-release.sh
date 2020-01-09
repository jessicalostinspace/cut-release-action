#!/bin/bash

set -eou pipefail

branchName=$1
repositoryUrl=$2

echo $(git checkout -b $branchName)
echo $(git remote set-url origin $repositoryUrl)
echo $(git push --set-upstream origin $branchName)
echo 'Created '$branchName' in '$repositoryUrl