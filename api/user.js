import request from "@/utils/request";

export default {
  getPhoneCode(phone) {
      return request({
          url: `/edu-msm/${phone}`,
          method: 'get'
      })
  },
  register(memberDto, pwd) {
    return request({
      url: "/u-center/sign-up",
      method: "post",
      data: memberDto
    });
  },
  login(loginDto) {
    return request({
      url: "/u-center/login",
      method: "post",
      data: loginDto
    });
  }
};
