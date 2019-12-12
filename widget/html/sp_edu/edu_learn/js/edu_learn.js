apiready=function(){
	getEduMaterialVideo();//调用（获取在线党校示例视频列表）接口
	getEduMaterialArticle();//调用（获取在线党校示例文章列表）接口
}

//获取在线党校示例视频列表接口----------------------------------------------
function getEduMaterialVideo(){
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_material";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"type":"21",//视频
	    		"pagesize":'5',//视频数量
	    		"page":1,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
    				$('#videoBox').removeClass('di-n');
	    			$('#list1').append(
	    				'<div class="pb-6em oveh-h bg-color-whiter bor-ra-7 over-h">'+
							'<div class="po-re m-6em"  onclick="openNewWin(\'edu_learn_videoInfo_header\','+ret.data[0].material_id+')">'+
								'<img class="w-100b h-112em bor-ra-7" src="'+((ret.data[0].material_thumb)?(localStorage.url+ret.data[0].material_thumb):("../../../statics/images/images_edu/edu_special_video1.png"))+'" alt="" />'+
								'<div class="w-100b h-100b bg-color-rgba-0003 po-ab top-0 bor-ra-7">'+
									'<img class="w-50em h-50em po-ab top-50b left-50b ml-25mem mt-25mem" src="../../../statics/images/images_edu/edu_play.png" alt="" />'+
								'</div>'+
							'</div>'+
							'<p class="pt-10em pb-10em color-33 f-14em lh-14em"><span class="pull-left pl-12em">'+InterceptField(ret.data[0].material_title,'无标题',20)+'</span><span class="pull-right f-10em color-99 pr-12em">'+ret.data[0].add_time.substring(0,10)+'</span></p>'+
						'</div>'+
						'<div id="data1" class="over-h pt-12em"></div>'
	    			)
	    			for(var i=1;i<ret.data.length;i++){
	    				$('#data1').append(
		    				'<div class="w-50b pull-left mb-12em">'+
								'<div class="w-170em h-160em center-block bg-color-whiter bor-ra-7 over-h pb-10em box-sha-5-ed" onclick="openNewWin(\'edu_learn_videoInfo_header\','+ret.data[i].material_id+')">'+
									'<div class="w-158em h-88em ml-6em mr-6em mt-6em po-re">'+
										'<img class="w-100b h-100b bor-ra-4" src="'+((ret.data[i].material_thumb)?(localStorage.url+ret.data[i].material_thumb):("../../../statics/images/images_edu/edu_special_video2.png"))+'" alt="" />'+
										'<div class="w-100b h-100b bg-color-rgba-0003 po-ab top-0 bor-ra-7">'+
											'<img class="w-50em h-50em po-ab top-50b left-50b ml-25mem mt-25mem" src="../../../statics/images/images_edu/edu_play.png" alt="" />'+
										'</div>'+
									'</div>'+
									'<div class="clearfix">'+
	//									'<div class="di-ib color-88 f-10em pr-10em"><i class="iconfont f-10em">&#xe87c;</i><span></span>'+ret.data[i].read_num+'</div>'+
										'<div class="di-ib color-88 f-10em ml-60em"><i class="iconfont f-10em">&#xe784;</i><span></span>'+ret.data[i].material_duration+'m</div>'+
									'</div>'+
									'<div class="clearfix mt-5em ml-10em mr-10em">'+
										'<div class="f-14em pull-left">'+InterceptField(ret.data[i].material_title,'无标题',8)+'</div>'+
										'<u class="f-11em color-88 pl-5em pull-right">详情</u>'+
									'</div>'+
									'<div class="color-88 f-10em mt-5em pb-5em ml-10em">'+((ret.data[i].add_time).substring(0,10))+'</div>'+
								'</div>'+
							'</div>'
	    				)
	    			}
	    		}
			}
			else{
				$('#videoBox').addClass('di-n');
			}
    	}else{
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//获取在线党校示例文章列表接口----------------------------------------------
function getEduMaterialArticle(){
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_material";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"type":"11",//文章
	    		"pagesize":'7',//文章数量
	    		"page":1,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
	    		if(ret.data&&ret.data.length>0){
	    			$('#articleBox').removeClass('di-n');
	    			$('#list2').append(
	    				'<div class="pb-6em">'+
							'<div class="over-h bg-color-whiter bor-ra-7 box-sha-5-ed p-6em" onclick="openNewWin(\'edu_learn_info_header\','+ret.data[0].material_id+')">'+
								'<div class="pull-left w-40b"><img class="w-100b h-112em bor-ra-4" src="'+((ret.data[0].material_thumb)?(localStorage.url+ret.data[0].material_thumb):("../../../statics/images/images_edu/edu_special_learn4.png"))+'" alt="" /></div>'+
								'<div class="pull-right w-60b">'+
									'<p class="f-14em color-33 pl-12em pr-12em pb-10em f-w">'+InterceptField(ret.data[0].material_title,'无标题',23)+'</p>'+
									'<p class="f-12em color-88 pl-12em pr-12em lh-15em">'+InterceptField(ret.data[0].material_content,'无内容',41)+'</p>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div id="data2" class="over-h pt-12em"></div>'
	    			)
	    			for(var i=1;i<ret.data.length;i++){
	    				$('#data2').append(
	    					'<div class="w-33b pull-left mb-12em" onclick="openNewWin(\'edu_learn_info_header\','+ret.data[i].material_id+')">'+
								'<div class="w-110em h-130em center-block bg-color-whiter bor-ra-7 over-h pb-10em box-sha-5-ed">'+
									'<div class="w-97em h-69em m-6em">'+
										'<img class="w-100b h-100b bor-ra-4" src="'+((ret.data[i].material_thumb)?(localStorage.url+ret.data[i].material_thumb):("../../../statics/images/images_edu/edu_special_learn4.png"))+'" alt="" />'+
									'</div>'+
									'<p class="f-12em color-33 pl-6em pr-6em lh-14em pb-8em">'+InterceptField(ret.data[i].material_title,'无标题',8)+'</p>'+
									'<p class="f-10em color-b3 text-align lh-10em">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</p>'+
								'</div>'+
							'</div>'
	    				)
	    			}
				}
			}
			else{
				$('#articleBox').addClass('di-n');
			}
//			api.hideProgress();//隐藏进度提示框
    	}else{
//  		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//打开新页面---------------------------------------------------------------------------------------------------
function openNewWin(winName,type){
	api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
        	type:type
        }
    });
}