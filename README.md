# Canny API JS

**WARNING**: This is not ready for use in production yet. Still a WIP with likely breaking changes. Use at your own risk!

Unofficial node API wrapper for Canny's API (https://canny.io/) with built-in caching (WIP) and the ability to fetch all entities via successive paginated requests (WIP).

**This API is not intended to be used on the front-end**, as it would expose your Canny API Key.

## Installation

```
npm i canny-api-js
```

## How to use

Instantiate a new `canny` object by passing your API key, then use it to access all available entities and methods.

**Javascript Example**

```js
const CannyAPI = require("canny-api-js").default;

const canny = new CannyAPI({
    apiKey: <yourApiKeyHere>,
});

const votesResponse = await canny.votes.list();
console.log({ votesResponse });
```

**Typescript Example**

```ts
import CannyAPI from 'canny-api-js';

const canny = new CannyAPI({
  apiKey: <yourApiKeyHere>,
});

const votesResponse = await canny.votes.list();
console.log({ votesResponse });
```

## Available Entities and Methods

These are the available entities:

## `Boards`

**_Example implementation_**

```ts
const { boards } = await canny.boards.list();
console.log({ boards });

const board = await canny.boards.retrieve('my-board-id');
console.log({ board });
```

**_Available Methods_**

### list

_no parameters_

Returns a list of boards.

### retrieve

`id: string`

Returns the board with a certain `id`.

## `Changelog Entries`

**_Example implementation_**

```ts
const { hasMore, entries } = await canny.changelogEntries.list({
  labelIDs: ["label-1", "label-2"]
  sort: "lastSaved",
});
console.log({ hasMore, entries });
```

**_Available Methods_**

### list

```ts
args?: {
  /** Fetch only entries with at least one of the labels in the array. */
  labelIDs?: string[];
  /** The number of entries you'd like to fetch. Defaults to 10 if not specified. */
  limit?: number;
  /** The number of entries you'd like to skip before starting to fetch. Defaults to 0 if not specified. */
  skip?: number;
  /** The order in which the entries should be fetched. Options include: "created", "lastSaved", "nonPublishedFirst", "publishedAt". Defaults to "nonPublishedFirst" if not specified. */
  sort?: CannyChangelogEntrySortOptions;
  /** The type of entries to fetch. Value can be "new", "improved", or "fixed". */
  type?: CannyChangelogEntryType;
}
```

Returns a list of changelog entries.

(Work in Progress)

---

## Roadmap

- [ ] Add better typechecking for webhooks. The `object` attribute on webhook events has inconsistent typing compared to other API requests to the same resource (see [Undocumented and Inconsistencies](./undocumented-and-inconsistencies.md))

- [ ] Add more typechecking for subqueries that dont have all attributes (e.g `Posts.author` doesn't have the user `avatarURL`, but `User` has)

- [ ] Ability to automagically list ALL paginated queries by calling multiple times

- [ ] Built-in caching

## Undocumented attributes and Inconsistencies

A list of current undocumented attributes and inconsistent behavior of Canny's API is written [here](./undocumented-and-inconsistencies.md).
