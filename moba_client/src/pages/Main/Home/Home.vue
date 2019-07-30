<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../../../assets/image/9b86f489ca9ff2483da37488584e1f64.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../../../assets/image/60837bd1f8a6bd32722c54f9b4dd7dec.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../../../assets/image/1e8c9019a900d4e4add55eed0faa45cc.jpeg" alt="">
      </swiper-slide>
      <div class="swiper-pagination pagination-home px-3 pb-1" style="text-align: right" slot="pagination"></div>
    </swiper>
    <!--end of swiper-->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item" v-for="(value, key) in sprite" :key="key">
          <i :class="`sprite sprite-${key}`"></i>
          <div>{{value}}</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm" @click="navClick">
        <i :class="`sprite sprite-${Object.keys(this.sprite).length === 10 ? 'arrow' : 'open'} mr-1`"></i>
        {{Object.keys(this.sprite).length === 10 ? '收起' : '展开'}}
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        swiperOption: {
          pagination: {
            el: ".pagination-home"
          }
        },
        sprite: {
          news: '爆料站',
          stories: '故事站',
          shop: '周边商城',
          feel: '体验服',
          rookie: '新人专区',
          honour: '荣耀·传承',
          community: '同人社区',
          camp: '王者营地',
          wechat: '公众号',
          edition: '版本介绍'
        }
      }
    },
    methods: {
      navClick() {
        if (Object.keys(this.sprite).length === 10) {
          this.sprite = {
            news: '爆料站',
            stories: '故事站',
            shop: '周边商城',
            feel: '体验服'
          }
        } else {

          this.sprite = {
            news: '爆料站',
            stories: '故事站',
            shop: '周边商城',
            feel: '体验服',
            rookie: '新人专区',
            honour: '荣耀·传承',
            community: '同人社区',
            camp: '王者营地',
            wechat: '公众号',
            edition: '版本介绍'
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../assets/scss/variables.scss';
  .pagination-home{
    .swiper-pagination-bullet{
      border-radius: 0.1538rem;
      background: map_get($colors, 'white');
      &.swiper-pagination-bullet-active{
        background: map_get($colors, 'info');
      }
    }
  }
  .nav-icons{
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    .nav-item{
      width: 25%;
      margin-bottom: map_get($spacing-sizes, 3) * $spacing-base-size;
      border-right: 1px solid $border-color;
      div{
        padding-top: map_get($spacing-sizes, 2) * $spacing-base-size;
        padding-bottom: map_get($spacing-sizes, 2) * $spacing-base-size;
      }
      &:nth-child(4n){
      border-right: none;
    }
    }
  }
</style>
