var page =1;
apiready = function () {
	getCmsArticleList();//工作动态接口的方法
	openPullRefresh("exec()");//下拉刷新
    evenScrolltobottom("getCmsArticleList()");//上拉加载数据
}
//工作动态接口
function getCmsArticleList(){
	showProgress();//进度提示框
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				cat_id　: 11,
				pagesize: 10 ,
				page : page
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				if(ret.data&&ret.data.length>0){
					for(var i=0;i<ret.data.length;i++){	
						$('#workStatus').append(
							'<ul class="pl-12em pr-12em">'+
								'<li class="over-h w-100b mb-14em" onclick="openInfo(\'oa_secretary_info_header\','+ret.data[i].article_id+')">'+
							        '<div class="pull-left w-110em h-90em p-0 mt-16em mr-12em">'+
							            '<img class="w-100b h-100b bor-ra-3" src="'+((ret.data[i].article_thumb!=null)?localStorage.url+ret.data[i].article_thumb:"../../../statics/public/aui2/img/pic-list.png")+'" />'+
							        '</div>'+
							        '<div class="pull-left w-228em p-0 mt-12em">'+
							            '<div class="f-16em color-33 lh-24em f-w">'+InterceptField(ret.data[i].article_title,'无标题',18)+'</div>'+
							            '<div class="p-0 mt-5em f-14em lh-14em h-14em pb-15em color-a4">'+
						                    '<span class="pull-left pr-8em color-99 br-1-df">'+ret.data[i].add_time.substring(0,11)+'</span>'+
											'<span class="pull-left ml-8em color-99">'+ret.data[i].add_staff+'</span>'+
							            '</div>'+
							        '</div>'+
								'</li>'+
							'</ul>'
						)
					}
				}
				page++;
			}else{
				$("#workStatus #more").remove();
				$("#workStatus").append(
					'<div class="aui-text-center clearfix color-99 pt-10em" id="more">已经到底啦~</div>'
				);	
//				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
			api.hideProgress();//隐藏进度提示框
		}else{
			api.hideProgress();//隐藏进度提示框
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}





//刷新页面  ---------------------------------------------------------
function exec(){
	location.reload();
}
//打开详情
function openInfo(winName,id){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	'id': id,
	    }
    });
}
