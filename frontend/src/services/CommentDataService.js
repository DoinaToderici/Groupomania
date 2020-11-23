import http from "../../http-common";

///routele back
class CommentDataService {
  create(data) {
    return http.post("/comments", data);
  }

  delete(id) {
    return http.delete(`/comments/${id}`);
  }
}

export default new CommentDataService();
