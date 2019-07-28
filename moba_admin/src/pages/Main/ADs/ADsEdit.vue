<template>
  <div class="about">
    <h1>
      {{id ? '编辑' : '新建'}}广告位
    </h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
      </el-form-item>
      <el-row type="flex" style="flex-wrap: wrap">
        <el-col :span="12" v-for="(item, i) in model.items" :key="i">
          <el-form-item label="跳转连接(url)">
            <el-input v-model="item.url"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              method="post"
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="true"
              :on-success="response => $set(item, 'image', response.url)">
              <img v-if="item.image" :src="item.image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="model.items.splice(i, 1)">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "ADsEdit",
    props: {
      id: String
    },
    data() {
      return {
        model: {
          name: '',
          items: []
        },
      }
    },
    methods: {
      async save() {
        if (this.id) {
          await this.$http(`rest/ads/${this.id}`, this.model, 'PUT')
        } else {
          await this.$http('rest/ads', this.model, 'POST')
        }
        this.$router.replace('/ads/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch() {
        const response = await this.$http(`rest/ads/${this.id}`)
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
            name: '',
            items: []
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
