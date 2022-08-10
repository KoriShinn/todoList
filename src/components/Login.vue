<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img
          src="../assets/u=1743303613,3858621292&fm=253&fmt=auto&app=138&f=PNG.webp"
          alt=""
        />
      </div>
      <!-- 登陆表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-s-help"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是登陆表单的数据绑定对象
      loginForm: {
        username: "admin11",
        password: "123456",
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入登陆名称", trigger: "blur" },
          { min: 1, max: 7, message: "长度在 1 到 7 个字符", trigger: "blur" },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 点击重制表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    // 登陆预验证
    login() {
      // const r1 = JSON.stringify(this.loginForm);
      // const r2 = JSON.parse(r1);
      this.$refs.loginFormRef.validate(async (valid) => {
        // valid是预验证的布尔值，通过则为true，这里如果是false，则不发起请求，if取反valid直接return出函数{}不发起请求
        if (!valid) return this.$message.warning("请输入正确的用户名密码");
        // 正常返回Promise对象，使用await等待async的函数（valid）执行完返回所需对象，使用{daata : res}解构所需的状态码
        const { data: res } = await this.$http.post("login", this.loginForm);
        if (res.meta.status !== 0) return this.$message.error("用户名密码错误");
        this.$message.success({
          showClose: true,
          message: "登录成功",
          duration: 1100,
        });
        console.log(res.data);
        window.sessionStorage.setItem("token", res.data.token);
        this.$router.push("/todo");
        // const { data: res } = await this.$http.post("login", this.loginForm);
        // if (res.meta.status !== 0)
        //   return this.$message.error("用户名或密码错误");
        // this.$message.success("登陆成功");
        // 1.将登陆成功后返回的token值保存在sessionStorage中
        // window.sessionStorage.setItem("token", res.data.token);
        // 2.通过编程式导航跳转到后台主页，路由地址是 '/my/todo'
        // this.$router.push("/my/todow");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  // less嵌套
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>