import request from "@/utils/request.js";
export default {

  listBanner() {
    return request({
      url: "/cms-service/crm-banner",
      method: "get"
    });
  }
};
