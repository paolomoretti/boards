import getToken from '../data/getToken';

export const appSearchDefault = (keyword: string) => {
  const params: Record<string, any> = {
    clean_description: true,
    clean_links: true,
    highlight_fragment_size: 120,
    include_links: true,
    per_page: 20,
    include_conversations: false,
    include_discussions: false,
    include_tweets: false,
    include_all_comments: true,
    search_text: keyword,
    page: 1
  }
  const qs: string = Object.keys(params).map(k => `${k}=${params[k].toString()}`).join('&');
  return fetch(`/api/v7/topic_boards/search_all?${qs}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Token auth_token=${getToken()}`
    }
  })
    .then(res => res.json())
};