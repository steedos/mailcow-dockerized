# mailcow: dockerized - 🐮 + 🐋 = 💕

## Want to support mailcow?

Please [consider a support contract with Servercow](https://www.servercow.de/mailcow?lang=en#support) to support further development. _We_ support _you_ while _you_ support _us_. :)

You can also [get a SAL](https://www.servercow.de/mailcow?lang=en#sal) which is a one-time payment with no liabilities or returning fees.

Or just spread the word: moo.

## Info, documentation and support

Please see [the official documentation](https://mailcow.github.io/mailcow-dockerized-docs/) for installation and support instructions. 🐄

🐛 **If you found a critical security issue, please mail us to [info at servercow.de](mailto:info@servercow.de).**

## Cowmunity

[mailcow community](https://community.mailcow.email)

[Telegram mailcow channel](https://telegram.me/mailcow)

[Telegram mailcow Off-Topic channel](https://t.me/mailcowOfftopic)

Telegram desktop clients are available for [multiple platforms](https://desktop.telegram.org). You can search the groups history for keywords.

## Misc

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
docker-compose up -d
```


### 5. 配置creator_url
打开服务器项目根路径下的mailcow.conf,在最后一行添加CREATOR_URL=http://127.0.0.1:5000 (设置当前creator服务的root_url)

修改后重启服务
```
docker-compose up -d
```