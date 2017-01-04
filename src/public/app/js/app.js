(function(){
    //preload css
    jet([
        '3rdparty/nprogress/nprogress.css',
        
        '3rdparty/alertify/themes/alertify.core.css',
        '3rdparty/alertify/themes/alertify.default.css',
        
        '3rdparty/font-awesome/css/font-awesome.css',
        '3rdparty/bootstrap/css/bootstrap.css',
        
        'app/css/normalize.css',
        'app/css/global.css',
        'app/css/main.css',
    ]);
    // progress
    jet(['nprogress'], function(NProgress){
        var prev = jet.onHandle('jet.loading', function(percent, current, totle){
            if (totle) {
                NProgress.start();
            } else if (percent == 100) {
                NProgress.done();
            } else {
                NProgress.set(percent/100); 
            }
            prev(percent, current, totle);
        });
        //jet(['js/app'], function(){})
    });
    // common library
    def('common',[
        'vue',
        'store',
        '$',
        'alertify',
        'bs',
        'util',
        'native',
        'bootstrap'
    ],function(Vue, store, $, alertify, ntv){
        
        alertify.set({ delay: 5000 });
        
        var curLang = store.getString('lang') || 'en';
        
        Vue.filter('tr', function(str, module){
            return module ? jet.tr(module, str) : jet.tr(str);
        });
        
        Vue.filter('trAbbr', function(str){
            if (str == 'auto') {
                return jet.tr('auto', curLang);
            } else if (str != '') {
                return jet.tr('lang', str);
            } else {
                return jet.tr('content', 'target_lang');
            }
        });
        
        $(function(){
            document.title = jet.config('app.name');
            
            function saveConfig(data) {
                jet.config({
                    'serverConfig':data
                });
                store.set('serverConfig', data);
            }
            
            window.BS.b$.checkUpdate(null, jet.tr('text.checkUpdate_foundNewVersion'), function(data){saveConfig && saveConfig(data)},function (data) {});
        });
    });
    
    // config
    var app  = {
        'bundle':'romany.dc',
        'name':'DataStorm',
    };

    jet.config({
        'app':app,
        'lang': localStorage[app.bundle+'.lang'] || 'en'
    });
    
    // startup
    jet.bootstrap({
        routers:{
            "/"                 : "app/view/index"
        },
        nav:{
            event:'none'
        }
    });
    
})();
