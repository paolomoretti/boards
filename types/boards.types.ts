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
  // approved: boolean;
  // comment_count: 0
  loading?: boolean;
  created_at: number;
  // created_by_me: true
  // downvoted: false
  // downvotes: 0
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
    // user_summary: ""
  };
  note?: Note | DummyNote;
  // link: {id: 5919179, created_at: 1593302249, comment_count: 0, user_summary: "",…}
  // read_count: 0
  file?: File;
  tile_type: "link" | "note" | "file";
  // updated_at: 1593302249
  // upvoted: false
  // upvotes: 0
  // user: {id: 924, full_name: "Paolo Moretti", image_url: null, username: "little_brown", avatar: {,…},…}
  user_tags: []
}

export interface BoardTilesResponse {
  data?: {
    results: Array<BoardTile>;
    num_found: number;
  }
  error?: string;
  mutate: Function;
}

export interface Article {
  // assets: [{id: 783241742, media_type: "image",…}, {id: 783242348, media_type: "image",…}]
  // author_email: null
  // author_url: null
  // collapsed: false
  // comment_count: null
  // content: "<p>Etsy uses cookies and similar technologies to give you a better experience, enabling things like:</p> <ul>↵<li>basic site functions</li> <li>ensuring secure, safe transactions</li> <li>secure account login</li> <li>remembering account, browser, and regional preferences</li> <li>remembering privacy and security settings</li> <li>analysing site traffic and usage</li> <li>personalised search, content, and recommendations</li> <li>helping sellers understand their audience</li> <li>showing relevant, targeted ads on and off Etsy</li> </ul>↵<p>Detailed information can be found in Etsy’s <a href="https://www.etsy.com/uk/legal/cookies-and-tracking-technologies">Cookies &amp; Similar Technologies Policy</a> and our <a href="https://www.etsy.com/uk/legal/privacy">Privacy Policy</a>.</p>      Always on  <h2>Required Cookies &amp; Technologies</h2> <p>Some of the technologies we use are necessary for critical functions like security and site integrity, account authentication, security and privacy preferences, internal site usage and maintenance data, and to make the site work correctly for browsing and transactions.</p>     Off     <h2>Site Customisation</h2> <p>Cookies and similar technologies are used to improve your experience, to do things like:</p> <ul>↵<li>remember your login, general, and regional preferences</li> <li>personalise content, search, recommendations, and offers</li> </ul>↵<p>Without these technologies, things like personalised recommendations, your account preferences, or localisation may not work correctly. Find out more in our <a href="https://www.etsy.com/uk/legal/cookies-and-tracking-technologies">Cookies &amp; Similar Technologies Policy</a>.</p>     Off     <h2>Personalised Advertising</h2> <p>These technologies are used for things like:</p> <ul>↵<li>personalised ads</li> <li>to limit how many times you see an ad</li> <li>to understand usage via Google Analytics</li> <li>to understand how you got to Etsy</li> <li>to ensure that sellers understand their audience and can provide relevant ads</li> </ul>↵<p>We do this with social media, marketing, and analytics partners (who may have their own information they’ve collected). Saying no will not stop you from seeing Etsy ads, but it may make them less relevant or more repetitive. Find out more in our <a href="https://www.etsy.com/uk/legal/cookies-and-tracking-technologies">Cookies &amp; Similar Technologies Policy</a>.</p>"
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
}