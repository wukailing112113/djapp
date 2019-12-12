apiready = function () {
	getOaMissiveList(1,"");//调用 （公文收发公文列表） 接口
}
var type = 1;//创建公文收发接口所传字段


//打开公文收发详情----------------------------------------------------
function openInfo(winName,type){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	type:type,
	    }
    });
}

//公文收发公文列表接口----------------------------------------------
function getOaMissiveList(type,keywork){
	var url = localStorage.url+"/index.php/Api/Oa/get_oa_missive_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,//登录人编号
	            "type":type,//1、收件箱 2、我发起的
	            "keywork":keywork,//关键字
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status){
    			$('#list').html('');
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
	    				if(ret.data[i].is_read=='未读'){
	    					$('#list').append(
			    				'<div class="over-h bb-1-dfdfdf" onclick="openInfo(\'oa_document_info_header\',\''+ret.data[i].missive_no+'\')">'+
									'<div class="pull-left w-20b">'+
										'<img class="w-52em h-52em bor-ra-100b ml-8em mr-8em mt-15em mb-12em" src="../../../statics/images/images_oa/oa_img_head.png" alt="" />'+
									'</div>'+
									'<div class="pull-left w-80b pb-10em">'+
										'<p class="over-h pt-15em"><span class="pull-left w-8em h-8em bg-color-ff3032 mt-7em mr-6em"></span>'+
											'<span class="pull-left f-15em color-33">'+InterceptField(ret.data[i].missive_title,'无',8)+'</span>'+
											'<span class="pull-right h-15em f-10em lh-22em color-ffba66">'+clearNull(ret.data[i].missive_communist,'无')+' '+clearNull(ret.data[i].missive_date,'0')+'</span>'+
										'</p>'+
										'<p class="f-12em color-33 pt-4em">'+InterceptField(removeHTMLTag(ret.data[i].missive_content),'无',50)+'</p>'+
										'<p class="f-12em color-99 pt-4em white-space"></p>'+
									'</div>'+
								'</div>'
			    			)
	    				}else{
	    					$('#list').append(
	    						'<div class="over-h bb-1-dfdfdf opacity" onclick="openInfo(\'oa_document_info_header\',\''+ret.data[i].missive_no+'\')">'+
									'<div class="pull-left w-20b">'+
										'<img class="w-52em h-52em bor-ra-100b ml-8em mr-8em mt-15em mb-12em" src="../../../statics/images/images_oa/oa_img_head.png" alt="" />'+
									'</div>'+
									'<div class="pull-left w-80b pb-10em">'+
										'<p class="over-h pt-15em color-99">'+
											'<span class="pull-left f-15em color-33">'+InterceptField(ret.data[i].missive_title,'无',8)+'</span>'+
											'<span class="pull-right h-15em f-10em lh-22em">'+clearNull(ret.data[i].missive_communist,'无')+' '+clearNull(ret.data[i].missive_date,'0')+'</span>'+
										'</p>'+
										'<p class="f-12em color-99 pt-4em">'+InterceptField(removeHTMLTag(ret.data[i].missive_content),'无',50)+'<span class="pull-right">【已读】</span></p>'+
										'<p class="f-12em color-99 pt-4em white-space"></p>'+
									'</div>'+
								'</div>'
	    					)
	    				}
		    		}
		    	}
    		}else{
			$("#list #more").remove();
				$("#list").append(
					'<div class="aui-user-view-cell aui-text-center clearfix color-99 pt-10em" id="more">暂无内容</div>'
				);	
    		}
    	}else{
    		api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//公文收发类型tab切换--------------------------------------------------
$('#tabBox2 li').click(function(){
	$(this).siblings().removeClass('tabBox2-active');
	$(this).addClass('tabBox2-active');
	type = ($(this).index()+1);
	getOaMissiveList(type,"");//调用 （公文收发公文列表） 接口
	$('#keywork').val("");
})

//关键字搜索----------------------------------------------------------
$('#keywork').keyup(function(){
	getOaMissiveList(type,$('#keywork').val())
})


//刷新页面-----------------------------------------------------------
function exec(){
	location.reload();
}