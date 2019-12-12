apiready = function(){
//	alert(api.pageParam.type);
	$('#tabBox2 li').removeClass('tabBox2-active');
	$('#tabBox2 li').eq(api.pageParam.type-1).addClass('tabBox2-active');
	getHrCommunistIntegralList(api.pageParam.type);//调用（获取志愿者积分排名）接口
}

//获取志愿者积分排名接口---------------------------------------------------
function getHrCommunistIntegralList(type){
$('#list').html('');
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_communist_integral_list";	
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
				"communist_no":localStorage.user_id,//登录人编号
				"type":type,//支部或系统类型
				"pagesize":20,//需求数量
	        }
	    }
    },function(ret,err){
   // alert(ret.data);
    	if(ret){
    		if(ret.status==1){
//  			if(type==1){
//  				$('#title').html('本支部排名');
//  			}else{
//  				$('#title').html('系统内排名');
//  			}
				
				for(var i=0;i<ret.data.length;i++){
				$('#list').append(
	    				'<li class="lh-50em f-14em mb-8em bor-ra-3 hr-s-gray5">'+
	    					'<span class="pr-8em color-99 fsize-2em pl-10em lh-50em text-c">'+ret.data[i].rank+'</span>'+
	    					'<span class="pr-8em color-33 lh-50em pl-30em text-c">'+clearNull(ret.data[i].communist_name,' ')+'</span>'+
	    					'<span class="num color-33 pull-right pr-10em lh-60em text-c">'+clearNull(ret.data[i].integral_total,'0')+'分</span>'+
//	    					'<span class="pr-12em color-33 lh-50em">分</span>'+
	    				'</li>'
    				)
	    			
	    		}
	    		
//	    		var CalculateLength = $('#list li').length;
	    		/*
				for(var CalculateNum = 0;CalculateNum<CalculateLength;CalculateNum++){
					$('#list li').eq(CalculateNum).css('width',CalculateWidth($('#list li').eq(CalculateNum).find('.num').html()));
					if($('#list li').eq(CalculateNum).width()<70){
						$('#list li').eq(CalculateNum).css('width','3'+'rem');
						$('#list li').eq(CalculateNum).css(
							{'font-size':'0.5'+'rem',
							'line-height':'0.9'+'rem',}
						)
					}
				}*/
//				for(var CalculateNum = 0;CalculateNum<CalculateLength;CalculateNum++){
//					$('#list li').eq(CalculateNum).css('width',CalculateWidth($('#list li').eq(CalculateNum).find('.num').html()));
//					if($('#list li').eq(CalculateNum).width()<70){
////						$('#list li').eq(CalculateNum).css('width','5'+'rem');
//						$('#list li').eq(CalculateNum).css(
//							{'font-size':'0.5'+'rem',
//							'line-height':'0.9'+'rem',}
//						)
//					}
//				}
				
			}
			else{
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//var CalculateLength = $('#list').find('li').length;
//for(var CalculateNum = 0;CalculateNum<CalculateLength;CalculateNum++){
//	$('#list li').eq(CalculateNum).css('width',CalculateWidth($('#list li').eq(CalculateNum).find('.num').html()));
//	if($('#list li').eq(CalculateNum).width()<70){
//		$('#list li').eq(CalculateNum).css('width','3'+'rem');
//		$('#list li').eq(CalculateNum).css(
//			{'font-size':'0.5'+'rem',
//			'line-height':'0.9'+'rem',}
//		)
//	}
//}
//function CalculateWidth(num){
//	return (num/($('#list li').eq(0).find('.num').html())*100)+'%';
//}

//切换-----------------------------------------------------------
$('#tabBox2 li').click(function(){
	$('#tabBox2 li').removeClass('tabBox2-active');
	$(this).addClass('tabBox2-active');
	
})




//$('#tabBox2 li').click(function(){
//	$('#tabBox2 li').removeClass('tabBox2-active');
//	$(this).addClass('tabBox2-active');
//	get_hr_communist_integral_list($(this).index()+1);
//})
