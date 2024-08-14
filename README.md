# major-version-sync

[![GitHub Release](https://img.shields.io/github/v/release/koki-develop/major-version-sync)](https://github.com/koki-develop/major-version-sync/releases/latest)
[![CI](https://img.shields.io/github/actions/workflow/status/koki-develop/major-version-sync/ci.yml?branch=main&logo=github&style=flat&label=ci)](https://github.com/koki-develop/major-version-sync/actions/workflows/ci.yml)
[![Build](https://img.shields.io/github/actions/workflow/status/koki-develop/major-version-sync/build.yml?branch=main&logo=github&style=flat&label=build)](https://github.com/koki-develop/major-version-sync/actions/workflows/build.yml)

Syncs the major version tag with the current tag.

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
