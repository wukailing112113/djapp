var page=1
var pagesize=10;
var front="["//拼接json字符串头部
var back="]"//拼接json字符串尾部
var json=""//json字符串内容
//刷新页面
function exec(){
	location.reload();
}

//页面初始化加载执行方法
apiready = function(){
	get_article_data();//加载数据
}

//加载数据列表
function get_article_data(){
	json="";
	showProgress();//加载提示信息
	var url = localStorage.url+"Api/Cms/get_article_data";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"cat_pid":-1,
	            "staff_no":localStorage.user_id,
	            "pagesize":pagesize,
	            "page":page
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			//加载文件夹列表
    			if(ret.cat_list!=null){
	    			for(var i=0;i<ret.cat_list.length;i++){
	    				json+="{type:1,uid:'"+ret.cat_list[i].cat_id+"',imgPath: 'widget://statics/public/images/res/folder.png',title: '"+ret.cat_list[i].cat_name+"',rightBtns:[{bgColor: '#388e8e',width: 70, title: '重命名'},{bgColor: '#218B04',width: 70, title: '分享'},{bgColor: '#D40222',width: 70, title: '删除'}]},";
					}
				}
				page++
				openUIListView();
			}
			else{
				alert(ret.msg,"提示");
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

function openUIListView(){
	var UIListView = api.require('UIListView');
	json=json.substring(0,json.length-1);
	var list=front+json+back;
	var json_text = eval('('+list+')'); 
	UIListView.open({
	    rect: {
	        x: 0,
	        y: 0,
	        w: api.winWidth,
	        h: api.frameHeight
	    },
	    data:json_text,
	    styles: {
	        borderColor: '#CCCCCC',
	        item: {
	            bgColor: '#ffffff',
	            height: 55.0,
	            imgWidth: 40,
	            imgHeight: 40,
	            imgCorner: 4,
	            placeholderImg: '',
	            titleSize: 14.0,
	            titleColor: '#000',
	            subTitleSize: 14.0,
	            subTitleColor: '#000', 
	            remarkColor: '#000',
	            remarkSize: 14,
	            remarkIconWidth: 30
	        }
	    },
	    fixedOn: api.frameName
	}, function(ret, err){
		if( ret ){
			 //点击事件测试
			 if(ret.eventType=="clickContent"){
				 var UIListView = api.require('UIListView');//通过它获取id
				 UIListView.getDataByIndex({
				    index:ret.index
				 }, function(ret, err){
				    if( ret ){
					 	openNewWin('media_infoHeader',ret.data.uid);
				    }
				 });
			 }
			 //滑动事件
			 if(ret.eventType=="clickRightBtn"){
			 	 var index=ret.btnIndex;
			 	 var UIListView = api.require('UIListView');//通过它获取id
				 UIListView.getDataByIndex({
				    index:ret.index
				 }, function(ret, err){
				    if( ret ){
			    		//执行文件夹处理
				 		if(index==0){
				 			//文件夹重命名
				 			set_filename(1,ret.data.uid);
				 		}
				 		else if(index==1){
				 			//文件夹分享
//					 			share(id);
							open_knowledge_share(ret.data.uid)
				 		}
				 		else{
				 			//文件夹删除
				 			del_filename(0,ret.data.uid)
				 		}
				    }
				 });
				 
			 	
			 }
	    }else{
	    }
	});
}

//新建文件夹
function save_article_cat_info(){
    $aui.alert({
        title:'新建文件夹',
        content:'<input id="folder" type="text" class="aui-input" placeholder="请填写文件夹名称" onkeyup="localStorage.conten=$(this).val()"/>',
        buttons:['确定','关闭'],
    },function(ret){
        //处理回调函数
        if(ret){
           if(ret==0){
           		showProgress();//加载等待
				var url = localStorage.url+"Api/Cms/save_article_cat_info";
				api.ajax({
				    url:url,
				    method: 'post',
				    timeout: 100,
				    data: {//传输参数
				    	values: { 
				    		staff_no:localStorage.user_id,
				            cat_pid:-1,
				           	cat_name:localStorage.conten
				        }
				    }
			    },function(ret,err){
			    	if(ret){
			    		if(ret.status==1){
			    			$aui.alert({title:'提示',content:'添加成功',buttons:['确定']},function(ret){exec()});
						}
						else{
							alert(ret.msg,"提示");
						}
						api.hideProgress();//隐藏进度提示框
			    	}else{
			    		api.hideProgress();//隐藏进度提示框
			    		/**无网络提示 */
				    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
			    	}
			    });	
            }
        }
    })
}
//打开新页面
function openNewWin(winName,id){
	//打开新页面
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	"id":id
	    }
    });
}

//删除方法
function del_filename(type,id){
	showProgress();//加载等待
	var url = localStorage.url+"Api/Cms/del_article_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            id:id,
	           	type:type
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$aui.alert(
    				{
    					title:'提示',
    					content:'删除成功',
    					buttons:['确定']
    				},
    				function(ret){
    					exec()
    				});
			}
			else{
				$aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//重命名方法
function set_filename(type,id){
	 $aui.alert({
        title:'文件夹名称',
        content:'<input id="folder" type="text" class="aui-input" placeholder="请填写文件夹名称" onkeyup="localStorage.conten=$(this).val()"/>',
        buttons:['确定','关闭'],
    },function(ret){
        //处理回调函数
        if(ret){
           if(ret==0){
           		showProgress();//加载等待
				var url = localStorage.url+"Api/Cms/set_filename";
				api.ajax({
				    url:url,
				    method: 'post',
				    timeout: 100,
				    data: {//传输参数
				    	values: { 
				            "file_id":id,
				           	"file_type":type,
				           	"file_name":localStorage.conten
				        }
				    }
			    },function(ret,err){
			    	if(ret){
			    		if(ret.status==1){
			    			exec();
						}
						else{
							alert(ret.msg,"提示");
						}
						api.hideProgress();//隐藏进度提示框
			    	}else{
			    		api.hideProgress();//隐藏进度提示框
			    		/**无网络提示 */
				    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
			    	}
			    });
            }
        }
    })
}
//fram页面方法
function open_knowledge_share(id){
	api.openFrame({
	    name: 'knowledge_share',
	    url: './knowledge_share.html',
	    pageParam: {
	        id: id
	    },
	    bgColor:"rgba(0,0,0,0.6)",
	});
}