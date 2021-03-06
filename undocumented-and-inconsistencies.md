# Undocumented properties & inconsistencies

This is a general list of undocumented properties on the Canny API and inconsitencies in the API's documentation.

## Boards

There's an undocumented `token` attribute on each board object on the `List all boards` section.
The `List all boards` request doesn't have a `hasMore` flag - but that might make sense if the max number of boards is limited.

## Posts

The following Posts properties show up on API responses, but are not properly documented:

`mergeHistory`
`statusChangedAt`
`totalMRR`
`jira.linkedIssueIDs`

On the `Create post` section, the `Returns` subsection doesn't specify that the returned id is the id of the created post.

On `Change post status`, the `shouldNotifyVoters` attribute is mandatory. To be more consistent with how the `Create comment` request works, where the `shouldNotifyVoters` is optional, that same `shouldNotifyVoters` on `Change post status` should also optional and default to false.

On the returned `post.author` and `post.board`, the following properties are missing:
`author` - `lastActivity` and `avatarURL`
`board` - `isPrivate`

On the `Retrieve post` section, the `changeComment` attribute in the response example is not documented.

Examples of error responses are only available in three methods: `Change Post status`, `Add post tag`, `Remove post tag`. Other methods, even outside of the `Posts` entity, do not provide examples of error messages.

## Users

When requesting `/users/list`, the response doesn't contain a `hasMore` boolean attribute in the response. When you list posts, for example, the `hasMore` flag is there. **Changing this would be a breaking change.** Continuously querying for more users with the `skip` flag until it returns an empty array is an acceptable substitute, but the inconsistency still exists.

## Votes

On the `Delete vote` section, the arguments to delete are the postID and the voterID. Why not use the `voteID`?

Votes have an undocumented `zendeskTicket` attribute not listed in the `Attributes` section of `The vote object` part of the docs.

On the `List votes` section, the example response is not in a valid `json` format (there's a missing `}` on the `zendeskTicket` attribute)

## Webhooks

On the example given for webhooks, the `Post` on the `object` attribute is missing multiple attributes that you would expect when querying for a `Post`, such as `by`, `category`, `jira`, `mergeHistory`.
