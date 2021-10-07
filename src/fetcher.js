import { service } from './apiServise';

class Fetcher {
  baseUrl = `https://hacker-news.firebaseio.com/v0`;

  fetchNews = query => {
    return service.get(`${this.baseUrl}/${query}`).then(res => {
      return res;
    });
  };

  fetchItems = item => {
    return service
      .get(`${this.baseUrl}/item/${item}.json?print=pretty`)
      .then(res => {
        return res;
      })
      .catch(error => {
        return error;
      });
  };
}

export default new Fetcher();
