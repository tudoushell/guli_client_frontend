import request from "@/utils/request";

export default {
  listTeacher() {
    return request({
      url: "/edu-service/edu-teacher",
      method: "get"
    });
  }
};
