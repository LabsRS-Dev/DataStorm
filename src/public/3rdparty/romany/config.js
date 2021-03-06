jet.config({
    'pkgs':{
		'$':{
			ver:'1.11.1'
			,url:'3rdparty/jquery/jquery.js'
			,factory:'$'
		}
        ,'util':{
            ver:'14.12.06'
            ,url:'3rdparty/romany/util.js'
            ,deps:['$']
        }
        ,'bs':{
            ver:'14.12.08'
            ,url:'3rdparty/romany/bs.js'
            ,deps:['$']
        }
        ,'nprogress':{
			ver:'0.1.6'
			,url:'3rdparty/nprogress/nprogress.js'
			,factory:'NProgress'
        }
        ,'vue':{
            ver:'0.11.0'
            ,url:'3rdparty/vue/vue.js'
        	,factory:'Vue'
        }
        ,'kendo':{
			ver:'2014.2.716'
			,url:'3rdparty/kendo/js/kendo.all.min.js'
			,factory:'kendo'
            ,deps:['$']
        }
        ,'bootstrap':{
            ver:'3.2.0'
            ,url:'3rdparty/bootstrap/js/bootstrap.js'
            ,deps:['$']
        }
        ,'jquery.splitter':{
            ver:'0.14.0'
            ,url:'3rdparty/jquery.splitter/js/jquery.splitter-0.14.0.js'
            ,factory:'$'
            ,deps:['$']
        }
        ,'alertify':{
            ver:'0.3.10'
            ,url:'3rdparty/alertify/alertify.js'
            ,factory:'alertify'
        }
        ,'engine.io':{
            ver:'?'
            ,url:'3rdparty/engine.io/engine.io.js'
        }
        ,'socket.io':{
            ver:'1.2.1'
           ,url:'3rdparty/socket.io/socket.io.js'
        }
        //romany
        ,'store':{
            ver:'14.11.10'
            ,url:'3rdparty/romany/store.js'
        }
        ,'lang':{
            ver:'14.11.10'
            ,url:'3rdparty/romany/lang.js'
        }
        ,'native':{
            ver:'14.12.09'
            ,url:'3rdparty/romany/native.js'
        }
        ,'common':{
            ver:'15.02.10'
            ,url:'3rdparty/romany/common.js'
        }
        ,'xregexp':{
            ver:'0.2.5'
            ,url:'3rdparty/xregexp/xregexp.js'
            ,factory:'XRegExp'
        },
        'angular':{
            ver:'1.3.10'
            ,url:'3rdparty/angular/angular.js'
            ,factory:'angular'
        },
        'bootstrap-tagsinput':{
            ver:''
            ,url:'3rdparty/bootstrap-tagsinput/bootstrap-tagsinput.js'
            ,factory:'$'
            ,deps:['$']
        }
    }
});