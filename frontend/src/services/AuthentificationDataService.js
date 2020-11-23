import http from "../../http-common";

//interaction avec le backend

class AuthenticationDataService {
  createUser(data) {
    return http.post("/users/signup", data);
  }
  connectUser(data) {
    return http.post("/users/login", data);
  }
  getProfilUser(id, data) {
    return http.get(`/users/${id}`, data);
  }
  deleteUser(id) {
    return http.delete(`/users/${id}`);
  }
  update(id, data) {
    return http.put(`/users/${id}`, data);
  }
}

export default new AuthenticationDataService();
