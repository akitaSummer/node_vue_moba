<template>
  <div class="about">
    <h1>
      {{id ? '编辑' : '新建'}}管理员
    </h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "AdminUsersEdit",
    props: {
      id: String
    },
    data() {
      return {
        model: {
          username: '',
          password: ''
        },
      }
    },
    methods: {
      async save() {
        if (this.id) {
          await this.$http(`rest/admin_users/${this.id}`, this.model, 'PUT')
        } else {
          await this.$http('rest/admin_users', this.model, 'POST')
        }
        this.$router.replace('/admin_users/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch() {
        const response = await this.$http(`rest/admin_users/${this.id}`)
        this.model = response.data
      },
    },
    created() {
      this.id && this.fetch()
    },
    watch: {
      $route: function() {
        if (this.id === undefined) {
          this.model = {
            username: '',
            password: ''
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
