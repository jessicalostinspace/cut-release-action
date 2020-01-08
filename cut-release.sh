#!/bin/bash

set -eou pipefail

branchName=$1

git checkout -b $branchName
git push --set-upstream origin $branchName
echo '"Created " $branchName"'