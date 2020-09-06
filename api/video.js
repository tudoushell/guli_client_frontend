import request from "@/utils/request";

export default {
  getPlayAuth(videoId) {
    return request({
      url: `/vod/auth/${videoId}`,
      method: "get"
    });
  }
};
