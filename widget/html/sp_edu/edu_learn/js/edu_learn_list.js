apiready=function(){
	getEduMaterialCatList(api.pageParam.type);//调用（获取视频与文章类别列表）接口
}

//获取视频与文章类别列表接口--------------------------------------------------------------------------
function getEduMaterialCatList(type){
	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_material_cat_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values:{ 
	    		"type":((type=="1")?"21":"11"),//根据上个页面所传判断是视频类型列表或者文章类型列表
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
		    			$('#list').append(
		    				'<div class="mt-8em bg-color-whiter po-re bor-ra-4" onclick="openNewWin(\'edu_learn_list_list_header\','+ret.data[i].cat_id+')">'+
								'<span class="po-ab left-10em top-20em w-6em h-6em m-4em bor-ra-100b bg-color-ff3032"></span>'+
								'<p class="f-14em color-75 lh-14em p-20em pl-30em">'+ret.data[i].cat_name+'</p>'+
								'<i class="po-ab right-0 top-20em f-14em color-df iconfont mr-10em">&#xe613;</i>'+
							'</div>'
		    			)
		    		}
		    	}
			}
			else{
//				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
				$('#list').hide();

			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//打开新页面----------------------------------------------------------------------------------
function openNewWin(winName,id){
	api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
        	type:api.pageParam.type,
        	id:id,
        }
    });
}