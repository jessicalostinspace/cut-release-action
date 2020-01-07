#!/bin/bash
set -e

regexString=$1

semanticVersion=''
branchName=''
if [ $regexString ]; then 
    branchName=$(echo $(git branch -a | grep $regexString | grep -E '([0-9]+\.){2}[0-9]+' | sort --version-sort | tail -n 1 | sed 's@.*/@@'))
    semanticVersion=$(echo $(git branch -a | grep $regexString | egrep -o '([0-9]+\.){2}[0-9]+' | sort --version-sort | tail -n 1))
else 
    branchName=$(echo $(git branch -a | grep -E '([0-9]+\.){2}[0-9]+' | sort --version-sort | tail -n 1 | sed 's@.*/@@'))
    semanticVersion=$(echo $(git branch -a | egrep -o '([0-9]+\.){2}[0-9]+' | sort --version-sort | tail -n 1))
fi

echo '{"semanticVersion": "'$semanticVersion'", "branchName": "'$branchName'"}' 
