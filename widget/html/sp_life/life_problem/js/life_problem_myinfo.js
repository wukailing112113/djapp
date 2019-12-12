apiready = function(){
	getLifeConditionInfo();
	//alert(api.pageParam.status)
//	if(api.pageParam.status==10){
//		
//	}else if(api.pageParam.status==20){
////		$('#submit').addClass('di-n');
////		$('#finish').removeClass('di-n');
//	}else if(api.pageParam.status==30){
//	
//		$('#submit').addClass('di-n');
//		$('#finish').addClass('di-n');
//		$('#completed').removeClass('di-n');
//		$('#completed').removeClass('grad');
//		$('#completed').addClass('bg-color-gray1');
//		$('.more1').removeClass('di-n');
//	}
}

var missiveAttach = '';
//获取详情
function getLifeConditionInfo(){
//alert(api.pageParam.id)
//alert(localStorage.user_id)
	var url = localStorage.url+"/index.php/Api/Life/life_condition_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "condition_id":api.pageParam.id,
	            "communist_no":localStorage.user_id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    		//alert(ret.data.condition_content1);
    			$('#contacts').html(clearNull(ret.data.condition_personnel,'无'));
	    		$('#contact_tel').html(clearNull(ret.data.condition_personnel_mobile,'无'));
	    		$('#contact_addr').html(clearNull(ret.data.condition_area,'无'));
	    		$('#appoint').html(clearNull(ret.data.condition_delegate_no,'无'));
	    		$('#question').html(clearNull(ret.data.condition_content,'无'));//问题内容	    		
	    		$('#question_no').html(clearNull(ret.data.condition_content1,'无'));//解决问题描述
	    		//读取附件列表
	    		if(ret.data.thumb){
					$('#whole').val(ret.data.thumb);
					missiveAttach = ret.data.thumb.split('&nbsp;&nbsp;&nbsp;&nbsp;');
					$('#missiveAttachQuantity').html(missiveAttach.length)
					for(var i=0;i<missiveAttach.length;i++){
						$('#missiveAttach').append(
							'<div class="b-1-dfdfdf p-12em bg-color-fcfdfe over-h mb-12em" onclick="openEnqueue(\''+localStorage.url+missiveAttach[i]+'\')">'+
								'<div class="pull-left pr-12em">'+
									'<img class="w-35em h-35em" src="../../../statics/images/images_oa/oa_img_doc.png" alt="" />'+
								'</div>'+
								'<div class="pull-left">'+
									'<p class="f-15em color-b3">'+missiveAttach[i].split('/')[(missiveAttach[i].split('/').length-1)]+'</p>'+
								'</div>'+
							'</div>'
						)
					}
				}else{
					$('#all').addClass('di-n');
				}
				
				if(ret.data.status==10){
					
				}else if(ret.data.status==20){
					$('#submit').addClass('di-n');
					$('#finish').removeClass('di-n');
					$('.more').removeClass('di-n');
					$('#question_can').removeClass('di-n');
				}else if(ret.data.status==30){
					$('#submit').addClass('di-n');
					$('#finish').addClass('di-n');
					$('#completed').removeClass('di-n');
					$('#completed').removeClass('grad');
					$('#completed').addClass('bg-color-gray1');
					$('.more1').removeClass('di-n');
				}
				
				
				
			}
			else{
//				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
				alert('暂无详情');
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
    
    
    
}


//下载全部附件
function foreach_file(){
	var file=$("#whole").val().split("&nbsp;&nbsp;&nbsp;&nbsp;");
    if(file.length>1){
       for(var i=0;i<file.length;i++){
            openEnqueue(''+localStorage.url+file[i]+'');
        }
        openManagerView() 
    }else{
        openEnqueue(''+localStorage.url+file[0]+'');
        openManagerView()
    }
}


//点击接受按钮     变为完成状态--------------------------------------------
function submit(){
//alert(api.pageParam.id);
//alert(localStorage.user_id);
	$('#submit').addClass('di-n');
	$('#finish').removeClass('di-n');
	//$('#condition_content1').removeClass('di-n');
	//$('.more').removeClass('di-n');

	var url = localStorage.url+"/Api/Life/life_condition_take_in";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "condition_id":api.pageParam.id,
	            "add_staff":localStorage.user_id,
	            "status":20
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			api.closeWin({});
    			api.execScript();
			}
			else{
//				
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
	
    
	
}
//点击完成按钮      已完成状态--------------------------------------------
function finish(){
	$('#submit').addClass('di-n');
	$('#finish').addClass('di-n');
	$('#completed').removeClass('di-n');
	$('#completed').removeClass('grad');
	$('#completed').addClass('bg-color-gray1');
	$('#question_can').removeClass('di-n');
	$('.more').removeClass('di-n');
		var url = localStorage.url+"/Api/Life/life_condition_take_in";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "condition_id":api.pageParam.id,
	            "add_staff":localStorage.user_id,
	            "status":30,
	            "condition_content1":$('#question_can').val(),//问题解决详情	
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    		alert("提交成功");
    			api.closeWin({});
    			api.execScript();
			}
			else{
//				
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });	
	 
}

