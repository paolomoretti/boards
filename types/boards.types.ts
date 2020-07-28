export interface Board {
  id: number;
  avatar?: string;
  board_tags: Array<string>;
  created_at: number;
  last_activity_date: number;
  name: string;
  new_items: number;
}

export interface BoardTile {
  approved: boolean;
  // comment_count: 0
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
  tile_type: "link" | "note" | "file";
  // updated_at: 1593302249
  upvoted: boolean;
  upvotes: 0;
  // user: {id: 924, full_name: "Paolo Moretti", image_url: null, username: "little_brown", avatar: {,…},…}
  user_tags: Array<string>;
}

export interface Article {
  // assets: [{id: 783241742, media_type: "image",…}, {id: 783242348, media_type: "image",…}]
  // author_email: null
  // author_url: null
  // collapsed: false
  // comment_count: null
  content: string;
  //   created_at: 1593301815
  description: string;
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
  title: string;
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