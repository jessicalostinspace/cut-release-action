#!/bin/bash

set -eou pipefail

branchName=$1
repositoryUrl=$2

git checkout -b $branchName
git push --set-upstream origin $repositoryUrl $branchName
echo '"Created " $branchName" in $repositoryUrl'