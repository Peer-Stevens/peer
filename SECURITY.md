# Security and Privacy

Here potential security and privacy risks are documented so that they can be tracked and solved.

## API Keys in Source Code

~~Currently, we are using `react-native-dotenv` for environment variables. These environment variables may include API keys. Because this is an app not simply intended to run a remote server where only a few users will be able to access the source code, but instead directly on a user's device a user can decompile the source code in order to determine our API keys in plaintext. If a user does this, they will gain unauthorized access to our API key, potentially exhausting our quotas causing functionality to go offline, or charging us money.~~

As of #90, `react-native-dotenv` has been removed.

## Data Collection

~~In order to use Peer, users are required to authenticate, with sign-in information including their email address. If our database service were to be attacked and breached, users would have their email information leaked. This email information may be bought and sold in order to send them spam emails.~~

As of [#11](https://github.com/Peer-Stevens/peer-server/pull/11), users are not expected to sign-in with an email address, only a username.

## External Packages

The Javascript (and by extension, Typescript) ecosystem depends highly on external packages made by authors of varying skill and trustworthiness. A single project (including this one) may depend on hundreds of libraries, and inherits all of the vulnerabilities of each library imported.

In order to mitigate this risk, the maintainers of this repository are making use of Github's Dependabot feature. Dependabot scans all of the packages that are currently installed (including the dependencies of those package recursively) and alerts the maintainers of the repository when the community has discovered a vulnerability and there is a patch available.

## Remote Server and Places API

~~Peer makes uses of the Google Places API by connecting to a remote server that is being hosted in the cloud. This remote server requires no authentication to make requests to. Any would-be attacker that finds this public URL for the server could continually make requests to the server until the API quota has been exhausted. This would cause Google Places functionality in Peer to break, accrue charges for the maintainers to pay, or both.~~

~~Adding an authentication key for the Peer server in the form of an environment variable will not solve this problem for the reason outlined in the section "API Keys in Source Code".~~

As of [#13](https://github.com/Peer-Stevens/peer-server/pull/13), `express-rate-limit` is a middleware that has been implemented to limit how many requests can be made to the server in a given period of time. This is just the first iteration of this solution's implementation; this will be revisited and further refined later. For now, it does the bare minimum of limiting requests.

## Remote Server and Denial-of-Service (DoS) Attack

~~Peer connects to a remote server in the cloud for certain functionality. If the number of Peer's users grows too large, or an attacker finds the remote server's public URL and writes a malicious script, a continuous barrage of requests could be made to the remote server too large for it to handle. This would cause all functionality that requires the remote server to break; both database management and the Places API (described above).~~

As of [#13](https://github.com/Peer-Stevens/peer-server/pull/13), `express-rate-limit` is a middleware that has been implemented to limit how many requests can be made to the server in a given period of time. This is just the first iteration of this solution's implementation; this will be revisited and further refined later. For now, it does the bare minimum of limiting requests.

## Storing Ratings Attached to a User

Peer allows users to make a rating on a location that they have (ostensibly) visited. This rating is stored as data that includes the user who made the rating and the location that is being rated. A savvy user of the public API, or a maintainer of the database storing this data, may observe the rating habits of a single user. This will result in a cluster of locations being observed for one user. Because a user is more likely to rate places near where they live, this will expose information about the user's current whereabouts. Additionally, because Peer's user-base is primarily made up of people with vision impairments, and people with vision impairments have clearly identifiable tools to help them navigate (guide dog, cane, etc.), users can be more easily identified than the average user of such a tool. In summary, bad actors may deduce the location of a user, then identify the user and act on this information.