import request from "@/utils/request";

export default {
  getUserInfo() {
    return request({
      url: "/ucenter/info",
      method: "get"
    });
  },
  getPhoneCode(phone) {
    return request({
      url: `/edu-msm/${phone}`,
      method: "get"
    });
  },
  register(memberDto, pwd) {
    return request({
      url: "/ucenter/sign-up",
      method: "post",
      data: memberDto
    });
  },
  login(loginDto) {
    return request({
      url: "/ucenter/login",
      method: "post",
      data: loginDto
    });
  }
};
