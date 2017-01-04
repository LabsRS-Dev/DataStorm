def([
    'common',
    '{!T}app/view/setting.html',
    'store',
    'native'
],function(_, tpl_func, store, ntv){

    var defaultOptions = {
        indent:4,
        dist:'',
        override_if_exists: true,
        process_timeout: 300000,  // 5 * 60 * 1000
        //same_as_source:true,
    };

    function getOptions(){
        return jet.extend(true,{}, defaultOptions, store.get('options'));
    }

    var vm =  new Vue({
        el:$(tpl_func({}))[0]
        ,data:{
            options:getOptions(),
            recents:store.get('recents') || [],
        }
        ,methods:{
            show:function(){
                $(this.$el).show();
            },
            hide:function(e){
                e && e.preventDefault();
                this.$set('options', getOptions());
                $(this.$el).hide();
            },
            save:function(){
                store.set('options', this.options);
                this.hide();
            },
            selectRecent:function(path){
                this.options.dist = path;
                this.options.same_as_source = false;
            },
            selectFolder:function(){
                ntv.selectDir($.proxy(this.addDist, this),{},function(cb){
                    cb(null, 'D:/TestResource/DataStorm/output');
                });
            },
            addDist:function(err, path){
                if (err) {
                    alertify.log(err.message);
                    return ;
                }
                this.options.same_as_source = false;
                var name = path;
                if (path.length) {
                    if (path.match(/(\\|\/)$/)){
                        path = path.substr(0, path.length-1);
                    }
                    var pos = path.lastIndexOf('/');
                    (pos === -1 )&& (pos = path.lastIndexOf('\\'));
                    if (pos !== -1){
                        name = path.substr(++pos) || path;
                    }
                }
                this.options.dist = path;
                var inRecent = false;
                $.each(this.recents, function(_, it){
                    if (it.path === path){
                        inRecent = true;
                        return false;
                    }
                });
                inRecent || this.recents.unshift({path:path, name:name});
                if (this.recents.length > 10) {
                    this.recents.splice(10);
                }
            }
        }
        ,compiled: function(){
            var $el = $(this.$el).appendTo(document.body);
            this.$watch('recents', function(val){
                store.set('recents', val);
            });
            $('[data-toggle="dropdown"]', $el).dropdown();
        }
    });

    $(document)
        .on('click', '[tag-action="setting"]', function(){
            vm.show();
        });

    window.svm = vm;
    return vm;
});
