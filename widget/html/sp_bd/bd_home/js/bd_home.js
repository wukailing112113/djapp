apiready = function(){
	//openPullRefresh("exec()");//下拉刷新
	getBdBannerList("bannerList",1,1);//获取banner
	get_home_communist_info();//个人信息接口
	getCmsArticleList();//调用 （党务动态列表） 接口
	
	}

function getBdBannerList(id,num,type){
//id: 添加图片的盒子id; num: 模块对应banner编号; type: 显示多张轮播还是单张展示（1:、为轮播;其他、为单张）;
	var url = localStorage.url+"/index.php/Api/Publicize/get_bd_banner_list";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				"location_id":num,
			}
		}
	},function(ret,err){
		if(ret){
			$(".gjp").remove();//移除骨架屏
			if(ret.status==1){
				if(type==1){//多张图片轮播
					if(ret.data&&ret.data.length>0){//图片列表存在并且有图片时					
						for(var i=0;i<ret.data.length;i++){												
							$('.swiper-wrapper').append(							
				'<div class="bor-ra-5em text-align swiper-slide blue-slide pulse swiper-slide-active">'+
				'<img class="bor-ra-5em w-100b h-200em" src="'+localStorage.url+ret.data[i].ad_img+'" />'+
				'<p class="icon_regular f-14em color-fff po-ab ad_title lh-15em w-100b">'+InterceptField(ret.data[i].ad_title,'',20)+
	'</p>'+
								'</div>'
								

							)
				
						}
						
						//显示背景图
						$(".ban_bg,.ban_fy,.ban").removeClass("di-n");
						//$(".ban").removeClass("di-n");
						var toal_len=$('.swiper-wrapper').find('img').length;
						$(".toal").html(toal_len);
						var mySwiper = new Swiper('.s1',{
							loop: true,
							autoplay: 3000,
							pagination: '.p1',
							paginationClickable: true,							
							onSlideChangeEnd : function(swiperHere) {
								$(".num").html(swiperHere.realIndex+1);
							
							 }
								
							});
						
						
					}else{//图片列表不存在或没有图片时显示一张默认图片
						$('.swiper-wrapper').append(
							'<div class="aui-slide-node bg-dark">'+
								'<img src="../../../statics/images/images_bd/bg-img_2.jpg" / height="6rem" width="100%">'+
							'</div>'
						)
					}
				}else{//单张图片展示
					if(ret.data&&ret.data.length>0){//图片列表存在并且有图片时
						$('.swiper-wrapper').append(
							'<img class="w-100b h-178em di-b" src="'+localStorage.url+ret.data[0]+'" />'
						)
					}else{//图片列表不存在或没有图片时显示一张默认图片
						$('.swiper-wrapper').append(
							'<img class="w-100b h-178em di-b" src="../../../statics/images/images_hr/hr_shijiuda.png" />'
						)
					}
				}
			}else{
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
			if(type==1){
				$('.swiper-wrapper').append(
					'<div class="aui-slide-node bg-dark">'+
						'<img src="../../../statics/images/images_bd/bg-img_2.jpg" / height="6rem" width="100%">'+
					'</div>'
				)
			}else{
				$('.swiper-wrapper').append(
					'<img class="w-100b h-178em di-b" src="../../../statics/images/images_hr/hr_shijiuda.png" />'
				)
			}
		}
	});
}
//获取首页个人信息
function get_home_communist_info(){
//	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_communist_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,
	            "log_type":1
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    		$('#home_communist_avatar').attr('src',localStorage.url+ret.data.communist_avatar);//党员头像
//  			$('#home_communist_name').html(InterceptField(ret.data.communist_name,'无',6));//党员姓名
//  			$('.home_party_name').html(InterceptField(ret.data.party_name,'无',5));//所属支部
			$('#home_communist_name').html(ret.data.communist_name);//党员姓名
    		$('.home_party_name').html(ret.data.party_name);//所属支部
    			$('#home_integral').html(ret.data.integral);//个人积分	
    		}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });

}




//打开网上党支部页面----------------------------------------------------
function openonPartyorg(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_hr/hr_partyorg/header/'+winName+'.html'
    });
}

//打开考试中心模块------------------------------------------------------
function openExam(winName){
	localStorage.exam_flag = 1;
	api.openWin({
	    name: winName,
	    url: '../../sp_edu/edu_exam/'+winName+'.html',
	    pageParam:{
	    	
	    }
    });
}

//打开公文收发---------------------------------------------------------
function openOa_document(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_oa/oa_document/header/'+winName+'.html',
    });
}

//打开专题学习页面-------------------------------------------------------
function openedu_specialwin(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_edu/edu_special/header/'+winName+'.html',
	   
    });
}

//打开三会一课页面--------------------------------------------------------
function openAttmeeting(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_oa/oa_attmeeting/header/'+winName+'.html',
	   
    });
}

//打开党费缴纳页面-------------------------------------------------------
function openFa(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_fa/header/'+winName+'.html',
	   
    });
}

//打开党建矩阵-----------------------------------------------------------
function openMatrix(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_hr/hr_matrix/header/'+winName+'.html',
	    pageParam:{
	    	
	    }
    });
}

//打开积分排名模块--------------------------------------------------------
function openIntegral(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_hr/hr_integral/header/'+winName+'.html',
	    pageParam:{
	    	
	    }
    });
}

