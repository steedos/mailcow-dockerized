<?php

$ALLOW_ADMIN_EMAIL_LOGIN = (preg_match(
  "/^([yY][eE][sS]|[yY])+$/",
  $_ENV["ALLOW_ADMIN_EMAIL_LOGIN"]
));

$session_var_user_allowed = 'sogo-sso-user-allowed';
$session_var_pass = 'sogo-sso-pass';

// prevent if feature is disabled
if (!$ALLOW_ADMIN_EMAIL_LOGIN) {
  header('HTTP/1.0 403 Forbidden');
  echo "this feature is disabled";
  exit;
}

session_start();

$session_var_user_allowed = 'sogo-sso-user-allowed';
$session_var_pass = 'sogo-sso-pass';

$password = file_get_contents("/etc/sogo-sso/sogo-sso.pass");
$_SESSION[$session_var_pass] = $password;

$token = $_GET['token'];

// pass token to steedos api to get user email
// 配置creator服务地址
$creator_url = $_ENV["CREATOR_URL"];
$durl = "${creator_url}/accounts/user";

$headers = array("Authorization:".$token);
//初始化
$curl = curl_init();
//设置抓取的url
curl_setopt($curl, CURLOPT_URL, $durl);
//设置头文件的信息作为数据流输出
curl_setopt($curl, CURLOPT_HEADER, 0);
//设置获取的信息以文件流的形式返回，而不是直接输出。
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
//执行命令
$json = curl_exec($curl);
//关闭URL请求
curl_close($curl);

$data = json_decode($json,true);

$username = $data['email'];

$_SESSION[$session_var_user_allowed][] = $username;

header("Location: /SOGo/so/${username}");