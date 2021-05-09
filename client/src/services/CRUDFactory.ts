import mainApi from "./APIService";

export const CRUDFactory = (url) => {
  return {
    getAll(params) {
      return mainApi.get(`${url}/`, { params });
    },

    get(id, params = {}) {
      return mainApi.get(`${url}/${id}/`, { params });
    },

    create(data) {
      return mainApi.post(`${url}/`, data);
    },

    patch(id, data) {
      return mainApi.patch(`${url}/${id}/`, data);
    },

    update(id, data) {
      return mainApi.put(`${url}/${id}/`, data);
    },

    delete(id) {
      return mainApi.delete(`${url}/${id}/`);
    },
  };
};
