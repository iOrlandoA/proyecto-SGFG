

import { useState } from 'react';
import axios from 'axios';

function UseApi(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const config = {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  };

  const refetch = () => {
    axios
      .get(url, config)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const post = (body) => {
    axios
      .post(url, body, config)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const put = (path, body) => {
    axios
      .put(`${url}/${path}`, body, config)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const remove = (path) => {
    axios
      .delete(`${url}/${path}`, config)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return { data, error, refetch, post, put, remove };
}

export default UseApi;

