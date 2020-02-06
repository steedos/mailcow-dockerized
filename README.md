# mailcow: dockerized - 🐮 + 🐋 = 💕

## Want to support mailcow?

Please [consider a support contract (around 30 € per month) with Servercow](https://www.servercow.de/mailcow#support) to support further development. _We_ support _you_ while _you_ support _us_. :)

Or just spread the word: moo.

## Info and documentation

Please see [the official documentation](https://mailcow.github.io/mailcow-dockerized-docs/) for instructions.

**Important**: mailcow makes use of various open-source software. Please assure you agree with their license before using mailcow.
Any part of mailcow itself is released under **GNU General Public License, Version 3**.

## 常用配置

### 1. 默认语言
打开 [data/conf/sogo/sogo.conf](https://github.com/steedos/mailcow-dockerized/blob/steedos/data/conf/sogo/sogo.conf) 并设置SOGoLanguage(简体中文为ChineseChina)

修改后重启相关服务
```
docker-compose restart php-fpm-mailcow sogo-mailcow dovecot-mailcow
```

### 2. 单个邮件大小
打开 [data/conf/postfix/main.cf](https://github.com/steedos/mailcow-dockerized/blob/steedos/data/conf/postfix/main.cf) 并设置message_size_limit相应的字节数(默认为100MB)

修改后重启相关服务
```
docker-compose restart postfix-mailcow
```

### 3. 设置logo
替换 data/conf/sogo/sogo-full.svg,并重启相关服务
```
docker-compose restart memcached-mailcow sogo-mailcow
```

### 4. 登陆有效期设置
打开服务器项目根路径下的mailcow.conf,修改SOGO_EXPIRE_SESSION值,单位为分钟(默认值为480分钟)

修改后重启服务
```
docker-compose restart sogo-mailcow
```
