type CannyPostStatus =
  | 'open'
  | 'under review'
  | 'planned'
  | 'in progress'
  | 'complete'
  | 'closed'
  | string;

type CannyPostSortOptions =
  | 'newest'
  | 'oldest'
  | 'relevance'
  | 'score'
  | 'statusChanged'
  | 'trending';

type CannyChangelogEntrySortOptions =
  | 'created'
  | 'lastSaved'
  | 'nonPublishedFirst'
  | 'publishedAt';

type CannyChangelogEntryType = 'new' | 'improved' | 'fixed';

interface ICannyAPIConfig {
  apiKey: string;
}

interface ICannyBoard {
  /** A unique identifier for the board. */
  id: string;
  /** Time at which the board was created, in ISO 8601 format. */
  created: string;
  /** (Undocumented) A boolean indicating if the board is private or not. */
  isPrivate: boolean;
  /** The board's name. */
  name: string;
  /** The number of non-deleted posts associated with the board. This number includes posts that are marked as closed or complete.  */
  postCount: number;
  /** The URL to the board's page. */
  url: string;
}

interface ICannyBoardWithToken extends ICannyBoard {
  /** (Undocumented) The board's token. */
  token: string;
}

interface ICannyUser {
  /** A unique identifier for the user. */
  id: string;
  /** Link to the user's avatar image. */
  avatarURL: string | null;
  /** Time at which the user was created, in ISO 8601 format. */
  created: Date;
  /** The user's email. This field can be null, for example when you create a new user by voting on behalf of them. */
  email?: string;
  /** Whether or not the user is a Canny admin. */
  isAdmin: boolean;
  /** Time at which the user interacted with your company for the last time, in ISO 8601 format.   */
  lastActivity: Date;
  /** The user's name. */
  name: string;
  /** The URL of the user's profile. */
  url: string;
  /** The user's unique identifier in your application. This field can be null. We only have this data if the user was authenticated via single sign-on, or if it was added via API.  */
  userID: string | null;
}

interface ICannyTag {
  id: string;
  name: string;
  postCount: number;
  url: string;
}

interface ICannyCategory {
  id: string;
  name: string;
  postCount: number;
  url: string;
}

interface ICannyJiraIssue {
  id: string;
  key: string;
  url: string;
}

interface ICannyJiraAttribute {
  linkedIssues: ICannyJiraIssue[];
  /** (Undocumented) */
  linkedIssueIDs: any[];
}

interface ICannyPost {
  /** A unique identifier for the post. */
  id: string;
  /** The user who authored the post. If the author's account has been deleted, this field will be null. */
  author: ICannyUser;
  /** The board this post is associated with. */
  board: ICannyBoard;
  /** The user who created the post on behalf of the author. */
  by: ICannyUser | null;
  /** The category this post is assigned to, if any. */
  category: ICannyCategory | null;
  /** The number of non-deleted comments associated with this post. */
  commentCount: number;
  /** Time at which the post was created, in ISO 8601 format. */
  created: Date;
  /** Any details the user included in the post. This is the longer text field (where the shorter one is "title"). */
  details: string;
  /** The month and year the post is estimated to be delivered. */
  eta: string | null;
  /** An array of the URLs of the images associated with this post */
  imageURLs: string[];
  /** A list of Jira issues that are linked with this post */
  jira: ICannyJiraAttribute;
  /** (Undocumented) */
  mergeHistory: any[];
  /** The owner of the post */
  owner: ICannyUser | null;
  /** The number of votes that have been cast on this post. */
  score: number;
  /** The post's status: "open", "under review", "planned", "in progress", "complete", "closed", or any other status your team has set on the settings page. */
  status: CannyPostStatus;
  /** (Undocumented) */
  statusChangedAt: Date;
  /** The list of tag objects associated with this post. */
  tags: ICannyTag[];
  /** A brief title describing the post. This is the shorter text input (where the longer is details). */
  title: string;
  /** (Undocumented) */
  totalMRR: number;
  /** The URL to the post's page. */
  url: string;
}

interface ICannyCustomFields {
  [key: string]: string;
}

interface ICannyLabel {
  id: string;
  created: Date;
  entryCount: number;
  name: string;
  url: string;
}

interface ICannyChangelogEntry {
  id: string;
  created: Date;
  labels: ICannyLabel[];
  lastSaved: Date;
  markdownDetails: string;
  plaintextDetails: string;
  posts: ICannyPost[];
  publishedAt: Date | null;
  scheduledFor: Date | null;
  status: 'draft' | 'scheduled' | 'published';
  types: CannyChangelogEntryType[];
  url: string;
}
