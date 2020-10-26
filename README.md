# pilipili-server
仿造的BiliBili <br />
前端代码：https://github.com/muxkou/pilipili-web-app


# 运行
yarn
yarn start:dev
默认运行在 localhost:3000

# 静态资源
静态资源放在文件夹resouces下，自行部署nginx （前端代码从localhost:8081端口获取）
nginx 配置：   <br />

```
listen       8081   ;
server_name  localhost;

location / {
    root html;
    index index.html index.htm;
}

location /resouces/ {
    alias /usr/local/resouces/;
    autoindex on;
}
```
