import request from "@/utils/request.js";
export default {
  getOrderByOrderNo(orderNo) {
    return request({
      url: `/edu-order/order/${orderNo}`,
      method: "get"
    });
  },
  createdOrder(courseId) {
    return request({
      url: `/edu-order/order/${courseId}`,
      method: "post"
    });
  }
};
