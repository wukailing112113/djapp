apiready = function(){
//	var regionNum = 0;
//	$('#region li').eq(regionNum).addClass('opt');
//	$('#region li').eq(regionNum).find('i').removeClass('di-n');
//	$('.dynamic-width').css('width',($(window).width()-100));
//	$('.region-height').css('min-height',($(window).height()));
	getBbsPostCat();//调用（获取热门论坛列表）
}

//获取热门论坛列表---------------------------------------------------------------------------
function getBbsPostCat(){
	var url = localStorage.url+"/index.php/Api/Life/get_bbs_post_cat";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: {
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				if(ret.data&&ret.data.length>0){
					for(var i=0;i<ret.data.length;i++){
						$('#region').append(
							'<li class="pt-12em pb-12em pl-12em text-l f-14em lh-14em color-33 f-w po-re bb-1-df" onclick="openList(\'life_bbs_list_header\','+ret.data[i].cat_id+')">'+
								ret.data[i].cat_name+
								'<i class="po-ab right-0 iconfont f-12em lh-14em color-ff3032">&#xe87d;</i>'+
							'</li>'
						)
					}
				}
			}else{
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}



//$('#region li').click(function(){
//	regionNum = $(this).index();
//	$('#region li').removeClass('opt');
//	$('#region li').find('i').addClass('di-n');
//	$(this).addClass('opt');
//	$(this).find('i').removeClass('di-n');
//})

function openList(winName,id){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	id:id
	    }
    });
}