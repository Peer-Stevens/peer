# Security and Privacy

Here potential security and privacy risks are documented so that they can be tracked and solved.

## API Keys in Source Code

Currently, we are using `react-native-dotenv` for environment variables. These environment variables may include API keys. Because this is an app not simply intended to run a remote server where only a few users will be able to access the source code, but instead directly on a user's device a user can decompile the source code in order to determine our API keys in plaintext. If a user does this, they will gain unauthorized access to our API key, potentially exhausting our quotas causing functionality to go offline, or charging us money.

## Data Collection

In order to use Peer, users are required to authenticate, with sign-in information including their email address. If our database service were to be attacked and breached, users would have their email information leaked. This email information may be bought and sold in order to send them spam emails.

## External Packages

The Javascript (and by extension, Typescript) ecosystem depends highly on external packages made by authors of varying skill and trustworthiness. A single project (including this one) may depend on hundreds of libraries, and inherits all of the vulnerabilities of each library imported.

In order to mitigate this risk, the maintainers of this repository are making use of Github's Dependabot feature. Dependabot scans all of the packages that are currently installed (including the dependencies of those package recursively) and alerts the maintainers of the repository when the community has discovered a vulnerability and there is a patch available.
