apiready = function(){
    get_life_affairs_list();//调用接口
    evenScrolltobottom('toTop()');//上拉加载
    openPullRefresh('exec()');//下拉刷新
}
var page = 1;
function toTop(){
    page++;
    get_life_affairs_list();
}

//通知公告接口
function get_life_affairs_list(){
    showProgress()
    var url = localStorage.url+"/index.php/Api/Life/get_life_affairs_list";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                'party_no':api.pageParam.id,
                "cat_id":api.pageParam.type,
                "page":page,
                "pagesize":10
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status==1){
                if(ret.data&&ret.data.length>0){
                    for(var i=0;i<ret.data.length;i++){
                        $('#list').append(
                            '<li class="mb-12em over-h" onclick="openInfo(\'life_threeservices_info_header\','+ret.data[i].article_id+')">'+
                                '<div class="pull-left w-120em h-90em">'+
                                    '<img class=" w-120em h-90em bor-ra-3" src='+((ret.data[i].article_thumb)?(localStorage.url+ret.data[i].article_thumb):("../../../../statics/public/aui2/img/pic-list.png"))+'>'+
                                '</div>'+
                                '<div class="pull-left over-h w-230em ml-8em">'+
                                    '<div class="pull-left w-6em h-12em mt-39em mr-8em">'+
                                        '<img src="../../../statics/public/aui2/img/dl-icon.png">'+
                                    '</div>'+
                                    '<div class="pull-left w-216em mt-12em">'+
                                        '<div class="f-16em color-33 f-w">'+clearNull(ret.data[i].article_title,'无')+'</div>'+
                                        '<div class="pull-left color-a4 f-14em pt-5em">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
    //                                  '<div class="pull-right color-a4 f-14em pt-5em">2188浏览</div>'+
                                    '</div>'+
                               '</div>'+
                            '</li>'
                        )
                    }
                }
                api.hideProgress();//隐藏进度提示框
            }else{
    			 if(page==1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无列表</div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">已经到底啦~</div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }
    			
    			api.hideProgress();//隐藏进度提示框
	    		/**无网络提示 */
//		    	api.toast({msg: ret.msg ,duration:3000,location: 'top'});
    		}
        }else{
            api.hideProgress();//隐藏进度提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    });
}

//打开党务动态
function openInfo(winName,id){
    api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
            id:id,
        }
    });
}

//页面刷新
function exec(){
    location.reload();
}