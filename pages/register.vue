<template>
  <div class="main">
    <div class="title">
      <a href="/login">登录</a>
      <span>·</span>
      <a class="active" href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="member" :rules="rules">
        <el-form-item class="input-prepend restyle" prop="nickname">
          <div>
            <el-input
              type="text"
              placeholder="你的昵称"
              v-model="member.nickname"
            />
            <i class="iconfont icon-user" />
          </div>
        </el-form-item>

        <el-form-item class="input-prepend restyle no-radius" prop="mobile">
          <div>
            <el-input
              type="text"
              placeholder="手机号"
              v-model="member.mobile"
            />
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item class="input-prepend restyle no-radius" prop="code">
          <div
            style="width: 100%;display: block;float: left;position: relative"
          >
            <el-input type="text" placeholder="验证码" v-model="member.code" />
            <i class="iconfont icon-phone" />
          </div>
          <div
            class="btn"
            style="position:absolute;right: 0;top: 6px;width: 40%;"
          >
            <a
              @click="isClicke && getCode()"
              href="javascript:"
              type="button"
              style="border: none;background-color: none"
              >{{ codeTest }}</a
            >
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password">
          <div>
            <el-input
              type="password"
              placeholder="设置密码"
              v-model="member.password"
            />
            <i class="iconfont icon-password" />
          </div>
        </el-form-item>

        <div class="btn">
          <input
            type="button"
            class="sign-up-button"
            value="注册"
            @click="submitRegister()"
          />
        </div>
        <p class="sign-up-msg">
          点击 “注册” 即表示您同意并愿意遵守简书
          <br />
          <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce"
            >用户协议</a
          >
          和
          <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">隐私政策</a>
          。
        </p>
      </el-form>
      <!-- 更多注册方式 -->
      <div class="more-sign">
        <h6>社交帐号直接注册</h6>
        <ul>
          <li>
            <a
              id="weixin"
              class="weixin"
              target="_blank"
              href="http://huaan.free.idcfengye.com/api/ucenter/wx/login"
              ><i class="iconfont icon-weixin"
            /></a>
          </li>
          <li>
            <a id="qq" class="qq" target="_blank" href="#"
              ><i class="iconfont icon-qq"
            /></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import "~/assets/css/sign.css";
import "~/assets/css/iconfont.css";
import userApi from "@/api/user";
export default {
  layout: "sign",
  data() {
    //校验手机号
    var validatePhone = (rule, value, callback) => {
      if (!/^1[34578]\d{9}$/.test(value)) {
        return callback(new Error("手机号码格式不正确"));
      }
      return callback();
    };
    return {
      member: {
        nickname: "",
        mobile: "",
        code: "",
        password: ""
      },
      codeTest: "获取验证码",
      //防止多次获取验证码
      isClicke: true,
      //检验规则
      rules: {
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          },
          { validator: validatePhone, trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    submitRegister() {
      if (this.member.mobile === "") {
        this.$message.error("请输入手机号");
      } else if (this.member.nickname === "") {
        this.$message.error("请输入昵称");
      } else if (this.member.code === "") {
        this.$message.error("请输入验证码");
      } else if (this.member.password === "") {
        this.$message.error("请输入密码");
      } else {
        this.member.password = this.$md5(this.member.password);
        userApi.register(this.member).then(response => {
          this.$message({
            type: "success",
            message: "注册成功"
          });
        });
        this.$router.push("/login");
      }
    },
    getCode() {
      if (this.member.mobile === "") {
        this.$message.error("请输入手机号");
      } else {
        userApi.getPhoneCode(this.member.mobile).then(response => {
          this.countDown();
        });
      }
    },
    countDown() {
      this.isClicke = false;
      let time = 300;
      const intervalId = setInterval(() => {
        if (time === 1) {
          clearInterval(intervalId);
          this.codeTest = "重新获取验证码";
          this.isClicke = true;
        } else {
          this.codeTest = `重新获取剩余${--time}秒`;
        }
      }, 1000);
    }
  }
};
</script>
<style>
.el-form-item__error {
  z-index: 9999999;
}
.sign form .input-prepend i {
  top: 7px;
}
</style>