//打开便民服务大厅--------------------------------------------------------
function openPlatform(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_life/life_platform/header/'+winName+'.html',
	    pageParam:{
	    	
	    }
    });
}
//打开通知公告
function openNotice(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_oa/oa_notice/header/'+winName+'.html',
	    pageParam:{
	    	
	    }
    });
}
//打开添加通知公告页面------------------------------------------------------
function openNoticeWin(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_oa/oa_notice/header/'+winName+'.html'
    });
}

//获取党务动态列表 接口------------------------------------------------------------
function getCmsArticleList(){
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "cat_id":'30',
	            "page":1,
	            "pagesize":10
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<((ret.data.length<=10)?(ret.data.length):(10));i++){
	    			//名称和时间垂直居中样式
//		    			$('#list').append(
//		    				'<li class="va-jz over-h bb-3em-e6 pb-12em pt-12em" onclick="openPartyWorkInfo(\'cms_partyWork_info_header\','+ret.data[i].article_id+')">'+
//								'<div class="pull-left w-97em h-73em">'+
//									'<img class="w-97em h-73em bor-ra-2em" src='+((ret.data[i].article_thumb!=null)?(localStorage.url+ret.data[i].article_thumb):"../../../statics/images/image_public/pic-list.png")+'>'+
//								'</div>'+
//								'<div class="pull-left over-h w-217em ml-13em icon_medium">'+									
//				                    '<div class="pull-left w-217em mt-0em">'+
//				                        '<div class="f-14em color-12 f-w">'+InterceptField(ret.data[i].article_title,'无标题',25)+'</div>'+
//				                        '<div class="color-a4 mt-8em pull-left f-12em">'+clearNull(ret.data[i].add_staff,'0')+'</div>'+
//				                        '<div class="color-a4 f-12em mt-8em pull-right">'+clearNull(ret.data[i].add_time,'0')+'</div>'+
//				                    '</div>'+
//				               '</div>'+
//							'</li>'
//		    			)
				
		    		//名称和时间固定样式
		    		$('#list').append(
		    				'<li class="over-h bb-3em-e6 pb-12em pt-12em" onclick="openPartyWorkInfo(\'cms_partyWork_info_header\','+ret.data[i].article_id+')">'+
								'<div class="pull-left w-97em h-73em">'+
									'<img class="bor-ra-2em w-97em h-73em" src='+((ret.data[i].article_thumb!=null)?(localStorage.url+ret.data[i].article_thumb):"../../../statics/images/image_public/pic-list.png")+'>'+
								'</div>'+
								'<div class="pull-left over-h w-217em ml-13em">'+									
				                    '<div class="pull-left w-217em mt-0em">'+
				                        '<div class="f-14em h-55em over-h color-12 f-w">'+InterceptField(ret.data[i].article_title,'无标题',25)+'</div>'+
				                        '<div class="color-a4 pull-left f-12em">'+clearNull(ret.data[i].add_staff,'0')+'</div>'+
				                        '<div class="color-a4 f-12em pull-right">'+clearNull(ret.data[i].add_time,'0')+'</div>'+
				                    '</div>'+
				               '</div>'+
							'</li>'
		    			)	
		    		}
	    		}
			}
			else{
				api.toast({msg: '无更多数据...',duration:3000,location: 'top'});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//打开党务动态------------------------------------------------------------------
function openPartyWork(winName,type){
	api.openWin({
	    name: winName,
	    url: '../../sp_cms/cms_partyWork/header/'+winName+'.html',
	    pageParam:{
	    	type:type,
	    }
    });
}

function openPartyWorkInfo(winName,id){
	api.openWin({
	    name: winName,
	    url: '../../sp_cms/cms_partyWork/header/'+winName+'.html',
	    pageParam:{
	    	id:id,
	    }
    });
}

//打开新页面--------------------------------------------------------------------
function openNewWin(winName,id){
	api.openWin({
	    name: winName,
	    url: '../../sp_oa/oa_notice/header/'+winName+'.html',
	    pageParam:{
	    	"id":id
	    }
    });
}

//aui轮播属性对象设置------------------------------------------------------------
var slide = new auiSlide({
    container:document.getElementById("aui-slide"),
    // "width":300,
    "height":200,
    "speed":300,
    "autoPlay": 3000, //自动播放
    "pageShow":true,
    "pageStyle":'dot',
    "loop":true,
    'dotPosition':'center',
    
})
var slide3 = new auiSlide({
    container:document.getElementById("aui-slide3"),
    // "width":300,
    "height":240,
    "speed":500,
    "autoPlay": 3000, //自动播放
    "loop":true,
    "pageShow":true,
    "pageStyle":'line',
    'dotPosition':'center'
})
    
//页面刷新
function exec(){
	location.reload();
}

//打开积分页------------------------------------------------------------------------
function openIntegral(winName){
	api.openWin({
        name: winName,
        url: '../../sp_hr/hr_integral/header/'+winName+'.html',
        pageParam:{
        }
    });
}
//打开消息通知
function openMessage(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_oa/oa_message/header/'+winName+'.html',
	    pageParam:{
	    	
	    }
    });
}
//打开定制计划
function openMade(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_edu/edu_topic/header/'+winName+'.html',
	    pageParam:{
	    	
	    }
    });
}


