class ApiService {
  get(url) {
    return this.call(url);
  }

  call(url, options = {}) {
    return fetch(url, options).then(response => response.json());
  }
}

export const service = new ApiService();
