// Custom SOGo JS

// Change the visible font-size in the editor, this does not change the font of a html message by default
// CKEDITOR.addCss("body {font-size: 16px !important}");

// Enable scayt by default
//CKEDITOR.config.scayt_autoStartup = true;

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
