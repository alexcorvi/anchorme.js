# Contributing

## Using the issue tracker

The [issue tracker](https://github.com/alexcorvi/anchorme.js/issues) is the preferred channel for bug reports, features requests and submitting pull requests, but please respect the following rules:

-   Please **do not** derail or troll issues. Keep the discussion on topic and respect the opinions of others.

-   Please **do not** post comments consisting solely of "+1" or "👍". Use [GitHub's "reactions" feature](https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments) instead. We reserve the right to delete comments which violate this rule.

-   Please **do not** write [enhancement]/[bug]/[Feature request] or similar stuff in the title of issues, as there are labels for that purpose that will be added by devs or collaborators.

## Cloning and setting up the dev environment

### Cloning

1. Clone the repository `git clone https://github.com/alexcorvi/anchorme.js.git`;
2. Run yarn install `yarn install`

### Building

Using the npm script `yarn run build`

### Testing

using the npm script `yarn run test`

### Setup build watch

Use the npm script `yarn run buildw` to setup file watching process that will rebuild the code on any change

### Setup test watch

Use the np, script `yarn run testw`

> Please note that the test watcher will not update the source code when it changes, if you update the source code you need to exist the test watcher and run it again, test watcher only updates the code in the `test/` directory.

### Setup lite-server

Use the npm script `yarn run server` to start a server for the index.html file which holds the demo

### License

By contributing your code, you agree to license your contribution under the MIT Licence.
