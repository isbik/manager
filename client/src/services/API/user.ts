import mainApi from "../APIService";

export const getAuthUser = (params = {}) => {
  return mainApi.post("user/", { params });
};
