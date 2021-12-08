/* eslint-disable @typescript-eslint/no-empty-interface */

type CannyWebhookEventObjectType = 'post' | 'comment' | 'vote';
type CannyWebhookEventType =
  | 'post.created'
  | 'post.deleted'
  | 'post.jira_issue_linked'
  | 'post.jira_issue_unlinked'
  | 'post.status_changed'
  | 'comment.created'
  | 'comment.deleted'
  | 'vote.created'
  | 'vote.deleted';

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
  isPrivate?: boolean;
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
  avatarURL?: string | null;
  /** Time at which the user was created, in ISO 8601 format. */
  created: string;
  /** The user's email. This field can be null, for example when you create a new user by voting on behalf of them. */
  email?: string;
  /** Whether or not the user is a Canny admin. */
  isAdmin: boolean;
  /** Time at which the user interacted with your company for the last time, in ISO 8601 format.   */
  lastActivity?: string;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  linkedIssueIDs?: any[];
}

interface ICannyPostChangeResponse {
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
  /** (Undocumented) */
  changeComment?: {
    value: string;
    imageURLs: string[];
  };
  /** The number of non-deleted comments associated with this post. */
  commentCount: number;
  /** Time at which the post was created, in ISO 8601 format. */
  created: string;
  /** Any details the user included in the post. This is the longer text field (where the shorter one is "title"). */
  details: string;
  /** The month and year the post is estimated to be delivered. */
  eta: string | null;
  /** An array of the URLs of the images associated with this post */
  imageURLs: string[];
  /** A list of Jira issues that are linked with this post */
  jira: ICannyJiraAttribute;
  /** (Undocumented) */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mergeHistory: any[];
  /** The number of votes that have been cast on this post. */
  score: number;
  /** The post's status: "open", "under review", "planned", "in progress", "complete", "closed", or any other status your team has set on the settings page. */
  status: CannyPostStatus;
  /** (Undocumented) */
  statusChangedAt: string;
  /** The list of tag objects associated with this post. */
  tags: ICannyTag[];
  /** A brief title describing the post. This is the shorter text input (where the longer is details). */
  title: string;
  /** The URL to the post's page. */
  url: string;
}

interface ICannyStatusChangeRelatedPost {
  /** A unique identifier for the post. */
  id: string;
  /** The user who authored the post. If the author's account has been deleted, this field will be null. */
  author: ICannyUser;
  /** The board this post is associated with. */
  board: ICannyBoard;
  /** The category this post is assigned to, if any. */
  category: ICannyCategory | null;
  /** (Undocumented) */
  changeComment?: {
    value: string;
    imageURLs: string[];
  };
  /** The number of non-deleted comments associated with this post. */
  commentCount: number;
  /** Time at which the post was created, in ISO 8601 format. */
  created: string;
  /** Any details the user included in the post. This is the longer text field (where the shorter one is "title"). */
  details: string;
  /** The month and year the post is estimated to be delivered. */
  eta: string | null;
  /** An array of the URLs of the images associated with this post */
  imageURLs: string[];
  /** A list of Jira issues that are linked with this post */
  jira: ICannyJiraAttribute;
  /** The number of votes that have been cast on this post. */
  score: number;
  /** The post's status: "open", "under review", "planned", "in progress", "complete", "closed", or any other status your team has set on the settings page. */
  status: CannyPostStatus;
  /** (Undocumented) */
  statusChangedAt: string;
  /** The list of tag objects associated with this post. */
  tags: ICannyTag[];
  /** A brief title describing the post. This is the shorter text input (where the longer is details). */
  title: string;
  /** (Undocumented) */
  totalMRR?: number;
  /** The URL to the post's page. */
  url: string;
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
  /** (Undocumented) */
  changeComment?: {
    value: string;
    imageURLs: string[];
  };
  /** The number of non-deleted comments associated with this post. */
  commentCount: number;
  /** Time at which the post was created, in ISO 8601 format. */
  created: string;
  /** Any details the user included in the post. This is the longer text field (where the shorter one is "title"). */
  details: string;
  /** The month and year the post is estimated to be delivered. */
  eta: string | null;
  /** An array of the URLs of the images associated with this post */
  imageURLs: string[];
  /** A list of Jira issues that are linked with this post */
  jira: ICannyJiraAttribute;
  /** (Undocumented) */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mergeHistory: any[];
  /** The owner of the post */
  owner: ICannyUser | null;
  /** The number of votes that have been cast on this post. */
  score: number;
  /** The post's status: "open", "under review", "planned", "in progress", "complete", "closed", or any other status your team has set on the settings page. */
  status: CannyPostStatus;
  /** (Undocumented) */
  statusChangedAt: string;
  /** The list of tag objects associated with this post. */
  tags: ICannyTag[];
  /** A brief title describing the post. This is the shorter text input (where the longer is details). */
  title: string;
  /** (Undocumented) */
  totalMRR?: number;
  /** The URL to the post's page. */
  url: string;
}

