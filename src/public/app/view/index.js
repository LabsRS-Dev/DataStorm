/* jshint undef:true, unused:false, eqnull:true, forin:false, freeze:true, -W004,
bitwise:true, noarg:true, sub:true, node:true,esnext:true, funcscope:true,
notypeof:true
*/
def([
    'common',
    '{!T}app/view/index.html',
    'native',
    'store',
    'app/view/setting',
    'app/view/task-config',
    'app/view/header'
], function(com, tindex, ntv, store, svm, taskConfig){
    var ivm;
    var view = tiny.view({
        'classes':'view-index'
        ,render:function(r, done){
            ivm = window.ivm = new Vue({
                el:$(tindex({}))[0],
                data:{
                    taskList : [],
                    activeCount : 0
                },
                methods:{
                    remove:function(idx){
                        this.taskList.splice(idx, 1);
                    },
                    config:function(idx){
                        var task = this.taskList[idx];
                        taskConfig.show(task, function(modifyTask){
                            task = modifyTask;
                        });
                    },
                    revealInFinder:function(path){
                        ntv.revealInFinder(path, function(filePath){
                            console.log('location:%s', filePath);
                        });
                    }
                },
                compiled: function(){
                    var $el = $(this.$el).appendTo(view.el());
                    var len = this.taskList.length;
                    this.$watch('activeCount', function(newVal){
                        if (newVal) {
                            NProgress.isStarted() || NProgress.start();
                        } else if (newVal == 0) {
                            NProgress.done();
                        } else {
                            NProgress.set((len - newVal) / len);
                        }
                    });
                }
            });
            done();
        }
    });

    function getUrlExt(val, _url){
        return (_url = String(val || '')
                .replace(/(\?.*)|(#.*)/,'')
                .match(/\.([a-zA-z0-9]+)$/i)
            ) ? _url[1] :'';
    }

    $(document)
        .on('click', '[tag-action="add"]', function(){
            ntv.importFile(ImportHandle.callback, {
                types:Object.keys(supportExts)
            }, function(cb){
                [
                    // 'csv2json.csv',
                    // 'json2csv.json',
                    // 'json2csvWithHeader.json',
                    // 'json2yml.json',
                    // 'repository.xml',
                    // 'simple.xml',
                    // 'sublime-p.plist',
                    // 'sublime.json',
                    // 'theme-p.plist',
                    // 'theme.xml',
                    // 'yml2json.yml',
                    // 'template.properties',
                    'result4.json',
                    'result4test.json',
                    'statistics.application.usages.json',
                    'statistics.application.usages.xml'
                    ].forEach(function(it){
                    cb(null, {
                        filePath:'D:/TestResource/DataStorm/'+it,
                        fileName:it,
                        extension:getUrlExt(it)
                    });
                });
            });
        })
        .on('click', '[tag-action="clear"]', function(){
            ivm.taskList=[];
        })
        .on('click', '[tag-action-convert]', function(){
            var encoder = $(this).attr('tag-action-convert');
            var options = svm.options;
            if (!options.dist || (ntv.isNative() && false === ntv.isDirCanWriteable(options.dist))){
               console.log('Dir can not writeable..');
               svm.show();
               return;
            }

            if (ivm.taskList.length) {
                jet.each(ivm.taskList, function(_, it){
                    ivm.activeCount++;
                    $.ajax({
                        url: ntv.serverUrl('convert'),
                        timeout:options.process_timeout, // 3 minues
                        dataType:'JSON',
                        type:"POST",
                        data:{
                            encoder:encoder,
                            decoder:it.decoder,
                            srcFile:it.filePath,
                            config: JSON.stringify(it.config),
                            distDir: options.dist,
                            override:options.override_if_exists
                        }
                    }).done(function(recv){
                        if (recv.error) {
                            it.status = 'error';
                            it.errMsg = jet.tr(recv.msg || recv.error.msg);
                        } else {
                            it.status = 'complete';
                            it.errMsg = "";
                        }
                        var data = recv.data || {};
                        it.distFile = data.distFile || '';
                        ivm.activeCount--;
                    }).fail(function(jqXHR, textStatus, errorThrown){
                        it.status = 'error';
                        it.distFile = '';
                        it.errMsg = (textStatus === "timeout") ?
                        "Processing time is long enough, may not be able to process, please contact customer service."
                        : jet.tr('error.connect_error');


                        ivm.activeCount--;
                        if (ivm.activeCount === 0) {
                            textStatus !== "timeout" && alertify.log(jet.tr('error.connect_restart'));
                        }
                    });
                });
            }
        });

    var supportExts = {
        json  :'c1',
        xml   :'c2',
        plist :'c3',
        csv   :'c4',
        yml   :'c5',
        properties   :'c2',
        ini   :'c2',
    };

    Vue.filter('ext_class', function(ext){
        return supportExts[ext];
    });

    var ImportHandle = {
        callback:function(err, it){
            if (err) {
                alertify.log(err.message);
            } else {
                it.decoder = it.icon_name = it.extension = it.extension.toLowerCase();
                if (it.icon_name === 'properties'){
                    it.icon_name = 'prop';
                }
                it.status = 'waitting';
                it.distFile = '';
                it.config = {};
                if (it.extension in supportExts) {
                    ivm.taskList.push(it);
                }
            }
        }
    };

    ntv.init({
        dragdrop:ImportHandle
    });
    return view;
});
