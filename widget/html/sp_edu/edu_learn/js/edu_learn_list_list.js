apiready=function(){
	getEduMaterialList();//调用（获取视频与文章类别列表）接口
	evenScrolltobottom('toTop()');//上拉加载
	openPullRefresh('exec()');//下拉刷新
}
var page=1;

function toTop(){
	page++;
	getEduMaterialList();
}

//获取视频与文章完整列表接口------------------------------------------------------
function getEduMaterialList(){
	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_material_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"cat_id":api.pageParam.id,//类型id
				"page":page,//分页
				"pagesize":10,//每一页的视频或文章数量
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(api.pageParam.type==1){
    				if(ret.data&&ret.data.length>0){
	    				for(var i=0;i<ret.data.length;i++){
		    				$('#list').append(
		    					'<div class="w-50b pull-left mb-12em" onclick="openNewWin(\'edu_learn_videoInfo_header\','+ret.data[i].material_id+')">'+
									'<div class="w-170em h-160em center-block bg-color-whiter bor-ra-7 over-h pb-10em box-sha-5-ed">'+
										'<div class="w-158em h-88em m-6em po-re">'+
											'<img class="w-100b h-100b bor-ra-4" src="'+((ret.data[i].material_thumb)?localStorage.url+ret.data[i].material_thumb:"../../../statics/images/images_edu/edu_special_video2.png")+'" alt="" />'+
											'<div class="w-100b h-100b bg-color-rgba-0003 po-ab top-0 bor-ra-7">'+
												'<img class="w-50em h-50em po-ab top-50b left-50b ml-25mem mt-25mem" src="../../../statics/images/images_edu/edu_play.png" alt="" />'+
											'</div>'+
										'</div>'+
										'<p class="f-10em color-88 lh-20em ml-60em"><i class="iconfont f-10em color-88 ml-5em">&#xe784;</i><span class="">'+clearNull(ret.data[i].video_duration,'0')+'m</span></p>'+
										'<p class="f-10em color-88 over-h lh-14em pb-5em pt-5em"><span class="pull-left f-14em color-33 pl-12em">'+InterceptField(ret.data[i].material_title,'无标题',8)+'</span><span class="pull-right pr-5em"><u>详情</u></span></p>'+
										'<p class="f-10em color-b3 pl-12em">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</p>'+
									'</div>'+
								'</div>'
		    				)
		    			}
		    		}
    			}else{
    				if(ret.data&&ret.data.length>0){
	    				for(var i=0;i<ret.data.length;i++){
		    				$('#list').append(
		    					'<div class="w-33b pull-left mb-12em" onclick="openNewWin(\'edu_learn_info_header\','+ret.data[i].material_id+')">'+
									'<div class="w-110em h-130em center-block bg-color-whiter bor-ra-7 over-h pb-10em box-sha-5-ed">'+
										'<div class="w-97em h-69em m-6em">'+
											'<img class="w-100b h-100b bor-ra-4" src="'+((ret.data[i].material_thumb)?(localStorage.url+ret.data[i].material_thumb):("../../../statics/images/images_edu/edu_special_learn1.png"))+'" alt="" />'+
										'</div>'+
										'<p class="f-12em color-33 text-align lh-14em pb-8em">'+InterceptField(ret.data[i].material_title,'无标题',8)+'</p>'+
										'<p class="f-10em color-b3 text-align lh-10em">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</p>'+
									'</div>'+
								'</div>'
		    				)
		    			}
		    		}
    			}
    			api.hideProgress();//隐藏进度提示框
			}else{
    			 if(page==1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无内容</div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">已经到底啦~</div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }
    			
    			api.hideProgress();//隐藏进度提示框
	    		/**无网络提示 */
//		    	api.toast({msg: ret.msg ,duration:3000,location: 'top'});
    		}
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//打开新页面------------------------------------------------------------------------------
function openNewWin(winName,type){
	api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
        	type:type,
        }
    });
}

//页面刷新--------------------------------------------------------------------------------
function exec(){
	location.reload();
}
