# Undocumented properties & inconsistencies

This is a general list of undocumented properties on the Canny API and inconsitencies in the API's documentation.

## Boards

There's an undocumented `token` attribute on each board object on the `List all boards` section.
The `List all boards` request doesn't have a `hasMore` flag - but that might make sense if the max number of boards is limited.

## Comments

On the `Delete comment` section, the example response should be displayed as a string: `"success"`.

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

## Users

When requesting `/users/list`, the response doesn't contain a `hasMore` boolean attribute in the response. When you list posts, for example, the `hasMore` flag is there. **Changing this would be a breaking change.** Continuously querying for more users with the `skip` flag until it returns an empty array is an acceptable substitute, but the inconsistency still exists.

On the `Delete user` section, the Example Request uses a `userID` as an argument rather than the `id`. The example response should also be displayed as a string: `"success"`.

## Votes

On the `Delete vote` section, the arguments to delete are the postID and the voterID. Why not use the `voteID`?

Votes have an undocumented `zendeskTicket` attribute not listed in the `Attributes` section of `The vote object` part of the docs.

## Webhooks

On the example given for webhooks, the `Post` on the `object` attribute is missing multiple attributes that you would expect when querying for a `Post`, such as `by`, `category`, `jira`, `mergeHistory`
