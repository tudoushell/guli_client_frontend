import request from "@/utils/request";

export default {
  getCourseInfo(id) {
    return request({
      url: `/edu-service/edu-course/detail/${id}`,
      method: 'get'
    })
  },
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
