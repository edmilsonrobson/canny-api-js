# Undocumented properties & inconsistencies

This is a general list of undocumented properties on the Canny API and inconsitencies in the API's documentation.

## Boards

There's an undocument `token` attribute on each board object on the `List all boards` section.

## Posts

The following Posts properties show up on API responses, but are not properly documented:

`mergeHistory`
`statusChangedAt`
`totalMRR`
`jira.linkedIssueIDs`

On the `Create post` section, the `Returns` subsection doesn't specify that the returned id is the id of the created post.

## Users

When requesting `/users/list`, the response doesn't contain a `hasMore` boolean attribute in the response. When you list posts, for example, the `hasMore` flag is there. **Changing this would be a breaking change.** Continuously querying for more users with the `skip` flag until it returns an empty array is an acceptable substitute, but the inconsistency still exists.

On the `Delete user` section, the Example Request uses a `userID` as an argument rather than the `id`. The example response should also be displayed as a string: `"success"`.
