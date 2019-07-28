## 文件目录

src
  │  App.vue	// 应用组件
  │  main.js	// 组件入口
  │  
  ├─api			// 与后台交互模块文件夹
  │      ajax.js
  │      
  ├─assets			// 通用资源文件夹
  │  └─css
  │          style.css
  │          
  ├─components		// 非路有资源文件夹
  ├─pages			// 路由组件文件夹
  │  ├─Login		// 登录
  │  │      Login.vue
  │  │      
  │  └─Main		// 主界面
  │      │  Main.vue
  │      │  
  │      ├─AdminUsers	// 后台用户管理
  │      │      AdminUsersEdit.vue
  │      │      AdminUsersList.vue
  │      │      
  │      ├─ADs		// 广告位管理
  │      │      ADsEdit.vue
  │      │      ADsList.vue
  │      │      
  │      ├─Articles		// 文章管理
  │      │      ArticlesEdit.vue
  │      │      ArticlesList.vue
  │      │      
  
  │      ├─Categories		// 分类管理
  │      │      CategoryEdit.vue
  │      │      CategoryList.vue
  │      │      
  │      ├─Heros		// 英雄管理
  │      │      HeroEdit.vue
  │      │      HeroList.vue
  │      │      
  │      └─Items		// 物品管理
  │              ItemEdit.vue
  │              ItemList.vue
  │              
  └─router			// 路由文件夹
           index.js
## Categories 分类管理
用于增删英雌,文章,广告位等大类,以及新闻,公告等小类
## ADs 广告位管理
用于管理广告位轮播图和连接
## Articles	文章管理
用于管理新闻,公告等文章的上传与删除
## Items 物品管理
用于管理游戏物品描述及图标
## Heros 英雄管理
用于管理游戏英雄描述和技能描述
## AdminUsers 后台用户管理
用于管理后台用户的账号
