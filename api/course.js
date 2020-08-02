import request from "@/utils/request";

export default {
  listCourse(page, row) {
    return request({
      url: `/edu-service/edu-course/${page}/${row}`,
      method: "post"
    });
  }
};
