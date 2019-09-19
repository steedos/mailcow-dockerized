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

// TODO: pass token to steedos api to get user email
$username = "steedos_user_email_from_token";

$_SESSION[$session_var_user_allowed][] = $username;

header("Location: /SOGo/so/${username}");