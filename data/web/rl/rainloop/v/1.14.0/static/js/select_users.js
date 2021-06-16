//设置语言为简体中文
// CKEDITOR.lang.detect('zh-cn');

//组织选人服务地址
var selectUsersService = "https://qhd-beta.steedos.com/contact";
// console.log("window.jQuery.migrateVersion----:",window.jQuery.migrateVersion);
// $.getScript("./rainloop/v/1.14.0/static/js/jqModal.js", function () {
//     console.log("rainloop_mailEditor jqm")
// });

//打开组织选人
// function openSelectUsers(tag_element, field) {
//     console.log("openSelectUsers------");

//     if(!$("#mail-for-sign").length){
//         $("<iframe src='/contract/' id='mail-for-sign' class='hide'/>").appendTo("body");
//     }
//     alert($("#mail-for-sign").length)
//     // var str = JSON.stringify(window);
//     setTimeout(function(){
//         window.open(selectUsersService + "/selector/?rooturl=" + selectUsersService + "&tag_element="+tag_element+"&field="+field, "", "width=900px,height=600px")
//     },3000)
// }

//添加message消息监听，接收组织选人控件返回的数据，并显示在对应的页面
function addMessageListener() {
    console.log("addBodyListeneraddBodyListener");
    window.addEventListener('message', function (e) {
        var data = e.data;
        var type = ".e-row";
        if (data && data.tag_element && data.field) {
            var field = data.field;
            
            if(_.isArray(data.field)){
                field = _.last(data.field);
            }
            type = "." + field + "-row";
            if (data.selection) {
                if (field == "to") {
                    data.selection.forEach(function (item) {
                        $("#rainloop_mailEditor").closest(".e-row").find(".e-value .inputosaurus-input .ui-autocomplete-input").val(item.email).blur();
                    })
                } else {
                    data.selection.forEach(function (item) {
                        $(type).find(".e-value .inputosaurus-input .ui-autocomplete-input").val(item.email).blur();
                    })
                }
            }
        }
        // 确认后关闭窗口
        $('.jqmClose').click();
    }, false);
};

//给收件人添加样式，让其看起来像A链接
function addStyles() {
    var style = document.createElement("style");
    var str = "#rainloop_mailEditor {color:#336699;text-decoration:underline; padding-bottom:3px;box-shadow:none;cursor:pointer}";
    style.type = "text/css";
    if (style.styleSheet) {
        style.styleSheet.cssText = str;
    } else {
        style.innerHTML = str;
    }
    document.getElementsByTagName("head")[0].appendChild(style);
};

//给body添加click监听，如果点击的是to,cc,bcc的label，就会弹出组织选人界面
function addBodyListener() {
    document.body.addEventListener("click", function (event) {
        console.log("addEventListener: ");
        if ($(event.target).attr("class") === 'i18n') {
            var mdChips = angular.element(event.target);
            var datai18n = mdChips.attr("data-i18n");
            var inputId = angular.element(event.target.parentNode.parentNode.nextElementSibling).find("input").attr("class");
            var field = "";
            if (datai18n === 'COMPOSE/TITLE_TO') {
                field = 'to';
            } else if (datai18n === 'COMPOSE/TITLE_CC') {
                field = 'cc';
            } else if (datai18n === 'COMPOSE/TITLE_BCC') {
                field = 'bcc';
            } else if (datai18n === 'COMPOSE/TITLE_REPLY_TO') {
                field = 'reply';
            }
            console.log("field: ",field);
            if (inputId && field) {
                console.log("1111");
                openSelectUsers(inputId, field)
            }
        }
    });
}

function getInputidAndField(event) {
    var serviceUrl = selectUsersService;
    if (event){
        if ($(event.target).attr("class") === 'i18n jqModal') {
            var mdChips = angular.element(event.target);
            var datai18n = mdChips.attr("data-i18n");
            var inputId = angular.element(event.target.parentNode.parentNode.nextElementSibling).find("input").attr("class");
            var field = "";
            if (datai18n === 'COMPOSE/TITLE_TO') {
                field = 'to';
            } else if (datai18n === 'COMPOSE/TITLE_CC') {
                field = 'cc';
            } else if (datai18n === 'COMPOSE/TITLE_BCC') {
                field = 'bcc';
            } else if (datai18n === 'COMPOSE/TITLE_REPLY_TO') {
                field = 'reply';
            }
            if (inputId && field) {
                serviceUrl = serviceUrl + "/selector/?rooturl=" + serviceUrl + "&tag_element="+inputId+"&field="+field, "", "width=100%,height=100%"
                return serviceUrl;
            }
        }
    }
}

function addJqModal() {
    $.getScript("./rainloop/v/1.14.0/static/js/jqModal.js", function () {
        console.log("rainloop_mailEditor jqm")
    });
}

// 添加jqModal
function addJqm() {
    $().ready(function () {
        if($().jqm){
            $('#rainloop_mailEditor_1').jqm();
        }
    });
}

if (selectUsersService) {
    addMessageListener();
    addStyles();
    // addBodyListener();
    getInputidAndField(event);
    addJqModal();
    addJqm();
}

//处理在当前窗口删除邮件报错问题
try {
    window.opener.location.href;
} catch (error) {
    window.opener = null;
}
