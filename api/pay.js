import request from "@/utils/request";

export default {
  getOrderStatus(orderNo) {
    return request({
      url: `/edu-order/pay-log/status/${orderNo}`,
      method: "get"
    });
  },
  getWxNative(orderNo) {
    return request({
      url: `/edu-order/pay-log/wx-native/${orderNo}`,
      method: "get"
    });
  }
};
