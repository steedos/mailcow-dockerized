// Custom SOGo JS

// Change the visible font-size in the editor, this does not change the font of a html message by default
// CKEDITOR.addCss("body {font-size: 16px !important}");

// Enable scayt by default
//CKEDITOR.config.scayt_autoStartup = true;

//组织选人服务地址
var selectUsersService = "";

//打开组织选人
function openSelectUsers(tag_element, field){
    window.open(selectUsersService + "/select-users?tag_element="+tag_element+"&field="+field, "", "width=900px,height=600px")
}

//添加message消息监听，接收组织选人控件返回的数据，并显示在对应的页面
function addMessageListener(){
    window.addEventListener('message',function(e){
        var data = e.data;
        if(data && data.tag_element && data.field){
            var input = angular.element(document.getElementById(data.tag_element));
            if(data.selection){
                data.selection.forEach(function(item){
                    input.controller().addRecipient(item.name + "   <" + item.email + ">;", data.field);
                })
            }
            input.controller().contactFilter();
        }
    },false);
};

//给收件人添加样式，让其看起来像A链接
function addStyles(){
    var style = document.createElement("style");
    var str = "#dialogContent_mailEditor .pseudo-input-label{color:rgb(0,0,238);text-decoration:none;border-bottom:1px solid rgb(0,0,238);display: inline-block; padding-bottom:3px;box-shadow:none;cursor:pointer}";  
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
        if(event.toElement.className === 'pseudo-input-label'){
            var mdChips = angular.element(event.toElement.nextElementSibling);
            var ngModel = mdChips.attr("ng-model");
            var inputId = mdChips.find("input").attr("id");
            var field = "";
            if(ngModel === 'editor.message.editable.to'){
                field = 'to';
            }else if(ngModel === 'editor.message.editable.cc'){
                field = 'cc';
            }else if(ngModel === 'editor.message.editable.bcc'){
                field = 'bcc';
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
