<template>
  <div class="about">
    <h1>
      {{id ? '编辑' : '新建'}}英雄
    </h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          method="post"
          class="avatar-uploader"
          action="http://localhost:4001/admin/api/upload"
          :show-file-list="true"
          :on-success="afterUpload">
          <div class="el-upload">
            <img v-if="model.avatar" :src="model.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </div>
        </el-upload>
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
        model: {
          name: '',
          avatar: '',
        }
      }
    },
    methods: {
      async save() {
        if (this.id) {
          await this.$http(`rest/heros/${this.id}`, this.model, 'PUT')
        } else {
          await this.$http('rest/heros', this.model, 'POST')
        }
        this.$router.replace('/heros/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch() {
        const response = await this.$http(`rest/heros/${this.id}`)
        this.model = response.data
      },
      afterUpload(response) {
        this.model.avatar = response.url
      }
    },
    created() {
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    padding: 5px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border-radius: 6px;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
