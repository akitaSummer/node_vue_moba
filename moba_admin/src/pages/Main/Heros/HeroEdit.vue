<template>
  <div class="about">
    <h1>
      {{id ? '编辑' : '新建'}}英雄
    </h1>
    <el-form label-width="120px" @submit.native.prevent="save" style="marginTop: 1rem;">
      <el-tabs type="border-card" value="basic">
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              method="post"
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="true"
              :on-success="afterUpload">
              <div>
                <img v-if="model.avatar" :src="model.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="Banner">
            <el-upload
              method="post"
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="true"
              :on-success="response => $set(model, 'banner', response.url)">
              <div>
                <img v-if="model.banner" :src="model.banner" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate v-model="model.scores.difficult" :max="9" show-score style="marginTop:0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate v-model="model.scores.skills" :max="9" show-score style="marginTop:0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate v-model="model.scores.attack" :max="9" show-score style="marginTop:0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate v-model="model.scores.survive" :max="9" show-score style="marginTop:0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item in items1" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item in items2" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :span="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  method="post"
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="true"
                  :on-success="response => $set(item, 'icon', response.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="model.skills.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="最佳拍档" name="partners">
          <el-button @click="model.partners.push({})"><i class="el-icon-plus"></i>添加英雄</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :span="12" v-for="(item, i) in model.partners" :key="i">
              <el-form-item label="英雄">
                <el-select filterable v-model="item.hero">
                  <el-option v-for="hero in heroes" :key="hero._id" :value="hero._id" :label="hero.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="model.partners.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="marginTop: 1rem;">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "HeroEdit",
    props: {
      id: String
    },
    data() {
      return {
        model: {
          name: '',
          avatar: '',
          title: '',
          categories: [],
          scores: {
            difficult: 0,
            skills: 0,
            attack: 0,
            survive: 0
          },
          items1: [],
          items2: [],
          usageTips: '',
          battleTips: '',
          teamTips: '',
          skills: [],
          partners: []
        },
        categories: [],
        items1: [],
        items2: [],
        heroes: []
      }
    },
    methods: {
      // 保存影响
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
      // 获取修改的信息
      async fetch() {
        const response = await this.$http(`rest/heros/${this.id}`)
        this.model = Object.assign({}, this.model, response.data)
      },
      // 获取类型分类
      async fetchCategories() {
        const response = await this.$http(`rest/categories`)
        this.categories = response.data
      },
      // 获取装备
      async fetchItems() {
        const response = await this.$http(`rest/items`)
        this.items1 = this.items2 = response.data
      },
      // 获取英雄列表
      async fetchHeroes() {
        const response = await this.$http(`rest/heroes`)
        this.heroes = response.data
      },
      // 头像图片上传成功后返回图片
      afterUpload(response) {
        this.$set(this.model, 'avatar', response.url)
      }
    },
    created() {
      this.fetchCategories()
      this.fetchItems()
      this.fetchHeroes()
      this.id && this.fetch()
    },
    watch: {
      $route: function() {
        if (this.id === undefined) {
          this.model = {
            name: '',
            avatar: '',
            title: '',
            categories: [],
            scores: {
              difficult: 0,
              skills: 0,
              attack: 0,
              survive: 0
            },
            items1: [],
            items2: [],
            usageTips: '',
            battleTips: '',
            teamTips: '',
            skills: []
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
