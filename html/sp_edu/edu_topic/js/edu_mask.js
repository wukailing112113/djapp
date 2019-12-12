apiready = function () {
	edu_personalise();//定制个性化学习接口
}
//定制个性化学习接口
function edu_personalise(){
	var url = localStorage.url+"/index.php/Api/Edu/edu_group_list_type";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {
			values: { 
				
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
			//党支部
				if(ret.data.zuzhi&&ret.data.zuzhi.length>0){
					for(var i=0;i<ret.data.zuzhi.length;i++){
						$('#list1').append(
						'<li onclick="list1(this,'+ret.data.zuzhi[i].code_id+')" data-id="" class="bor-ra-7em border-666 lh-28em h-28em f-12em pl-16em pr-16em color-21 mt-12em">'+ret.data.zuzhi[i].code_name+'</li>'								
						)
						$('#list1').fadeIn();
					}
				
				}
			//党员
				if(ret.data.qunti&&ret.data.qunti.length>0){
					for(var i=0;i<ret.data.qunti.length;i++){
						$('#list2').append(
						'<li onclick="list2(this,'+ret.data.qunti[i].group_id+')" data-id="" class="bor-ra-7em border-666 lh-28em h-28em f-12em pl-16em pr-16em color-21 mt-12em">'+ret.data.qunti[i].group_title+'</li>'								
						)
						$('#list2').fadeIn();
					}
				
				}
			//学习种类
				if(ret.data.biaoqian&&ret.data.biaoqian.length>0){
					for(var i=0;i<ret.data.biaoqian.length;i++){
						$('#list3').append(
						'<li onclick="list3(this,'+ret.data.biaoqian[i].group_id+')" data-id="" class="bor-ra-7em border-666 lh-28em h-28em f-12em pl-16em pr-16em color-21 mt-12em">'+ret.data.biaoqian[i].group_title+'</li>'								
						)
						$('#list3').fadeIn();
					}
				
				}
				
					
			}else{
				
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}




// 获取专属学习接口   打开个性化定制进度条
function openExc_edu(){
//非空校验
if(!$("#list2 li").hasClass('active')){
	alert("请选择党员");
	return false;
}else if(!$("#list3 li").hasClass('active')){
	alert("请选择学习种类");
	return false;
}

	var url = localStorage.url+"/index.php/Api/Edu/edu_customization_group_data";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {
			values: { 
			"communist_no":localStorage.user_id,
			"code_id":$("#list1 .active").attr("data-id"),//党支部id
			"material_group":$("#list2 .active").attr("data-id"),//党员选中的id
			"material_data":$("#list3 .active").attr("data-id"),//学习种类id
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
			//发送监听
	    	  api.sendEvent({
			  name: 'myEvent_mask',
			    extra: {
			            state: 'no'
			        }
	          });

//				api.execScript({
//				    name: 'bd_index',
//				    frameName: 'partyorg',
//				    script: 'mask_back();'
//				});
				api.closeWin();
					
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
	
	



//	api.execScript({
//  name: 'bd_index',
//  frameName: 'partyorg',
//  script: 'mask_back();'
//	});
//	api.closeWin();
   
}



//关闭遮罩层
$(".mask_close").click(function(){
	api.closeWin({});
});

function list1(This,catId){
	$(This).addClass("active");
	$("#list1 li").not($(This)).removeClass("active");
	$(This).attr("data-id",catId);
	
}
//党员
function list2(This,catId){
	
	if($(This).hasClass('active')){
		$(This).removeClass("active");
		$(This).attr("data-id",catId);					
	}else{
		$(This).addClass("active");
		//$("#list2 li").not($(This)).removeClass("active");
		$(This).attr("data-id",catId);	
		
	}
	
}
//学习种类
function list3(This,catId){
	if($(This).hasClass('active')){
		$(This).removeClass("active");
		//$("#list3 li").not($(This)).removeClass("active");
		$(This).attr("data-id",catId);
	}else{
		$(This).addClass("active");
		//$("#list3 li").not($(This)).removeClass("active");
		$(This).attr("data-id",catId);
	}

	
}






