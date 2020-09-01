import request from "@/utils/request";

export default {
  getTeacher(id) {
    return request({
      url: `/edu-service/edu-teacher/detail/${id}`,
      method: 'get'
    })
  },
  listTeacherByPagination(page, row) {
    return request({
      url: `/edu-service/edu-teacher/${page}/${row}`,
      method: "post",
      data: {}
    });
  },
  listTeacher() {
    return request({
      url: "/edu-service/edu-teacher",
      method: "get"
    });
  }
};
