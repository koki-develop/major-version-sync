# major-version-sync

[![GitHub Release](https://img.shields.io/github/v/release/koki-develop/major-version-sync)](https://github.com/koki-develop/major-version-sync/releases/latest)
[![CI](https://img.shields.io/github/actions/workflow/status/koki-develop/major-version-sync/ci.yml?branch=main&logo=github&style=flat&label=ci)](https://github.com/koki-develop/major-version-sync/actions/workflows/ci.yml)
[![Build](https://img.shields.io/github/actions/workflow/status/koki-develop/major-version-sync/build.yml?branch=main&logo=github&style=flat&label=build)](https://github.com/koki-develop/major-version-sync/actions/workflows/build.yml)

This Action automatically syncs the major version tag when a semantic versioning tag is pushed.  
For example, when you push a tag like `v1.2.3`, it will create or update a `v1` tag pointing to the same commit.

## Usage

```yaml
on:
  push:
    tags:
      - "v*.*.*"

jobs:
  major-version-sync:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: koki-develop/major-version-sync@v1
        with:
          token: ${{ github.token }}
```

## LICENSE

[MIT](./LICENSE)
