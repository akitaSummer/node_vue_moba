<template>
  <el-table :data="items">
    <el-table-column prop="_id" label="ID" width="230">
    </el-table-column>
    <el-table-column prop="name" label="广告位">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="$router.push(`/ads/edit/${scope.row._id}`)" type="primary" size="small">编辑</el-button>
        <el-button @click="remove(scope.row)" type="primary" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "CategoryList",
    data() {
      return {
        items: []
      }
    },
    methods: {
      async fetch() {
        const response = await this.$http('rest/ads')
        this.items = response.data
      },
      async remove(row) {
        this.$confirm(`此操作将永久删除"${row.name}", 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http(`rest/ads/list/${row._id}`,{},'DELETE')
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
