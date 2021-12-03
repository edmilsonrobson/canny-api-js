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
  /** A unique identifier for the entry. */
  id: string;
  /** Time at which the entry was first created, in ISO 8601 format. */
  created: Date;
  /** The list of labels that the entry is associated with. */
  labels: ICannyLabel[];
  /** Time at which the entry was last updated, in ISO 8601 format. */
  lastSaved: Date;
  /** The markdown contents of the entry. */
  markdownDetails: string;
  /** The plaintext contents of the entry, with images, videos, and links stripped. */
  plaintextDetails: string;
  /** The list of posts this entry is linked to. */
  posts: ICannyPost[];
  /** Time at which the entry was published, if it has been published. */
  publishedAt: Date | null;
  /** Time at which the entry is schedule to be published, if it is scheduled. */
  scheduledFor: Date | null;
  /** The status of the entry, describing whether it has been published. Will be set to draft, scheduled, or published. */
  status: 'draft' | 'scheduled' | 'published';
  /** The title of the entry. */
  title: string;
  /** The list of types associated with the entry. Can include new, improved, or fixed. */
  types: CannyChangelogEntryType[];
  /** The public URL to the entry page on Canny. */
  url: string;
}

interface ICannyComment {
  /** A unique identifier for the comment. */
  id: string;
  /** The user who created the comment. */
  author: ICannyUser;
  /** The board the comment is associated with. */
  board: ICannyBoard;
  /** Time at which the comment was created, in ISO 8601 format. */
  created: Date;
  /** An array of the URLs of the images associated with this comment. */
  imageURLs: string[];
  /** Whether or not the comment is an internal comment. */
  internal: boolean;
  /** The number of likes a comment has received. */
  likeCount: number;
  /** An array of user objects who are mentioned in the comment. */
  mentions: ICannyUser[];
  /** The id of the comment that this comment is a reply to. If this comment is not a reply, this field will be null. */
  parentID: string | null;
  /** The post the comment is associated with. */
  post: ICannyPost;
  /** The text value of this comment.  */
  value: string;
}
