
# Cut Release Branch

This action cuts a new release branch with a branch name of `<prefix><semantic-version>`.

## Inputs

### `repository-url`

**Required** The repository url you are running the action in. 
    `'https://${{ github.actor }}:${{ secrets.GITHUB_TOKEN }}@github.com/${{ github.repository }}.git'`

### `branch-prefix`

**Required** The prefix you would like prepended to the branch name.

### `semantic-version`

**Required** The bumped semantic version you would like to create a new branch with.

## Outputs

### `release-branch-name`

The name of the new release branch.

## Example usage

    - name: Cut Release Branch
      id: crb
      uses: jessicalostinspace/cut-release-action@v1.0.0
      with:
        repository-url: 'https://${{ github.actor }}:${{ secrets.GITHUB_TOKEN }}@github.com/${{ github.repository }}.git'
        branch-prefix: 'release-v'
        semantic-version: ${{ steps.bsv.outputs.bumped-semantic-version }}
