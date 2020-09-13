<template>
  <div class="cart py-container">
    <!--主内容-->
    <div class="checkout py-container  pay">
      <div class="checkout-tit">
        <h4 class="fl tit-txt">
          <span class="success-icon"></span
          ><span class="success-info"
            >订单提交成功，请您及时付款！订单号：{{ payObj.out_trade_no }}</span
          >
        </h4>
        <span class="fr"
          ><em class="sui-lead">应付金额：</em
          ><em class="orange money">￥{{ payObj.total_fee }}</em></span
        >
        <div class="clearfix"></div>
      </div>
      <div class="checkout-steps">
        <div class="fl weixin">微信支付</div>
        <div class="fl sao">
          <p class="red">请使用微信扫一扫。</p>
          <div class="fl code">
            <!-- <img id="qrious" src="~/assets/img/erweima.png" alt=""> -->
            <!-- <qriously value="weixin://wxpay/bizpayurl?pr=R7tnDpZ" :size="338"/> -->
            <qriously :value="payObj.code_url" :size="338" />
            <div class="saosao">
              <p>请使用微信扫一扫</p>
              <p>扫描二维码支付</p>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
        <!-- <p><a href="pay.html" target="_blank">> 其他支付方式</a></p> -->
      </div>
    </div>
  </div>
</template>
<script>
import payApi from "@/api/pay";

export default {
  data() {
    return {
      payObj: {},
      orderNo: "",
      intervalPayStatus: ""
    };
  },
  created() {
    if (this.$route.params.pid) {
      this.orderNo = this.$route.params.pid;
      this.getNative(this.orderNo);
    }
  },
  methods: {
    //获取支付状态
    getOrderStatusByOrderNo() {
      payApi.getOrderStatus(this.orderNo).then(response => {
        if (response.data.isPaid === 'true') {
          clearInterval(this.intervalPayStatus);
          this.$message({
            type: "success",
            message: "支付成功!"
          });
          this.$router.push(`/course/${this.payObj.courseId}`);
        }
      });
    },
    //获取微信支付二维码
    getNative(orderNo) {
      payApi.getWxNative(orderNo).then(response => {
        this.payObj = response.data;
      });
    }
  },
  //轮询获取支付状态
  mounted() {
    this.intervalPayStatus = setTimeout(() => {
      this.getOrderStatusByOrderNo();
    }, 3000);
  }
};
</script>
