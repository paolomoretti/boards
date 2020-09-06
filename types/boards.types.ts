import { User } from './app.types';
import { ReactNode } from 'react';

export interface Board {
  id: number;
  avatar?: string;
  board_tags: Array<string>;
  created_at: number;
  last_activity_date: number;
  name: string;
  new_items: number;
  owner: User;
  // access_level: "admin"
  // description: "a"
  // displayStyle: "card"
  // email_invites: []
  // engagement_value: 293
  // ingest_email_address: "gricette-5378@boards.cronycle.com"
  // last_activity_date: 1598143162
  // notification_level: "all_notifications"
  // share_as_feed: {active: false, target: "none", include_articles: true, include_notes: false,…}
  // share_as_newsletter: {active: true, template_id: 0, draft_ids: [85],…}
  // share_as_rss: {active: true, target: "public", order_by: "pin_date",…}
  // share_as_source: {active: false, target: "none", include_articles: false, include_notes: false,…}
  // share_global_search: {active: false, target: "none", approved: false}
  // share_to_buffer: {active: false, approved_items_only: true, include_articles: true, include_notes: true,…}
  // share_to_hootsuite: {active: false, approved_items_only: false, include_articles: false, include_files: false,…}
  // share_to_ms_teams: {active: false, approved_items_only: false, include_articles: false, include_notes: false,…}
  // share_to_slack: {active: true, approved_items_only: false, include_articles: true, include_notes: false,…}
  // share_to_wordpress: {active: false, approved_items_only: false, include_articles: false, include_notes: false,…}
  // share_to_zapier: {active: false, approved_items_only: false, include_articles: false, include_notes: false,…}
  // slack_listeners_attributes: []
  // teams: [{id: 2, name: "Con Sari", avatar: {,…}, created_at: 1481044084,…},…]
  // tickers: []
  // topic_board_sources: []
  // used_storage_quota: 38354110
  // user_ids: [924, 5613, 5839]
  // users: [{id: 924, full_name: "Paolo Moretti", image_url: null, username: "little_brown", avatar: {,…},…},…]
  // visibility: "private"
}

export interface BoardTile {
  approved: boolean;
  comment_count: number;
  loading?: boolean;
  created_at: number;
  // created_by_me: true
  downvoted: boolean;
  downvotes: 0;
  // engagement: 0
  // grouped_on_tile_id: 5938777
  // highlights: null
  id: number;
  // is_new: false
  link?: {
    // comment_count: 0
    // created_at: 1593302249
    // id: 5919179
    link: Article;
    // link: {id: 1803331209, name: "Scandinavian Style Birch Plywood Desk with Hard Wearing",…}
    // tile: {id: 5938780, tile_type: "link",…}
    // user: {id: 924, full_name: "Paolo Moretti", image_url: null, username: "little_brown", avatar: {,…},…}
    user_summary?: string;
  };
  note?: Note | DummyNote;
  // link: {id: 5919179, created_at: 1593302249, comment_count: 0, user_summary: "",…}
  // read_count: 0
  file?: File;
  tile_type: TileType;
  // updated_at: 1593302249
  upvoted: boolean;
  upvotes: 0;
  // user: {id: 924, full_name: "Paolo Moretti", image_url: null, username: "little_brown", avatar: {,…},…}
  user_tags: Array<string>;
  highlights?: Highlight
}

export type HighlightArticleKey = 'content' | 'description' | 'plain_text' | 'name' | 'user_summary';
export type HighlightFileKey = 'name' | 'summary';
export type HighlightNoteKey = 'content';
export type Highlight = Record<HighlightArticleKey & HighlightFileKey, Array<string> | string>;
// export interface Highlight {
//   content: string;
//   description: Array<string>;
//   plain_text: Array<string>;
//   name: string;
//   user_summary: Array<string>;
// }

export interface Article {
  // assets: [{id: 783241742, media_type: "image",…}, {id: 783242348, media_type: "image",…}]
  // author_email: null
  // author_url: null
  // collapsed: false
  // comment_count: null
  content: string;
  //   created_at: 1593301815
  description: string | ReactNode;
  // external_tags: []
  // id: 1803331209
  lead_image: {
    media_type: string;
    url_archived_medium: string;
    url_archived_small: string;
    url_original: string;
  };
  // lead_image_in_content: false
  name: string;
  // primary_author: null
  // primary_content_type: "article"
  // published_at: 1593301815
  // publisher_name: "Etsy"
  // read: false
  // seen: null
  // show_external_url: true
  url: "https://www.etsy.com/uk/listing/789592601/scandinavian-style-birch-plywood-desk"
  url_host: "www.etsy.com"
  // user_tags: ["sestra-house"]
  // word_count: 268
}

export interface File {
  content_type: "application/pdf";
  // created_at: 1576150427
  file_size: number;
  file_url: string;
  id: number;
  original_filename: string;
  summary: string;
  title: string | ReactNode;
  content?: string; // highight content
  // updated_at: 1576150427
}

export interface DummyNote {
  note: string;
}

export interface Note {
  // created_at: 1594646420
  // deleted: false
  // has_links_to_scrape: false
  id: number;
  note: string;
  text_only: boolean;
  links?: Array<Article>;
  // updated_at: 1594646420
  // wordpress_posts: []
}

export interface GetBoardTilesParams {
  search_text?: string;
  clean_description: boolean;
  exclude_sources: boolean;
  per_page: number;
  include_all_comments: boolean;
  include_discussions: boolean;
  include_conversations: boolean;
  include_tweets: boolean;
  max_timestamp?: number;
  tags?: string;
  filters?: Array<string>;
}

export interface TileComment {
  // comment_data: null
  comment_id: number;
  comment_thread_id: number;
  created_at: number;
  // link_id: 1825876063
  position: number;
  replies: Array<TileComment>;
  // selection_html: null
  text: string;
  type: string; // "article"
  user: TileCommentUser;
}

export interface TileCommentUser {
  avatar: {
    high: string;
    medium: string;
    small: string;
  }
  full_name: string;
  id: number;
}

export type TileType = "link" | "note" | "file";
export type FileType = 'image' | 'pdf' | 'xls' | 'doc' | 'ppt' | 'video' | 'zip' | 'unknown';

export interface BoardSearchResult {
  approved: false;
  // comment_count: 1
  created_at: number;
  // created_by_me: true
  // downvoted: false
  // downvotes: 0
  // engagement: 1
  // grouped_on_tile_id: null
  highlights: {
    plain_text: Array<string>;
    description: Array<string>;
    content: string;
  }
  id: number;
  // is_new: false
  link?: BoardTile;
  // read_count: 0
  tile_type: TileType
  topic_board: Board;
  // updated_at: 1596156946
  // upvoted: false
  // upvotes: 0
  user: User;
  user_tags?: Array<string>;
}
