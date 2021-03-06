const express = require("express")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const app = express()

// 设置变量
app.set('secret', 'nodevuemoba')

app.use(require('cors')())
app.use(express.json())

// 启动数据库
require('./db/db')(app)
require('./routes/admin/index')(app)
require('./routes/web/index')(app)


// 静态文件
app.use('/public', express.static(__dirname + '/public'))
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/moba', express.static(__dirname + '/moba'))
app.use('/limni', express.static(__dirname + '/limni'))
app.use('/music', express.static(__dirname + '/music'))
app.use('/todoapp', express.static(__dirname + '/todoapp'))
app.use('/akita_summer_component_library', express.static(__dirname + '/akita_summer_component_library'))
app.use('/cheese', express.static(__dirname + '/cheese'))


// 导入路由
app.use('/', indexRouter);
app.use('/users', usersRouter);


app.listen(4001, () => {
    console.log('http://localhost:4001');
});
