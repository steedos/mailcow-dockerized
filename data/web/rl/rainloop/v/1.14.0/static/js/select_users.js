//设置语言为简体中文
// CKEDITOR.lang.detect('zh-cn');

//组织选人服务地址
var selectUsersService = "http://192.168.0.62";

//打开组织选人
function openSelectUsers(tag_element, field){
    window.open(selectUsersService + "/select-users?tag_element="+tag_element+"&field="+field, "", "width=900px,height=600px")
}

//添加message消息监听，接收组织选人控件返回的数据，并显示在对应的页面
function addMessageListener(){
    console.log("addBodyListeneraddBodyListener");
    window.addEventListener('message',function(e){
        var data = e.data;
        var type = ".e-row";
        if(data && data.tag_element && data.field){
            type = "." + data.field + "-row";
            if(data.selection){
                if (data.field == "to"){
                    data.selection.forEach(function(item){
                        $("#rainloop_mailEditor").closest(".e-row").find(".e-value .inputosaurus-input .ui-autocomplete-input").val(item.email).blur();
                    })
                }else{
                    data.selection.forEach(function(item){
                        $(type).find(".e-value .inputosaurus-input .ui-autocomplete-input").val(item.email).blur();
                    })
                }
            }
        }
    },false);
};

//给收件人添加样式，让其看起来像A链接
function addStyles(){
    var style = document.createElement("style");
    var str = "#rainloop_mailEditor {color:#336699;text-decoration:underline; padding-bottom:3px;box-shadow:none;cursor:pointer}";
    style.type="text/css"; 
    if(style.styleSheet){
        style.styleSheet.cssText = str;  
    } else {  
        style.innerHTML = str; 
    }  
    document.getElementsByTagName("head")[0].appendChild(style);  
};

//给body添加click监听，如果点击的是to,cc,bcc的label，就会弹出组织选人界面
function addBodyListener(){
    document.body.addEventListener("click", function(event){
        if(event.toElement.className === 'i18n'){
            var mdChips = angular.element(event.toElement);
            var datai18n = mdChips.attr("data-i18n");
            var inputId = angular.element(event.toElement.parentNode.parentNode.nextElementSibling).find("input").attr("class");
            var field = "";
            if(datai18n === 'COMPOSE/TITLE_TO'){
                field = 'to';
            }else if(datai18n === 'COMPOSE/TITLE_CC'){
                field = 'cc';
            }else if(datai18n === 'COMPOSE/TITLE_BCC'){
                field = 'bcc';
            }else if(datai18n === 'COMPOSE/TITLE_REPLY_TO'){
                field = 'reply';
            }
            if(inputId && field){
                openSelectUsers(inputId, field)
            }
        }
    });
}

if(selectUsersService){
    addMessageListener();
    addStyles();
    addBodyListener();
}

//处理在当前窗口删除邮件报错问题
try {
    window.opener.location.href;
} catch (error) {
    window.opener = null;
}