interface ICannyCustomFields {
  [key: string]: string;
}

interface ICannyLabel {
  id: string;
  created: string;
  entryCount: number;
  name: string;
  url: string;
}

interface ICannyCommentRelatedPost extends ICannyChangelogRelatedPost {}
interface ICannyVoteRelatedPost extends ICannyChangelogRelatedPost {}

interface ICannyChangelogRelatedPost {
  /** A unique identifier for the post. */
  id: string;
  /** The category this post is assigned to, if any. */
  category: ICannyCategory | null;
  /** The number of non-deleted comments associated with this post. */
  commentCount: number;
  /** The month and year the post is estimated to be delivered. */
  eta?: string | null;
  /** An array of the URLs of the images associated with this post */
  imageURLs: string[];
  /** A list of Jira issues that are linked with this post */
  jira: ICannyJiraAttribute;
  /** The number of votes that have been cast on this post. */
  score: number;
  /** The post's status: "open", "under review", "planned", "in progress", "complete", "closed", or any other status your team has set on the settings page. */
  status: CannyPostStatus;
  /** The list of tag objects associated with this post. */
  tags: ICannyTag[];
  /** A brief title describing the post. This is the shorter text input (where the longer is details). */
  title: string;
  /** The URL to the post's page. */
  url: string;
}

interface ICannyChangelogEntry {
  /** A unique identifier for the entry. */
  id: string;
  /** Time at which the entry was first created, in ISO 8601 format. */
  created: string;
  /** The list of labels that the entry is associated with. */
  labels: ICannyLabel[];
  /** Time at which the entry was last updated, in ISO 8601 format. */
  lastSaved: string;
  /** The markdown contents of the entry. */
  markdownDetails: string;
  /** The plaintext contents of the entry, with images, videos, and links stripped. */
  plaintextDetails: string;
  /** The list of posts this entry is linked to. */
  posts: ICannyChangelogRelatedPost[];
  /** Time at which the entry was published, if it has been published. */
  publishedAt: string | null;
  /** Time at which the entry is schedule to be published, if it is scheduled. */
  scheduledFor: string | null;
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
  created: string;
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
  post: ICannyCommentRelatedPost;
  /** The text value of this comment.  */
  value: string;
}

interface ICannyUserCompanyCreateArg {
  created: string;
  customFields: ICannyCustomFields[];
}

interface ICannyStatusChange {
  /** A unique identifier for the status change. */
  id: string;
  /** The comment attached to this status change. Only imageURLs and value fields are included. */
  changer: ICannyUser;
  /** The user who changed the status. */
  changeComment: {
    imageURLs: string[];
    value: string;
  };
  /** Time at which the status was changed, in ISO 8601 format. */
  created: string;
  /** The post that had its status changed. */
  post: ICannyStatusChangeRelatedPost;
  /** The status the post was changed to. */
  status: CannyPostStatus;
}

interface ICannyOpportunity {
  /** A unique identifier for the opportunity. */
  id: string;
  /** Whether the opportunity is closed. */
  closed: boolean;
  /** The name of the opportunity. */
  name: string;
  /** The list of post ids this opportunity is linked to. */
  postIDs: string[];
  /** The unique identifier for the opportunity in Salesforce. */
  salesforceOpportunityID: string | null;
  /** The value of the opportunity. */
  value: number;
  /** Whether the opportunity has been won. */
  won: boolean;
}

interface ICannyTag {
  /** A unique identifier for the tag. */
  id: string;
  /** The board this tag is associated with. */
  board?: ICannyBoard;
  /** Time at which the tag was created, in ISO 8601 format. */
  created?: string;
  /** The name of the tag. */
  name: string;
  /** The number of posts that have been assigned this tag. */
  postCount: number;
  /** The URL to the board, filtered to just posts that have been assigned this tag. */
  url: string;
}

interface ICannyZendeskTicket {
  url: string;
  id: number;
  created: string;
  subject: string;
  description: string;
}

interface ICannyVote {
  /** A unique identifier for the vote. */
  id: string;
  /** The board this vote is associated with. */
  board: ICannyBoard;
  /** The admin who cast this vote on behalf of a user. If the user voted themselves, this field will be null. */
  by: ICannyUser | null;
  /** Time at which the vote was first cast, in ISO 8601 format. */
  created: string;
  /** The post this vote is associated with. */
  post: ICannyVoteRelatedPost;
  /** The user this post is associated with. */
  voter: ICannyUser;
  /** (Undocumented) Related zendesk ticket information */
  zendeskTicket?: ICannyZendeskTicket | null;
}

interface ICannyWebhookEvent {
  /** Time at which the event was created, in ISO 8601 format. */
  created: string;
  /** The object the event is about. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  object: any;
  /** The type of object included in the event. */
  objectType: CannyWebhookEventObjectType;
  /** The type of event. */
  type: CannyWebhookEventType;
}
