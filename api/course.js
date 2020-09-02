import request from "@/utils/request";

export default {
  listSubjectCategory() {
    return request({
      url: '/edu-service/edu-subject',
      method: 'get'
    })
  },
  listCourse(page, row, courseQueryDto) {
    return request({
      url: `/edu-service/edu-course/${page}/${row}`,
      method: "post",
      data: courseQueryDto
    });
  }
};
