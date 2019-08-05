module.exports = app => {
  const router = require('express').Router()
  // const Article = require('../../db/models/Article')
  const mongoose = require('mongoose')
  const Article = mongoose.model('Article')
  const Category = mongoose.model('Category')
  const Hero = mongoose.model('Hero')
  const Ad = mongoose.model('Ad')
  // 初始新闻列表
  router.get('/news/init', async (request, response) => {
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    console.log(parent)
    const cats = await Category.find().where({parent: parent}).lean()
    const newsTitles = ["狄某有话说 | 如何拥有好队友，快来get匹配新姿势！", "体验服爆料 | 不想匹配那个Ta，我有一个小方法！", "王者音乐课 | 稷下学子流行风向标，星之队队长曜墙裂推荐！", "狄某有话说 | 客服团队小知识，局内反馈就找Ta！", "预约赢永久皮肤，天生BUFF再升级！", "8月1日全服不停机更新公告", "7月30日全服不停机更新公告", "净化游戏环境声明及处罚公告（7月24日-7月29日）", "7月30日“演员”惩罚名单", "7月30日外挂专项打击公告", "世界冠军杯 集卡赢壕礼活动公告", "炎炎夏日全新活动周 峡谷激战得好礼", "助力世冠赛 心愿单升级回馈公告", "夏日福利继续领 限定皮肤返场", "【稷下的神秘档案】活动公告", "世冠四强出炉 8月2日半决赛拉开战幕", "你是赛评师：QG2：4不敌RNG.M止步世冠，他们这次是否只是差点运气？", "世冠总决赛门票已售罄，8月10日不见不散，感恩有你！", "世冠总决赛落地深圳大运，多重福利邀你8月10日现场观赛！", "虎牙明星大腿杯S2赛季全新升级，争锋相对谁能脱颖而出成为最强大腿"]
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
      return {
        categories: randomCats.slice(0, 2),
        title: title
      }
    })
    await Article.deleteMany({})
    await Article.insertMany(newsList)
    response.send(newsList)
  })

  // 新闻列表接口
  router.get('/news/list', async (request, response) => {
    // // populate不能控制多个分类中单一分类的文章数量
    // const parent = await Category.findOne({
    //   name: '新闻分类'
    // }).populate({
    //   path: 'children',
    //   populate: {
    //     path: 'newsList'
    //   }
    // }).lean()

    // 聚合查询
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.aggregate([
      {$match: {parent: parent._id}},
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      {
        $addFields: {
          newsList: {$slice: ['$newsList', 5]}
        }
      }
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({categories: {$in: subCats}}).populate('categories').limit(5).lean()
    })

    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = (cat.name === '热门' ? news.categories[0].name : cat.name)
        return news
      })
      return cat
    })

    response.send(cats)
  })

  // 初始化英雄数据
  router.get('/heroes/init', async (request, response) => {
    const rawData = [{"name":"热门","heroes":[{"name":"孙悟空","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"},{"name":"鲁班七号","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"},{"name":"后羿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"},{"name":"铠","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"},{"name":"孙尚香","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"},{"name":"亚瑟","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"},{"name":"甄姬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"},{"name":"韩信","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"},{"name":"妲己","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"},{"name":"安琪拉","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"}]},{"name":"战士","heroes":[{"name":"赵云","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"},{"name":"钟无艳","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"},{"name":"吕布","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"},{"name":"曹操","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg"},{"name":"典韦","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"},{"name":"宫本武藏","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg"},{"name":"达摩","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"},{"name":"老夫子","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg"},{"name":"关羽","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg"},{"name":"露娜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"},{"name":"花木兰","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"},{"name":"亚瑟","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"},{"name":"孙悟空","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"},{"name":"刘备","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg"},{"name":"杨戬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg"},{"name":"雅典娜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg"},{"name":"哪吒","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg"},{"name":"铠","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"},{"name":"狂铁","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg"},{"name":"李信","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg"},{"name":"盘古","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg"},{"name":"曜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg"}]},{"name":"法师","heroes":[{"name":"小乔","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg"},{"name":"墨子","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"},{"name":"妲己","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"},{"name":"嬴政","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg"},{"name":"高渐离","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg"},{"name":"扁鹊","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg"},{"name":"芈月","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"},{"name":"周瑜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg"},{"name":"甄姬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"},{"name":"武则天","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg"},{"name":"貂蝉","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"},{"name":"安琪拉","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"},{"name":"姜子牙","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg"},{"name":"王昭君","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg"},{"name":"张良","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg"},{"name":"不知火舞","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"},{"name":"钟馗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"},{"name":"诸葛亮","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg"},{"name":"干将莫邪","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg"},{"name":"女娲","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg"},{"name":"杨玉环","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"},{"name":"弈星","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg"},{"name":"米莱狄","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg"},{"name":"沈梦溪","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg"},{"name":"上官婉儿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"},{"name":"嫦娥","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"}]},{"name":"坦克","heroes":[{"name":"廉颇","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg"},{"name":"刘禅","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"},{"name":"白起","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"},{"name":"夏侯惇","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"},{"name":"项羽","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"},{"name":"程咬金","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"},{"name":"刘邦","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"},{"name":"牛魔","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"},{"name":"张飞","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"},{"name":"东皇太一","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"},{"name":"苏烈","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"},{"name":"梦奇","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"},{"name":"孙策","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"},{"name":"猪八戒","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"}]},{"name":"刺客","heroes":[{"name":"阿轲","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg"},{"name":"李白","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg"},{"name":"韩信","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"},{"name":"兰陵王","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg"},{"name":"娜可露露","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg"},{"name":"橘右京","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"},{"name":"百里玄策","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg"},{"name":"裴擒虎","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"},{"name":"元歌","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg"},{"name":"司马懿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"},{"name":"云中君","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"}]},{"name":"射手","heroes":[{"name":"孙尚香","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"},{"name":"鲁班七号","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"},{"name":"马可波罗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg"},{"name":"狄仁杰","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg"},{"name":"后羿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"},{"name":"李元芳","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg"},{"name":"虞姬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg"},{"name":"成吉思汗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg"},{"name":"黄忠","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg"},{"name":"百里守约","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"},{"name":"公孙离","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg"},{"name":"伽罗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg"}]},{"name":"辅助","heroes":[{"name":"庄周","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"},{"name":"孙膑","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"},{"name":"蔡文姬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg"},{"name":"太乙真人","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"},{"name":"大乔","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg"},{"name":"鬼谷子","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg"},{"name":"明世隐","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg"},{"name":"盾山","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg"},{"name":"瑶","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg"}]}]
    await Hero.deleteMany({})
    for (let cat of rawData) {
      if (cat.name === '热门') {
        continue
      }
      // 找到当前分类在数据库对应的数据
      const category = await Category.findOne({name: cat.name})
      cat.heroes.map(hero => {
        console.log(category)
        hero.categories = [category]
        return hero
      })
      await Hero.insertMany(cat.heroes)
    }
    response.send(await Hero.find())
  })

  // 英雄列表接口
  router.get('/heroes/list', async (request, response) => {
    // 聚合查询
    const parent = await Category.findOne({
      name: '英雄分类'
    })
    const cats = await Category.aggregate([
      {$match: {parent: parent._id}},
      {
        $lookup: {
          from: 'heroes',
          localField: '_id',
          foreignField: 'categories',
          as: 'heroList'
        }
      }
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      heroList: await Hero.find().where({categories: {$in: subCats}}).limit(10).lean()
    })

    response.send(cats)
  })

  // 文章接口
  router.get('/articles/:id', async (request, response) => {
    const data = await Article.findById(request.params.id).lean()
    data.related = await Article.find().where({categories: {$in: data.categories}}).limit(2)
    response.send(data)
  })

  // 首页幻灯片广告接口
  router.get('/ad/list', async (request, response) => {
    const data = await Ad.findOne({name: '首页幻灯片广告'})
    response.send(data)
  })

  // 获取英雄详情界面
  router.get('/heroes/:id', async (request, response) => {
    const data = await Hero.findById(request.params.id).populate('categories items1 items2 partners.hero').lean()
    response.send(data)
  })

  // 初始化视频数据
  router.get('/video/init', async (request, response) => {
    const rawData = [{"name":"精品栏目","articles":[{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190803/9826a78321e3549d837f73c81c25738b.1564825401.3e0bbe79b182c2e99e0dff79c0a1ac87.230x140_15205.jpg","title":"【零度王者视角】第四十六期：站我身后输出！屹立不倒的重装坦克"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190802/9c95ce11b74c23baf56a1f9690c0ea81.1564712926.022941454d92c2a1b508039f5a581eae.960x600_397399.jpg","title":"【峡谷重案组】S3 第11集 狄仁杰之“死” 李白VS大魔头"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190801/a8f73a12cdddf0f835c47d97c73a52de.1564648515.7feb3fe7cfb85a3e4214cc67e6d89248.230x140_12659.jpg","title":"【上分拍档】92期：米莱狄+赵云  智械围城 平推三路"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190801/53873bcaec5c3fe56e9d681410452d30.1564638741.a6f6f8c3b136a9fe6e02c5f30cc14fd2.230x140_26387.jpg","title":"【王者克制论】完美克制米莱狄！女王秒变小猫咪"}]},{"name":"英雄攻略","articles":[{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190802/cfcd208495d565ef66e7dff9f98764da.1564754682.0d87ef77739b7005cbfeb42a267544f8.230x140_21745.jpg","title":"见过175%攻速伽罗出手吗？放箭那一刻，秀儿貂蝉愣住了！"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190802/779fde5fb7f58616ecb12ac53832d84f.1564759073.1c44b3f613ea136140330f23c1becca7.230x140_14939.jpg","title":"夏侯惇：这把神器逐日之弓就留给有缘人吧！"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190802/db9eeb7e678863649bce209842e0d164.1564758330.907dc7d7c123bfc31741b06528c46b9e.230x140_16766.jpg","title":"程咬金：我血量越低伤害越高！宫本：单挑来！"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190802/db9eeb7e678863649bce209842e0d164.1564759382.ef4202784825c01aab8f428b5165ea73.230x140_16910.jpg","title":"诸葛亮：只要胆子大！貂蝉不可怕！"}]},{"name":"赛事精品","articles":[{"thumbnail":"http://puui.qpic.cn/qqvideo_ori/0/e0908qva5mm_1280_720/0","title":"RW-Hero：关羽绕后无解杀C！姜子牙体系全面压制进决赛！"},{"thumbnail":"https://shp.qpic.cn/cfwebcap/0/25a0bde5dd02968bde6a4eb246db74d1/0/?width=230&height=140","title":"【KCC世界冠军杯】淘汰赛_eStar vs RNG.M_6"},{"thumbnail":"https://shp.qpic.cn/cfwebcap/0/c69e0d7e439d230fabeb97fb8abe605d/0/?width=230&height=140","title":"【KCC世界冠军杯】淘汰赛_eStar vs RNG.M_5"},{"thumbnail":"https://shp.qpic.cn/cfwebcap/0/db8324855283318178c90a4879300383/0/?width=230&height=140","title":"【KCC世界冠军杯】淘汰赛_eStar vs RNG.M_4"}]},{"name":"赛事视频","articles":[{"thumbnail":"https://puui.qpic.cn/qqvideo_ori/0/k0908msef72_1280_720/0","title":"11分钟高10000经济碾压！RW无懈可击！"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190803/685ab503d07a357770225e56e58eeacc.1564799686.0d65beb776f07021d3b640dbddfc3939.230x140_14214.jpg","title":"Hero关羽塔下神级回顶，RW曹操后手收割！"},{"thumbnail":"https://puui.qpic.cn/qqvideo_ori/0/y0908trc2tq_1280_720/0","title":"歪歪赛评：如何克制鬼谷子+王昭君组合，RW侠用孙膑完美应对"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190804/6e44a8487e547482e709e346f36bbb29.1564884263.768671d1d02d40deac51776d3b4187e3.230x140_51072.jpg","title":"RNGM狄仁杰天秀四杀，E星马可波罗转满大招"}]}]
    for (let cat of rawData) {
      // 找到当前分类在数据库对应的数据
      const category = await Category.findOne({name: cat.name})
      cat.articles.map(article => {
        article.categories = [category]
        return article
      })
      await Article.insertMany(cat.articles)
    }
    response.send(await Article.find().lean())
  })

  // 视频列表接口
  router.get('/video/list', async (request, response) => {
    // 聚合查询
    const parent = await Category.findOne({
      name: '视频分类'
    })
    const cats = await Category.aggregate([
      {$match: {parent: parent._id}},
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'articleList'
        }
      }
    ])

    response.send(cats)
  })

  // 初始化图文数据
  router.get('/strategy/init', async (request, response) => {
    const rawData = [{"name":"最新","articles":[{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190805/a8f73a12cdddf0f835c47d97c73a52de.1564973817.a49e539bc6b7becd6d993e32de375d1f.230x140_31015.jpg","title":"上分新选择，RW侠.杨过嫦娥教你用坦克身板打出刺客爆发上分新选择，RW侠.杨过嫦娥教你用坦克身板打出刺客爆发008-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190803/6269ba690b64e470f1340baccc6e13d5.1564814993.612b12eeff6ca0bffcfb482f4e65bd27.184x124_20657.jpg","title":"王者荣耀：新版本妲己封神，“明狐流”玩法4分钟秒杀鲁班惹争议王者荣耀：新版本妲己封神，“明狐流”玩法4分钟秒杀鲁班惹争议808-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190731/6cdd60ea0045eb7a6ec44c54d29ed402.1564557807.e9db8dc9828b02eb14b80dac30ad1487.184x124_16152.jpg","title":"双排搭档第一期：法师墨子控制与消耗，射手公孙离飘逸身法输出双排搭档第一期：法师墨子控制与消耗，射手公孙离飘逸身法输出308-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190731/f92cdbb997beb4d8da91d3e17edbac86.1564564565.4f7f4068f0103a85fdfb4a237e19ea39.184x124_17324.jpg","title":"S16上分法师：不知火舞出装铭文打法教学，这样搭配阵容上分S16上分法师：不知火舞出装铭文打法教学，这样搭配阵容上分608-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190802/51e4018a482f32f13a0a0a01b976c42f.1564733232.3b09307de7a56e12f1c325a6d74d6198.230x140_16426.jpg","title":"王者荣耀：暴击伤害被调整后，百里守约最新出装，让你秀翻全场王者荣耀：暴击伤害被调整后，百里守约最新出装，让你秀翻全场008-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190802/235952add03ecffe06d5bbf9cdb3ae16.1564730618.2ce096f4f31b81e72d0cbca70f5b50af.230x140_10795.jpg","title":"S16装备大改，打野崛起，兰陵王打野详细操作，王者不是梦S16装备大改，打野崛起，兰陵王打野详细操作，王者不是梦008-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190802/6da9003b743b65f4c0ccd295cc484e57.1564717509.059aa2f8ccb3124f737fa96d95f87f57.230x140_23353.jpg","title":"S16输出位单排上分推荐|法师妲己，射手后羿S16输出位单排上分推荐|法师妲己，射手后羿008-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190802/22348f642503adaf7d3641928e6ef285.1564728271.05622b4e034fc6ddd20662b94fc3444f.230x140_17371.jpg","title":"王者荣耀：射手遇到兰陵王都颤抖？，这几位却让他有来无回王者荣耀：射手遇到兰陵王都颤抖？，这几位却让他有来无回008-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190802/2f7b27942b4dbfc41244166fb807feec.1564751105.9f402026a0c207ad08e9c4d190cba2a6.230x140_93918.png","title":"王者荣耀：第39章  廉颇助战达摩王者荣耀：第39章  廉颇助战达摩008-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190801/50dca9b17cb5e0209c7545e67be322fb.1564644136.50d6c91a4711d9c3e9f7b5ed45ddd68c.230x140_14309.jpg","title":"COSPLAY少女图集第一期：貂蝉仲夏夜之梦！COSPLAY少女图集第一期：貂蝉仲夏夜之梦！008-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190801/d929e8f16c027f4bc25f32e61a9329fd.1564655215.26fa4a0c31689efb4584db7ae9b0f5a2.184x124_11871.jpg","title":"【COS偶像季】第33期：事物一旦褪色，便属于永恒—杨玉环各位小主们好~今天喵酱为大家带来的是杨玉环的遇见飞天cos008-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190802/af5f1cc97eca2a03880d8353c02d5400.1564707802.79256d22c4ddb8c91cba00faf73baf37.230x140_30931.jpg","title":"王者小漫画：孙悟空蹲孙膑，没秒掉，孙膑开技能逃跑了王者小漫画：孙悟空蹲孙膑，没秒掉，孙膑开技能逃跑了008-05"}]},{"name":"英雄","articles":[{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190802/22348f642503adaf7d3641928e6ef285.1564728271.05622b4e034fc6ddd20662b94fc3444f.230x140_17371.jpg","title":"王者荣耀：射手遇到兰陵王都颤抖？，这几位却让他有来无回王者荣耀：射手遇到兰陵王都颤抖？，这几位却让他有来无回2308-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190802/c8070d27b86aa1bc7489142aa8d82a55.1564753294.ef6375f0e332fb24e691953f741a5f05.230x140_19218.jpg","title":"营地数据榜：射手榜首易主，狄仁杰微调第二都没保住，他后来居上营地数据榜：射手榜首易主，狄仁杰微调第二都没保住，他后来居上14508-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190802/6da9003b743b65f4c0ccd295cc484e57.1564734748.c412f7ff79ce5118fc6c0f2dc7bc21f8.230x140_22324.jpg","title":"王者荣耀：最考验意识的三位辅助，新手玩不好，大神当成宝！王者荣耀：最考验意识的三位辅助，新手玩不好，大神当成宝！31508-04"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190803/9c870b08abc2bbef571b43cf4e7bab45.1564829953.f3fe6cd752cc6e65e61dda6f78b95258.230x140_15761.jpg","title":"8月初射手T度排行榜，看看你心仪的射手进入了榜几8月初射手T度排行榜，看看你心仪的射手进入了榜几40008-04"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190801/6da9003b743b65f4c0ccd295cc484e57.1564635606.8cf7fc5a37204778f7abb641d3396c36.230x140_22161.jpg","title":"王者荣耀：射手出肉会更强？打惯了输出装的，不妨来看看吧！王者荣耀：射手出肉会更强？打惯了输出装的，不妨来看看吧！69508-02"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190801/0d82f381b3cf063206eaad4e5c42fe72.1564645567.a370141bbf52be2ea081601894db741f.230x140_20971.jpg","title":"王者荣耀：最克制虞姬的英雄是谁？玩家投票，他们三上榜！王者荣耀：最克制虞姬的英雄是谁？玩家投票，他们三上榜！48708-02"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190731/b0ca4eff978167e0f1953fcea8832d3f.1564566213.f0663874be6d1c54418f87519ae9c4b4.230x140_44966.jpg","title":"上分秘诀之射手，站桩射手的三件法宝！后羿实战打法简介！上分秘诀之射手，站桩射手的三件法宝！后羿实战打法简介！41308-02"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190801/cfcd208495d565ef66e7dff9f98764da.1564663108.3ae6598382d0152ff4ecdeaff5c05109.230x140_23155.jpg","title":"草丛两个小可爱喜迎增强，妲己安琪拉下限再次提升，中路上分首选草丛两个小可爱喜迎增强，妲己安琪拉下限再次提升，中路上分首选24908-02"}]},{"name":"新手","articles":[{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190724/bf58dde0eae7ed9a9d0f34398114b549.1563953637.749d4f23ff7944ce316231955293f7f4.230x140_64704.jpg","title":"王者荣耀除了需要熟练度，常见细节技巧分享，高端局玩家都知道王者荣耀除了需要熟练度，常见细节技巧分享，高端局玩家都知道292107-26"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190715/02e74f10e0327ad868d138f2b4fdd6f0.1563167064.84d08c51c719aea1ab113f9b80921bb6.230x140_88394.jpg","title":"王者荣耀：超强实战中路游走技巧，学好三大原则轻松上分王者荣耀：超强实战中路游走技巧，学好三大原则轻松上分377207-16"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190713/22c25c4f633efd5c33709cc12e60ac9b.1562949914.01a72a26af86b805b1cbde5c6fda25fe.230x140_18586.jpg","title":"全英雄铭文搭配思路，干货教程-战士篇全英雄铭文搭配思路，干货教程-战士篇327407-15"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190713/cd53d53ef16137b6446a595b0c09b808.1562950751.0786380e3ce07bee8ce71cd7ee82f1e3.230x140_16668.jpg","title":"全英雄铭文搭配思路，干货教程-刺客+辅助篇全英雄铭文搭配思路，干货教程-刺客+辅助篇256107-13"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190713/ccb3d22a44e997e6b33296013a6383b3.1562987847.75d1dc343f85e661887755df3db8ef76.230x140_20839.jpg","title":"鞋子作为6大神装之一，每人必出，但你真的对它研究过吗？鞋子作为6大神装之一，每人必出，但你真的对它研究过吗？258807-13"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190709/4134d9e2acb614ea98c12902490a8541.1562656487.ad2289a391fbeb879ae38941f82af8bf.230x140_16538.jpg","title":"王者荣耀：领悟装备中“唯一被动”的意思，别再被说不会出装了王者荣耀：领悟装备中“唯一被动”的意思，别再被说不会出装了166607-12"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190710/0ac88cfa3358a41a848a0996ba2980d1.1562760261.c6b7c09ebef1df462c7df296aa94cc46.230x140_7096.jpg","title":"王者荣耀：如何成为一名优秀的上单玩家？这十点意识你必须掌握！王者荣耀：如何成为一名优秀的上单玩家？这十点意识你必须掌握！313807-11"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190628/4134d9e2acb614ea98c12902490a8541.1561707086.1aea7d895e4c6afdca57e1547e6becfd.230x140_16538.jpg","title":"王者荣耀：常用铭文搭配，真的很详细啦王者荣耀：常用铭文搭配，真的很详细啦1.1万06-30"}]},{"name":"官方","articles":[{"thumbnail":"https://shp.qpic.cn/cfwebcap/0/b0bfa37d5549734d96debd154358888b/0/?width=230&height=140","title":"英雄故事 | 孙膑：为了我的挚友，流动吧，时间之力！329107-12"},{"thumbnail":"https://shp.qpic.cn/cfwebcap/0/27cdca796c0f520fbce6f61536d1cb51/0/?width=230&height=140","title":"云中君vs瑶：隔着一颗眼泪，也看不清生死的羁绊297907-04"},{"thumbnail":"https://shp.qpic.cn/cfwebcap/0/0b2742a68d0c30046a9b751b2c1733ae/0/?width=230&height=140","title":"中二少年的独白：我就是想证明自己257007-01"},{"thumbnail":"https://shp.qpic.cn/cfwebcap/0/b179d7510c7e2a1087c043766a972c3f/0/?width=230&height=140","title":"王者世界观体验站更新！绝密档案已曝光241606-28"},{"thumbnail":"https://shp.qpic.cn/cfwebcap/0/8006f57e49f156441ca43784b8644d04/0/?width=230&height=140","title":"英雄故事 | 曜-星辰之子2.1万06-27"},{"thumbnail":"https://shp.qpic.cn/cfwebcap/0/9e5fbde7944361ae0a81c01142a11c1e/0/?width=230&height=140","title":"稷下学院 | 诸葛学长带你逛母校440306-22"},{"thumbnail":"https://shp.qpic.cn/cfwebcap/0/baea4fbea5add7ab7404e23d7650e104/0/?width=230&height=140","title":"王者大陆行 | 云中漠地-都护府210106-14"},{"thumbnail":"https://shp.qpic.cn/cfwebcap/0/a75eca0408b2ef7a81f0ad4add6b611a/0/?width=230&height=140","title":"王者大陆行 | 云中漠地-千窟城256805-22"}]},{"name":"同人","articles":[{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190802/2f7b27942b4dbfc41244166fb807feec.1564751105.9f402026a0c207ad08e9c4d190cba2a6.230x140_93918.png","title":"王者荣耀：第39章  廉颇助战达摩王者荣耀：第39章  廉颇助战达摩408-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190801/50dca9b17cb5e0209c7545e67be322fb.1564644136.50d6c91a4711d9c3e9f7b5ed45ddd68c.230x140_14309.jpg","title":"COSPLAY少女图集第一期：貂蝉仲夏夜之梦！COSPLAY少女图集第一期：貂蝉仲夏夜之梦！3208-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190801/d929e8f16c027f4bc25f32e61a9329fd.1564655215.26fa4a0c31689efb4584db7ae9b0f5a2.184x124_11871.jpg","title":"【COS偶像季】第33期：事物一旦褪色，便属于永恒—杨玉环各位小主们好~今天喵酱为大家带来的是杨玉环的遇见飞天cos908-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190802/af5f1cc97eca2a03880d8353c02d5400.1564707802.79256d22c4ddb8c91cba00faf73baf37.230x140_30931.jpg","title":"王者小漫画：孙悟空蹲孙膑，没秒掉，孙膑开技能逃跑了王者小漫画：孙悟空蹲孙膑，没秒掉，孙膑开技能逃跑了1308-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190801/cafcd608ef5eabf6a914496cf6619386.1564649238.265db5883f9d6bcd7f5c0bc15697379d.230x140_96990.png","title":"王者荣耀：第38章  铠大战达摩王者荣耀：第38章  铠大战达摩2008-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190801/ad5cd456156595403e6b7ac55ffc56c1.1564633254.82cba11fe20f6e79b4b209ad72f06de8.230x140_19568.jpg","title":"吕布不甜，貂蝉不爱 第二章 与你的仲夏夜之梦吕布不甜，貂蝉不爱 第二章 与你的仲夏夜之梦708-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190731/d0d7ac64a230f4499fb00107cea0a5d0.1564568751.04751f4c0b6d45faef5958be879421ab.230x140_44446.jpg","title":"《王者荣耀》貂蝉金色仲夏夜绘画过程《王者荣耀》貂蝉金色仲夏夜绘画过程808-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190802/6903f73233abe2097cd7e8451ebd192d.1564736237.fc25c046ebc347aa5ddbf1381b981c83.184x124_59036.jpg","title":"曾有惊鸿，但望长安（二）今夏暖心连载中曾有惊鸿，但望长安（二）今夏暖心连载中508-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190801/d745e3ffeb7d2022547fabb46511442a.1564645702.07cc8136fd65233728245307ba11c7d0.184x124_11593.jpg","title":"COSPLAY少女图集第二期：大乔-沧海之曜！COSPLAY少女图集第二期：大乔-沧海之曜！11308-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190730/8aadf776e0552e4d08bac2e11b8873ec.1564420773.f9cd4bacdc56bf205d0a002e1083af40.230x140_44047.jpg","title":"同人绘画：一往无前的浪！同人绘画：一往无前的浪！29308-02"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190731/5d518828ff221e17893fa8ebbb65a39e.1564548154.3ba1df9caa22415613edca3853faf830.184x124_13119.jpg","title":"王者峡谷里的童子军鸭（Q版同人）王者峡谷里的童子军鸭（Q版同人）28308-02"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190731/6da9003b743b65f4c0ccd295cc484e57.1564578114.abd96e704074c5d7aef05f92809d21fb.230x140_17496.jpg","title":"《稷下游》第四章：一码归一码，鱼倒是挺好吃，不过你别追我们啊《稷下游》第四章：一码归一码，鱼倒是挺好吃，不过你别追我们啊37208-01"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190731/00f63ab902edb67f7fbd877741746533.1564550845.3d6ce3b5256f5decd71b0f01bca6bc92.230x140_20988.jpg","title":"诸葛亮赵云的睡姿起床困难户们诸葛亮赵云的睡姿起床困难户们42108-01"},{"thumbnail":"https://shp.qpic.cn/cfwebcap/0/29f7871bae0b74366ceb1993eaf81274/0/?width=230&height=140","title":"王者萌萌假日 92话 李白VS宫本武藏（一）23308-01"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190730/6da9003b743b65f4c0ccd295cc484e57.1564484528.781a45993eddc117d43c507405b01384.230x140_17496.jpg","title":"《稷下游》第三章：起床机器人的威力不亚于在火山上睡觉的感觉《稷下游》第三章：起床机器人的威力不亚于在火山上睡觉的感觉24607-31"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190730/d63d9f8016e03a8d913cf6f4b6b1c02c.1564488284.c28125b66d76f59250df02f94af4f368.230x140_15097.jpg","title":"我家李白不可能那么可爱第二十九章我家李白不可能那么可爱第二十九章37507-31"},{"thumbnail":"https://shp.qpic.cn/cfwebcap/0/150adce63d4d8f0c7575f3e88d852255/0/?width=230&height=140","title":"英雄故事 | 云中君：小鹿女，你的谎言我都懂459305-11"},{"thumbnail":"https://shp.qpic.cn/cfwebcap/0/4994706713e802d3b4985bfe52e51a2a/0/?width=230&height=140","title":"英雄故事 | 云中君：不是天使，胜是天使144905-11"},{"thumbnail":"https://shp.qpic.cn/cfwebcap/0/3a877748232c96c1711904f872b88737/0/?width=230&height=140","title":"英雄小传 | 第一个全程飞的英雄，必承受更多痛苦！英雄小传 | 第一个全程飞的英雄，必承受更多痛苦！1.3万05-10"},{"thumbnail":"https://shp.qpic.cn/cfwebcap/0/adade14f5990bc18d0e024dd8a175d27/0/?width=230&height=140","title":"王者大陆行 | 云中漠地-玉城王者大陆行 | 云中漠地-玉城321304-23"},{"thumbnail":"https://shp.qpic.cn/cfwebcap/0/33b05fb59efff9b2a4619dc3e1ea4ff7/0/?width=230&height=140","title":"英雄故事 | 瑶-过去生于未来英雄故事 | 瑶-过去生于未来815604-15"},{"thumbnail":"https://shp.qpic.cn/cfwebcap/0/08dfef93bbab19904a58ffdb920281f3/0/?width=230&height=140","title":"英雄故事 | 狂铁-为何而战的意志，胜于钢铁之躯狂铁-为何而战的意志，胜于钢铁之躯259804-10"},{"thumbnail":"https://shp.qpic.cn/cfwebcap/0/606c6f0284a6517e4f80f38ac46fb26b/0/?width=230&height=140","title":"王者营地4月8日活动异常说明公告309304-10"},{"thumbnail":"https://shp.qpic.cn/cfwebcap/0/b911b28b6b984817254549d3cc720c3a/0/?width=230&height=140","title":"英雄故事 | 虞姬-明媚如风，轻盈似箭256604-06"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190623/c81e728d9d4c2f636f067f89cc14862c.1561227097.8ed946a29c732181c6c469af7bd4a3ff.230x140_49973.jpg","title":"上分攻略︱这件装备虽然冷门，但却是射手英雄的翻盘利器！上分攻略︱这件装备虽然冷门，但却是射手英雄的翻盘利器！305206-29"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190618/d612ae2e1245a287f727b3b758d70e9f.1560835832.6ea731298b68e947584a4a511fcf84f3.230x140_12022.jpg","title":"王者荣耀：上单第一件出暗影战斧，难怪守塔守不住王者荣耀：上单第一件出暗影战斧，难怪守塔守不住552506-20"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190613/c81e728d9d4c2f636f067f89cc14862c.1560392596.4ac5f197c8c25020e1fec1e540afdf83.230x140_19684.jpg","title":"王者荣耀：很难出的装备，破晓ADC必出，破军看情况，贤者尴尬王者荣耀：很难出的装备，破晓ADC必出，破军看情况，贤者尴尬309106-16"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190614/d64288cca2eed9b7fa8762d4822490f7.1560500295.0b3a8d01ce4aa02db7571f43e92598a1.230x140_19501.jpg","title":"王者荣耀S15法师通用铭文 新赛季法师铭文怎么搭配王者荣耀S15法师通用铭文 新赛季法师铭文怎么搭配396806-16"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190526/6944498554deb588b04967b079a1cf8a.1558843731.b6a783488e1bf58eadf1cb4e3ce2b7ab.230x140_54587.jpg","title":"王者荣耀中鲜少有人掌握的四个技巧，学会两个轻松上王者！王者荣耀中鲜少有人掌握的四个技巧，学会两个轻松上王者！1.1万05-28"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190524/4dd8f10a65df6c0daadd17d9785d257f.1558712716.32f439e02d6092b071215d7b89d32355.230x140_5469.jpg","title":"打野修炼手册：作为打野，如何呼风唤雨，掌控节奏，拿下胜利？打野修炼手册：作为打野，如何呼风唤雨，掌控节奏，拿下胜利？653005-26"},{"thumbnail":"https://shp.qpic.cn/cfwebcap/0/0b32c8593bcb7baf62365634c0c7493c/0/?width=230&height=140","title":"【虎扑攻略】S15五排最简单上分法则：拒绝花里胡哨，保护我方输出虎扑攻略232505-23"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190517/424de7a8a3c9bb09f108f4f24d597297.1558087000.ade3dafb7c7a4f67049e151830a3f768.230x140_9427.jpg","title":"玩辅助不会站位开视野？这里教你轻松学会辅助的所有视野站位玩辅助不会站位开视野？这里教你轻松学会辅助的所有视野站位460305-22"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190731/6da9003b743b65f4c0ccd295cc484e57.1564558615.656819319d1c8b7b96b6be2137fb78b5.230x140_62701.jpg","title":"S16辅助国服荣耀战力排榜|鬼谷子稳居前三，黑马的她排在榜首S16辅助国服荣耀战力排榜|鬼谷子稳居前三，黑马的她排在榜首41108-02"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190731/903ce9225fca3e988c2af215d4e544d3.1564562825.6823dae008c0961396585188126858ce.230x140_14746.jpg","title":"辅助英雄又引玩家们吐槽，三种出门思路到底该选哪一种好？辅助英雄又引玩家们吐槽，三种出门思路到底该选哪一种好？16908-02"},{"thumbnail":"https://shp.qpic.cn/cfwebcap/0/a8c46a69d38abc5c9892261e38185773/0/?width=230&height=140","title":"峡谷小短腿，输出扛大旗——鲁班七号 进阶攻略相信很多玩家都购买了S16的战令，在战令皮肤醒狮的加持下，很多玩家都会去试着重新接触这个被所有玩家调侃的小卤蛋。在几个版本的累积改动下，现阶段的鲁班除了无位移，已经是一个很成熟的射手英雄，具有后期超高的团战AOE输出，以及超强的前期推塔能力，发育能力，这篇攻略为大家带来鲁班的详细玩法。58408-01"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190730/0e5d3556154fd589bfd3fd1940ef2905.1564476384.d5ce7b3a5f6d90008d2e867cabddc0fc.230x140_58999.jpg","title":"S16上分三大辅助！用瑶拿金牌，用她稳星耀！他才是王者!S16上分三大辅助！用瑶拿金牌，用她稳星耀！他才是王者!43808-01"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190730/328d13ded2a596159a296fdc593d9f53.1564479559.72a2a92de17820a7d9bb318a348b800e.230x140_19367.jpg","title":"王者荣耀：热门刺客排名，第一名很多玩家都想不到！看看？王者荣耀：热门刺客排名，第一名很多玩家都想不到！看看？68008-01"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190730/92a74dc0addfe6f37c9e037d2470c6a5.1564457984.f776aef2bb33fbf284344a4481a6dd90.230x140_32009.jpg","title":"选择困难症福音 现版本辅助装备超详解选择困难症福音 现版本辅助装备超详解53007-30"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190727/d9b4df955bdc7acb0c3c34ee23fa6f24.1564195037.ea381fbbeb6174b00f1f8f9811e611e2.230x140_48503.jpg","title":"如何成为一个合格的辅助，学会这几点，上王者指日可待如何成为一个合格的辅助，学会这几点，上王者指日可待118907-27"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190725/c1aaab9311fb43b284d2c33772e3aad1.1564064061.289e78fb7962450e79d834b899df5c11.230x140_51341.jpg","title":"新赛季打野蹭线被骂，究竟是谁的错？新赛季打野蹭线被骂，究竟是谁的错？50707-27"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190802/51e4018a482f32f13a0a0a01b976c42f.1564733232.3b09307de7a56e12f1c325a6d74d6198.230x140_16426.jpg","title":"王者荣耀：暴击伤害被调整后，百里守约最新出装，让你秀翻全场王者荣耀：暴击伤害被调整后，百里守约最新出装，让你秀翻全场4308-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190802/235952add03ecffe06d5bbf9cdb3ae16.1564730618.2ce096f4f31b81e72d0cbca70f5b50af.230x140_10795.jpg","title":"S16装备大改，打野崛起，兰陵王打野详细操作，王者不是梦S16装备大改，打野崛起，兰陵王打野详细操作，王者不是梦5308-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190802/6da9003b743b65f4c0ccd295cc484e57.1564717509.059aa2f8ccb3124f737fa96d95f87f57.230x140_23353.jpg","title":"S16输出位单排上分推荐|法师妲己，射手后羿S16输出位单排上分推荐|法师妲己，射手后羿1908-05"},{"thumbnail":"https://itea-cdn.qq.com/file/tgl/20190802/22348f642503adaf7d3641928e6ef285.1564728271.05622b4e034fc6ddd20662b94fc3444f.230x140_17371.jpg","title":"王者荣耀：射手遇到兰陵王都颤抖？，这几位却让他有来无回王者荣耀：射手遇到兰陵王都颤抖？，这几位却让他有来无回2308-05"}]}]
    for (let cat of rawData) {
      // 找到当前分类在数据库对应的数据
      const category = await Category.findOne({name: cat.name})
      cat.articles.map(article => {
        article.categories = [category]
        return article
      })
      await Article.insertMany(cat.articles)
    }
    response.send(await Article.find().lean())
  })

  // 图文列表接口
  router.get('/strategy/list', async (request, response) => {
    // 聚合查询
    const parent = await Category.findOne({
      name: '图文分类'
    })
    const cats = await Category.aggregate([
      {$match: {parent: parent._id}},
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'articleList'
        }
      }
    ])

    response.send(cats)
  })

  app.use('/web/api', router)
}
