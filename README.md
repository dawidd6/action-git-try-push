# Git try push Github Action

An action that tries to make a `git push`. If it does not succeed, then wait some time and try again. The number of maximum tries is controllable via `tries` input.

## Usage

```yaml
- name: Try pushing
  uses: dawidd6/action-git-try-push@master
  with:
    # Optional, used for pushing
    token: ${{github.token}}
    # Optional, defaults to current directory
    directory: path/to/repo
    # Optional, defaults to 10
    tries: 20
```
