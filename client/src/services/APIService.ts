import axios, { AxiosInstance } from "axios";

const baseURL = "http://127.0.0.1:80/api/";

let token = null;

if (typeof window !== "undefined") {
  token = localStorage.getItem("access_token");
}

// interface CustomAxios extends AxiosInstance {
//   getCashed: any;
// }

const mainApi: AxiosInstance = axios.create({
  baseURL,
  timeout: 4000,
  headers: {
    Authorization: token ? "JWT " + token : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

mainApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      // window.location.href = "/error/";
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + "token/refresh/"
    ) {
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        if (tokenParts.exp > now) {
          return mainApi
            .post("/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem("access_token", response.data.access);
              localStorage.setItem("refresh_token", response.data.refresh);

              mainApi.defaults.headers["Authorization"] =
                "JWT " + response.data.access;
              originalRequest.headers["Authorization"] =
                "JWT " + response.data.access;

              return mainApi(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/login/";
        }
      } else {
        console.log("Refresh token not available.");
        window.location.href = "/login/";
      }
    }
    return Promise.reject(error);
  }
);

// mainApi.getCashed = async function (url) {
//   return await mainApi.get(url);
// };

export default mainApi;
