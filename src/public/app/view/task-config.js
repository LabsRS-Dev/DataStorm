def([
    'common',
    '{!T}app/view/task-config.html',
    'native',
    'store'
],function(_, tpl_func, ntv, store){

    var defaultOptions = {
        //转换成CSV 部分
        it2csv_useComplexJSONEngine: true,  /// 是否使用复杂JSON的处理方式
        it2csv_sortFields: "",              /// 尝试排序字段
        it2csv_separator: ",",              /// 分隔符

        
    };

    function getOptions(curOptions){
        return jet.extend(true,{}, defaultOptions, curOptions);
    }

    var vm =  new Vue({
        el:$(tpl_func({}))[0]
        ,data:{
            callback: null,
            curTask: null,
            options: null,
        }
        ,methods:{
            show:function(task, cb){
                this.curTask = task;
                this.options = getOptions(task.config || {});
                this.callback = cb || function(){};
                $(this.$el).show();
            },
            hide:function(e){
                e && e.preventDefault();
                $(this.$el).hide();
            },
            save:function(){
                this.hide();

                var checkOptions = this.options || defaultOptions;
                if(checkOptions.it2csv_separator === "") checkOptions.it2csv_separator = ",";
                this.curTask.config = checkOptions;


                this.callback && this.callback(this.curTask);
            },
            goHelp:function(tag){
                console.log(tag);
                var serverConfig = store.get('serverConfig') || {};
                var onlineHelpUrl = typeof serverConfig.onlineHelpURL !== "undefined" ? serverConfig.onlineHelpURL : "http://romanysoft.github.io/DataStorm/documents.html";
                var url = onlineHelpUrl + "#" + encodeURI(tag) + "?" + Date.now();
                ntv.openUrl(url);
            }

        }
        ,compiled: function(){
            var $el = $(this.$el).appendTo(document.body);
        }

    });

    window.taskConfig = vm;
    return vm;
});
