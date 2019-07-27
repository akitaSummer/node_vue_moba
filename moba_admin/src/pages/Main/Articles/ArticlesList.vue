<template>
  <el-table :data="items">
    <el-table-column prop="_id" label="ID" width="230">
    </el-table-column>
    <el-table-column prop="title" label="标题">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="$router.push(`/articles/edit/${scope.row._id}`)" type="primary" size="small">编辑</el-button>
        <el-button @click="remove(scope.row)" type="primary" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "ArticlesList",
    data() {
      return {
        items: []
      }
    },
    methods: {
      async fetch() {
        const response = await this.$http('rest/articles')
        this.items = response.data
      },
      async remove(row) {
        this.$confirm(`此操作将永久删除文章"${row.name}", 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http(`rest/articles/list/${row._id}`,{},'DELETE')
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()
        })
      }
    },
    created() {
      this.fetch()
    }
  }
</script>

<style scoped>

</style>
