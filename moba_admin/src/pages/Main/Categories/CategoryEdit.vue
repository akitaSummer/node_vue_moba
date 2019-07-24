<template>
  <div class="about">
    <h1>
      {{id ? '编辑' : '新建'}}分类
    </h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" placeholder="请选择">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
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
    props: {
      id: String
    },
    data() {
      return {
        model: {},
        parents: []
      }
    },
    methods: {
      async save() {
        if (this.id) {
          await this.$http(`categories/${this.id}`, this.model, 'PUT')
        } else {
          await this.$http('categories', this.model, 'POST')
        }
        this.$router.replace('/categories/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch() {
        const response = await this.$http(`categories/${this.id}`)
        this.model = response.data
      },
      async fetchParents() {
        const response = await this.$http(`categories`)
        this.parents = response.data
      }
    },
    created() {
      this.fetchParents()
      this.id && this.fetch()
    },
    watch: {
      $route: function() {
        if (this.id === undefined) {
          this.model = {}
        }
      }
    }
  }
</script>

<style scoped>

</style>
