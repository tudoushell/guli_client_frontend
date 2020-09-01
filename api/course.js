import request from "@/utils/request";

export default {
  listSubjectCategory() {
    return request({
      url: '/edu-service/edu-subject',
      method: 'get'
    })
  },
  listCourse(page, row) {
    return request({
      url: `/edu-service/edu-course/${page}/${row}`,
      method: "post"
    });
  }
};
