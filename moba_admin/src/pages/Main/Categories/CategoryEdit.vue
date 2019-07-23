<template>
  <div class="about">
    <h1>
      新建分类
    </h1>
    <el-form @submit.native.prevent="save">
      <el-form-item label="名称" label-width="120px">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "CategoryEdit",
    data() {
      return {
        model: {
          name: ''
        }
      }
    },
    methods: {
      async save() {
        await this.$http('categories', this.model, 'POST')
        this.$router.replace('/categories/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      }
    }
  }
</script>

<style scoped>

</style>
