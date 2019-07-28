<template>
  <el-card class="login-card" header="请先登录">
    <el-form @submit.native.prevent="login">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        model: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      async login() {
        const response= await this.$http('login', this.model, 'POST')
        // sessionStorage.token = response.data.token
        localStorage.token = response.data.token
        this.$router.push('/')
        this.$message({
          type: 'success',
          message: '登录成功'
        })
      }
    }
  }
</script>

<style scoped>
  .login-card{
    width: 25rem;
    margin: 5rem auto;
  }
</style>
