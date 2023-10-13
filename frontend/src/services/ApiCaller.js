import axios from 'axios';

export const callApi = async ({url, method, data}) => {
    debugger
    return axios
    .request({
        baseURL: "https://localhost:44389",
        url,
        method,
        data,
    })
    .then((res) => {
      return { data: res.data, status: true };
    })
    .catch((err) => {
      return { data: err.data, status: false };
    });

//   try {
//     const response = await axios.request({
//       baseURL: "https://localhost:44389",
//       url,
//       method,
//       data,
//     });

//     return { data: response.data, status: true };
//   } catch (error) {
//     return { data: error.data, status: false };
//   }
};