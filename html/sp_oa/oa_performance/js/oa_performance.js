apiready = function(){
	perfMine();
}

var performanceDate = new Date();
$('#performance_title').html(performanceDate.getFullYear()+'年绩效明细');//当前年份

function perfMine(){
	var url = localStorage.url+"/index.php/Api/Oa/perf_mine";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,//登录人编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#party_name').html(ret.data.party_name);//支部
				$('#name').html(ret.data.communist_name);//姓名
				$('#job_title').html(ret.data.post_name);//职务
				$('#score').html(ret.data.score);
    			if(ret.data.entering_detail&&ret.data.entering_detail.length>0){
    				for(var i=0;i<ret.data.entering_detail.length;i++){
    					$('#performance_list').append(
    						'<li class="w-100b h-52em bb-1-df pt-22em">'+
								'<div class="over-h lh-20em">'+
									'<p class="over-h pull-left f-16em color-33">'+
										'<span class="pull-left w-6 h-6 bg-color-99 ml-12em mr-12em mt-7 bor-ra-100b"></span>'+
										'<span class="pull-left">'+ret.data.entering_detail[i].date+'</span>'+
									'</p>'+
									'<p class="over-h pull-right color-fd483d"><span class="f-20em">'+ret.data.entering_detail[i].per_sum+'</span><span class="f-12em">(分)</span></p>'+
								'</div>'+
							'</li>'
    					)
    				}
    			}
    		}else{
			$("#performance_list #more").remove();
				$("#performance_list").append(
					'<div class=" aui-text-center clearfix color-99" id="more">暂无数据</div>'
				);	
    		}
    	}else{
    		api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}