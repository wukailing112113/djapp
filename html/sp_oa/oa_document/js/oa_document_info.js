apiready = function(){
	getOaMissiveInfo(api.pageParam.type);//调用（公文详情）接口
}
var missiveAttach = '';

//获取公文详情接口------------------------------
function getOaMissiveInfo(type){
	var url = localStorage.url+"/index.php/Api/Oa/get_oa_missive_info";
//	alert(type);
//	alert(keywork);
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: {
	    		"communist_no":localStorage.user_id,//发起人
	            "missive_no":type,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status){
    			$('#missive_title').html(clearNull(ret.data.missive_title,'无'));//标题
    			$('#missive_date').html(clearNull(ret.data.missive_date,'0'));//时间
    			$('#missive_receiver').html(clearNull(ret.data.missive_receiver,'无'));//收件人
    			$('#missive_cc').html(clearNull(ret.data.missive_cc,'无'));//抄送人
    			$('#missive_communist').html(clearNull(ret.data.missive_communist,'无'));//发送人
    			$('#missive_content').html(clearNull(ret.data.missive_content,'无'));//内容
//  			alert(ret.data.missive_attach);
				if( ret.data.missive_attach&&ret.data.missive_attach!=null){
		    		missiveAttach = ret.data.missive_attach.split('&nbsp;&nbsp;&nbsp;&nbsp;');
		    		$('#missiveAttachQuantity').html(missiveAttach.length);
		    		for(var i=0;i<missiveAttach.length;i++){
		    			$('#missiveAttach').append(
		    				'<div class="b-1-dfdfdf p-12em bg-color-fcfdfe over-h mb-12em" onclick="openEnqueue(\''+localStorage.url+missiveAttach[i]+'\')">'+
								'<div class="pull-left pr-12em">'+
									'<img class="w-35em h-35em" src="../../../statics/images/images_oa/oa_img_doc.png" alt="" />'+
								'</div>'+
								'<div class="pull-left">'+
									'<p class="f-15em color-b3">'+missiveAttach[i].split('/')[(missiveAttach[i].split('/').length-1)]+'</p>'+
	//								'<p class="f-12em color-b3">1.54 MB</p>'+
								'</div>'+
							'</div>'
		    			)
		    		}
		    	}else{
		    		$('#missiveAttach').parent().addClass('di-n');
		    	}
    		}else{
    			api.toast({msg: ret.msg ,duration:3000,location: 'top'});
    		}
    	}else{
    		api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
