import axios from "axios";

export function get(url, onSuccess, onError) {
  axios.get(url)
    .then(onSuccess)
    .catch(onError)
    .then(() => {
      // always executed, cleanup
    });
}
