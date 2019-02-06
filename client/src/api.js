const config = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const BASE_URL = 'http://localhost:5000/api/post';

export class PostApi {
  static get() {
    // eslint-disable-next-line no-undef
    return fetch(BASE_URL, { ...config, method: 'GET' })
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  static post(data) {
    return fetch(BASE_URL, { ...config, method: 'POST', body: JSON.stringify(data) })
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  static delete(id) {
    return fetch(`${BASE_URL}/${id}`, { ...config, method: 'DELETE' })
      .then(response => response.json())
      .catch(err => console.log(err));
  }
}
