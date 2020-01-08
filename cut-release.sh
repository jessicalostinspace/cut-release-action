#!/bin/bash

set -eou pipefail

branchName=$1
GITHUB_ACTOR=$2
GITHUB_REPOSITORY=$3
GIHTUB_TOKEN=$4


git checkout -b $branchName
git push --set-upstream origin 'https://$GITHUB_ACTOR:$GITHUB_TOKEN@github.com/$GITHUB_REPOSITORY.git' $branchName
echo '"Created " $branchName"'