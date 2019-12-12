apiready = function(){
	getBbsPostList();//调用（获取帖子）
	openPullRefresh('exec()');//下拉刷新
	evenScrolltobottom('toTop()');//上拉加载
}
var page = 1;
function toTop(){
	page++;
	getBbsPostList();
}

//获取帖子-----------------------------------------------------------------------------------------------------------------
function getBbsPostList(){
	var url = localStorage.url+"/index.php/Api/Life/get_bbs_post_list";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				"communist_no":localStorage.user_id,//登录人编号
				"page":page,//页数
				"pagesize":10,//每页数量
				"cat_id":api.pageParam.id//论坛类型
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				if(ret.data&&ret.data.length>0){
					for(var i=0;i<ret.data.length;i++){
						$('#list').append(
							'<div class="mb-4em pt-15em pl-10em pr-10em bg-color-whiter bor-ra-4" onclick="openInfo(\'life_bbs_info_header\','+ret.data[i].post_id+')">'+
								'<div class="over-h bb-1-dashed-df">'+
									'<img class="pull-left w-52em h-52em mr-10em mb-10em bor-ra-100b" src="'+((ret.data[i].img_url)?(localStorage.url+ret.data[i].img_url):("../../../statics/images/images_oa/oa_img_head.png"))+'" alt="" />'+
									'<div class="pull-left w-80b">'+
										'<p class="f-12em lh-18em color-33 f-w">'+InterceptField(ret.data[i].post_theme,'无标题',20)+'</p>'+
										'<p class="f-12em lh-20em color-88">'+InterceptField(ret.data[i].post_content,'无内容',40)+'</p>'+
									'</div>'+
								'</div>'+
								'<div class="over-h">'+
									'<div class="pull-right w-60b over-h pt-5em pb-10em">'+
										'<div class="pull-left w-33b f-12em lh-18em color-99"><i class="iconfont f-12em lh-18em">&#xe87c;</i><span class="pl-4em">'+clearNull(ret.data[i].visitor_volume,'0')+'</span></div>'+
										'<div class="pull-left w-33b f-12em lh-18em color-99"><i class="iconfont f-12em lh-18em">&#xe7bb;</i><span class="pl-4em">'+clearNull(ret.data[i].fav_num,'0')+'</span></div>'+
										'<div class="pull-left w-33b f-12em lh-18em color-99"><i class="iconfont f-12em lh-18em">&#xe7de;</i><span class="pl-4em">'+clearNull(ret.data[i].comment_num,'0')+'</span></div>'+
									'</div>'+
								'</div>'+
							'</div>'
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


//打开info-------------------------------------------------------------------------
function openInfo(winName,id){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	id:id
	    }
    });
}

//页面刷新--------------------------------------------------------------------------
function exec(){
	location.reload();
}


$('#search').click(function(){
	$(this).removeClass('text-align').addClass("pl-20em");
	$(this).next().css('display','none');
})