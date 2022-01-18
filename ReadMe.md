01.安装nodemon实现自动更新
    npm install nodemon
    在package.json中编写一个启动脚本：
        "dev":"nodemon ./src/mian.js"
02.安装dotenv实现端口的外部封装
    暴露在env这个对象当中
    npm install dotenv
    在.env文件中 写入需要的变量
    然后在config文件夹下 config.default.js中导入dorenv，调用config()方法，导出process.env对象即可，在需要的文件中const {} = require(') 
03.安装koa-router
    npm install koa-router
    
04.