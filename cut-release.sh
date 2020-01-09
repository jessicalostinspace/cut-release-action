#!/bin/bash

set -eou pipefail

branchName=$1
repositoryUrl=$2

git checkout -b $branchName
git remote set-url origin $repositoryUrl
git push --set-upstream origin $branchName
echo 'Created '$branchName' in '$repositoryUrl