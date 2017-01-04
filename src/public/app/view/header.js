def([
    'common',
    '{!T}app/view/header.html',
    '{!T}app/view/tool.html',
    'lang',
    'store'
    ], function(_, theader, ttool, lang, store){
    var curLang = store.getString('lang') || 'en';
    var $header = $(theader({
            curLang:curLang,
            local:lang.local,
            lang:lang.lang
        })).appendTo($('.header-container'));
    var $tool = $(ttool({

        })).appendTo($('.tool-container'));
    $('#sel_local').change(function (){
        store.setString('lang', $(this).val());
        location.reload();
    });
    $('#btn_faq').hide();
});
