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

interface ICannyCustomFields {
  [key: string]: string;
}

// Functions

// TODO missing companies subfield
interface ICannyUserFindOrCreateArgs {
  /** The URL pointing to the user's avatar image. */
  avatarURL?: string;
  /** The date the user was created in your system. */
  created?: string;
  /** Any custom fields associated with the user. */
  customFields?: ICannyCustomFields;
  /** The user's email. */
  email?: string;
  /** The user's name. */
  name: string;
  /** The user's unique identifier in your application. */
  userID: string;
}

interface ICannyUserFindOrCreateResponse {
  id: string;
}
