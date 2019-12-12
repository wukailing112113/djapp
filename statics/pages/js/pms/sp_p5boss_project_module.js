apiready = function(){
    //加载数据
    module_add();
}
//打开新页面
function openWin(winName,module_no,cust_no,ev){
	var ev=ev||event;
	api.openWin({
	    name: 'winName',
	    url: 'header/'+winName+'.html',
		    pageParam:{
		    	"module_no":module_no,//模块id
		    	"cust_no":api.pageParam.cust_no
		    }
	});
	ev.stopPropagation();
}
//加载数据
function module_add(){
	showProgress();//加载等待
	var url = localStorage.url+"Api/Pms/get_project_module_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	           project_no:api.pageParam.project_no,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			for(var i=0;i<ret.module_list.length;i++){//一级模块
    				if(!ret.module_list[i].children.length){//没有子模块
    					$('#list').append(
    					'<li class="aui-list-view-cell">'+
				        	'<div>'+
						        '<span class="ml-15 pt-5 pb-5 di-ib aui-text-info di-ib aui-ellipsis-1 w-40b po-re top-2"><img src="../../statics/pages/images/module.png" class="po-re mr-5 h-21 top-3">'+ret.module_list[i].module_name+'</span>'+
					         	'<span class="aui-btn bg-w co-34 aui-pull-right mr-45 mt-9 border-radius-5 di-ib aui-ellipsis-1" onclick="openWin(\'project_module_infoHeader\','+ret.module_list[i].module_no+')">More</span>'+
						        '<span class="ml-10 fsize-14 color-999 di-ib aui-ellipsis-1 mt-9 po-re pb-2b aui-pull-right di-ib lh-26"><span>'+ret.module_list[i].staff_name+'</span></span>'+
						    '</div>'+
				        '</li>'
    					)
    				}else{//有子模块
    					$('#list').append(
    					'<li class="aui-list-view-cell" id="'+ret.module_list[i].module_no+'" onclick="spired(this)">'+
				        	'<div>'+
						        '<span class="color-w color-cc aui-iconfont aui-pull-right aui-icon-unfold mt-10 mr-15"></span>'+
						        '<span class="ml-15 pt-5 pb-5 di-ib aui-text-info di-ib aui-ellipsis-1 w-40b po-re top-2"><img src="../../statics/pages/images/module.png" class="po-re mr-5 h-21 top-3">'+ret.module_list[i].module_name+'</span>'+
						        '<span class="aui-btn bg-w co-34 aui-pull-right mr-15 mt-9 border-radius-5 di-ib aui-ellipsis-1" onclick="openWin(\'project_module_infoHeader\','+ret.module_list[i].module_no+')">More</span>'+
					            '<span class="ml-10 fsize-14 color-999 di-ib aui-ellipsis-1 mt-9 po-re pb-2b aui-pull-right di-ib lh-26"><span>'+ret.module_list[i].staff_name+'</span></span>'+
					        '</div>'+
				        '</li>'
    					)
    					for(var j=0;j<ret.module_list[i].children.length;j++){//二级模块
    						if(!ret.module_list[i].children[j].children.length){//没有子模块
	    						$("#"+ret.module_list[i].children[j].module_pid).append(
	    						'<ul '+(j>0?'class="aui-list-view di-n bor-pn"':'class="aui-list-view di-n"')+'>'+
		    						'<li class="aui-list-view-cell">'+
							        	'<div>'+
									        '<span class="ml-30 pt-5 pb-5 di-ib aui-text-info di-ib aui-ellipsis-1 w-40b po-re top-2"><img src="../../statics/pages/images/module.png" class="po-re mr-5 h-21 top-3">'+ret.module_list[i].children[j].module_name+'</span>'+
								         	'<span class="aui-btn bg-w co-34  ml-15 aui-pull-right mr-45 mt-9 border-radius-5" onclick="openWin(\'project_module_infoHeader\','+ret.module_list[i].children[j].module_no+')">More</span>'+
									        '<span class="ml-10 fsize-14 color-999 di-ib aui-ellipsis-1 mt-9 po-re pb-2b aui-pull-right di-ib lh-26"><span>'+ret.module_list[i].children[j].staff_name+'</span></span>'+
									    '</div>'+
							        '</li>'+
						        '</ul>'
	    						)	
	    					}else{//有子模块
	    						$("#"+ret.module_list[i].children[j].module_pid).append(
	    						'<ul '+(j>0?'class="aui-list-view di-n bor-pn"':'class="aui-list-view di-n"')+'>'+
			    					'<li class="aui-list-view-cell" id="'+ret.module_list[i].children[j].module_no+'" onclick="spired(this)">'+
							        	'<div>'+
									        '<span class="color-w color-cc aui-iconfont aui-pull-right aui-icon-unfold mt-10 mr-15"></span>'+
									        '<span class="ml-30 pt-5 pb-5 di-ib aui-text-info di-ib aui-ellipsis-1 w-40b po-re top-2"><img src="../../statics/pages/images/module.png" class="po-re mr-5 h-21 top-3">'+ret.module_list[i].children[j].module_name+'</span>'+
									        '<span class="aui-btn bg-w co-34 aui-pull-right mr-15 mt-9 border-radius-5 di-ib aui-ellipsis-1" onclick="openWin(\'project_module_infoHeader\','+ret.module_list[i].children[j].module_no+')">More</span>'+
								            '<span class="ml-10 fsize-14 color-999 di-ib aui-ellipsis-1 mt-9 po-re pb-2b aui-pull-right di-ib lh-26"><span>'+ret.module_list[i].children[j].staff_name+'</span></span>'+
								        '</div>'+
							        '</li>'+
						        '</ul>'
		    					)
		    					for(var z=0;z<ret.module_list[i].children[j].children.length;z++){//三级模块
		    						$("#"+ret.module_list[i].children[j].module_no).append(
		    						'<ul '+(z>0?'class="aui-list-view di-n bor-pn"':'class="aui-list-view di-n"')+'>'+
			    						'<li class="aui-list-view-cell">'+
								        	'<div>'+
										        '<span class="ml-45 pt-5 pb-5 di-ib aui-text-info di-ib aui-ellipsis-1 w-35b po-re top-2"><img src="../../statics/pages/images/module.png" class="po-re mr-5 h-21 top-3">'+ret.module_list[i].children[j].children[z].module_name+'</span>'+
									         	'<span class="aui-btn bg-w co-34 aui-pull-right mr-45 mt-9 border-radius-5" onclick="openWin(\'project_module_infoHeader\','+ret.module_list[i].children[j].children[z].module_no+')">More</span>'+
										        '<span class="ml-10 fsize-14 color-999 di-ib aui-ellipsis-1 mt-9 po-re pb-2b aui-pull-right di-ib lh-26"><span>'+ret.module_list[i].children[j].children[z].staff_name+'</span></span>'+
										    '</div>'+
								        '</li>'+
							        '</ul>'
		    						)
		    					
		    					}
	    					}
    					}
    				}
    			}
    			var userAgent = navigator.userAgent;
				var index = userAgent.indexOf("Android");
				if(index >= 0){  
					var androidVersion = parseFloat(userAgent.slice(index+8)); 
					if(androidVersion<4.4){  
					// 版本小于4.4的事情 
						$('div').addClass('pb-5');
						$('.bottom-5').removeClass('bottom-5');
					}
				} 
			}
			else{
			
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
//切换方法
function spired(obj,num,ev){
	var ev=ev||event;
	if(num==1){
		if($(obj).attr('name')=='clicked'){
			$(obj).removeClass('bg-f4').attr('name','');
			$(obj).children('div').children('span').first().removeClass('aui-icon-fold').addClass('aui-icon-unfold');
		}else{
			$(obj).parent().siblings().attr('name','');
			$(obj).parent().siblings().find('li').removeClass('bg-f4');
			$(obj).parent().siblings().find('li').attr('name','');
			$(obj).siblings().find('ul').slideUp();
			$(obj).siblings().attr('name','');
			$(obj).siblings().removeClass('bg-f4');
			$(obj).siblings().attr('name','');
			$(obj).siblings().removeClass('bg-f4');
			$(obj).siblings().find('li').attr('name','');
			$(obj).siblings().find('li').removeClass('bg-f4');
			$(obj).siblings().find('.color-w').removeClass('aui-icon-fold').addClass('aui-icon-unfold');
			$(obj).attr('name','clicked');
			$(obj).children('div').children('span').first().removeClass('aui-icon-unfold').addClass('aui-icon-fold');
		}
	}else{
		if($(obj).attr('name')=='clicked'){
			$(obj).attr('name','');
			$(obj).children('ul').slideToggle();
			$(obj).children('div').children('span').first().removeClass('aui-icon-fold').addClass('aui-icon-unfold');
			$(obj).find('ul').slideUp();
			$(obj).find('li').attr('name','');
			$(obj).find('li').removeClass('bg-f4');
			$(obj).find('.color-w').removeClass('aui-icon-fold').addClass('aui-icon-unfold');
		}else{
			$(obj).siblings().find('ul').slideUp();
			$(obj).siblings().attr('name','');
			$(obj).siblings().removeClass('bg-f4');
			$(obj).siblings().attr('name','');
			$(obj).siblings().removeClass('bg-f4');
			$(obj).siblings().find('li').attr('name','');
			$(obj).siblings().find('li').removeClass('bg-f4');
			$(obj).siblings().find('.color-w').removeClass('aui-icon-fold').addClass('aui-icon-unfold');
			$(obj).attr('name','clicked');
			$(obj).children('ul').slideToggle();
			$(obj).children('div').children('span').first().removeClass('aui-icon-unfold').addClass('aui-icon-fold');		
		}
	}
	ev.stopPropagation();
}
//刷新页面方法
function exec(){
	location.reload();
}