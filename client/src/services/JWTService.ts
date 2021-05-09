const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

export default {
  getToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  },
  setToken(token: string) {
    localStorage.setItem(ACCESS_TOKEN, token);
  },
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
  },
  setRefreshToken(token: string) {
    localStorage.setItem(REFRESH_TOKEN, token);
  },
  clearTokens() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  },
};
