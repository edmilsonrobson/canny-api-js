# Undocumented properties & inconsistencies

This is a general list of undocumented properties on the Canny API and inconsitencies in the API's documentation.

## Boards

There's an undocument `token` attribute on each board object on the `List all boards` section.

## Users

On the `Delete user` section, the Example Request uses a `userID` as an argument rather than the `id`. The example response should also be displayed as a string: `"success"`.
