/**
 * Created by wenbo.kuang on 2018/6/4.
 */
const chalk = require("chalk");
const express = require("express");
const cookieParser = require("cookie-parser");
const config = require("./config");
//morgan是express默认的日志中间件
const logger = require("morgan");
const FileStreamRotator = require("file-stream-rotator");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const tools = require("./config/common");

const isProd = process.env.NODE_ENV === 'production';

//连接数据库
require("./config/db");

const app = express();

//配置本地日志，根据时间节点对日志进行文件输出分割
const logDirectory = path.join(__dirname, config.logDirectory);
//保证日志文件夹存在
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
//创建文件分割流
const localLogStream = FileStreamRotator.getStream({
    date_format: "YYYYMMDD",
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
});
//采用日志系统
app.use(logger(isProd ? 'combined' : 'dev', {stream: localLogStream}));

//对post请求的请求体进行解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//获取cookie，可通过req.cookie获取cookie值
app.use(cookieParser());
//静态资源
app.use(express.static("./public"));

//动态配置路由
function bootstrapRoutes() {
    const appPath = process.cwd();

    tools.walk(appPath + '/src', 'routes', '', function(path) {
        require(path)(app);
    });
}

bootstrapRoutes();

//启动服务
app.listen(config.port, (err) => {
    if (err) {
        console.log(chalk.red(`start service failed`));
        return;
    }
    console.log(chalk.green(`service is deployed on ${config.port}`));
});