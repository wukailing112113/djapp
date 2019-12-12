apiready = function () {
    getLocation();//获取经纬度
//  isSecretarysign();//判断第一书记是否已签到
	hideSignIn();//显示隐藏签到按钮的方法
	getConfig('secretary_intro'); //第一书记简介的方法
	getCmsArticleList(); //工作动态的方法
//	getOaWorklogList(); // 工作纪实的方法
}
var page = 1;
var lon;//经度
var lat;//纬度
var secretaryDate = new Date();
secretaryTime = secretaryDate.getFullYear()+'-'+(secretaryDate.getMonth()+1)+'-'+secretaryDate.getDate()

//判断是否是第一书记来显示隐藏签到按钮-----------------------------------------------------------------------------------
function hideSignIn(){
	if(localStorage.is_secretary==0){
		$("#signIn").hide();
	}
}

//第一书记简介的接口-----------------------------------------------------------------------------------
function getConfig(id){
	var url = localStorage.url+"/index.php/Api/Public/get_config";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				"config_code":id
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				$("#summary").html(ret.data);
				if(ret){//第一书记已签到
					$('#signInBox').addClass('di-n');
				}
			}else{
				$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无简介</div>'
					);	
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}


//工作动态接口-----------------------------------------------------------------------------------
function getCmsArticleList(){
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				cat_id　: 11,
				pagesize: 10 ,
				page : 1
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
											'<span class="pull-left ml-8em color-99">'+clearNull(ret.data[i].add_staff,'无')+'</span>'+
							            '</div>'+
							        '</div>'+
								'</li>'+
							'</ul>'
						)
					}
				}
			}else{			
				$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无动态</div>'
					);	
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}

//工作纪实的接口-----------------------------------------------------------------------------------
function getOaWorklogList(){
	var url = localStorage.url+"/index.php/Api/Oa/get_oa_worklog_list";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				"communist_no": localStorage.user_id,
				"page": 1,
				"pagesize": 3,
				"worklog_type": 5
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				if(ret.data&&ret.data.length>0){
					for(var i=0;i<ret.data.length;i++){	
						$("#flow_list").append(
							'<li class="over-h w-100b" onclick="openInfo(\'oa_secretary_report_info_header\','+ret.data[i].worklog_id+')">'+
								'<div class="pull-left w-60em f-12em lh-24em color-33 f-w">'+ret.data[i].add_staff+'</div>'+
			                	'<div class="pull-right w-290em po-re pb-25em">'+
		                   		'<img class="po-ab wh-24em left-14mem top-0" src="../../../statics/images/images_edu/edu_notes_time.png" alt="" />'+
		                      	'<p class="f-10em lh-24em color-ff9776 pl-20em">'+ret.data[i].add_time.substring(0,11)+'</p>'+
		                      	'<p class="f-16em lh-16em color-99 mt-4em pl-20em">'+ret.data[i].worklog_title+'</p>'+
		                		'</div>'+
	                		'</li>'
						)
					}
				}
			}else{
				$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无内容</div>'
					);	
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}

//判断第一书记是否已签到接口
function isSecretarysign(){
	var url = localStorage.url+"/index.php/Api/Public/check_login";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: {
				"type":1,//1党员登录  2为非党员登录
	    		"party_no":localStorage.dept_no,//支部信息
	    		"communist_name":localStorage.user_name,//姓名
	    		"communist_idnumber":localStorage.user_IDCard//身份证号
	    	}
	    }
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				if(ret.data.is_secretary_sign==1){//今天已签到
					$('#signIn').addClass('di-n')//隐藏签到按钮
				}else{//今天未签到
					$('#signIn').removeClass('di-n')//显示签到按钮
				}
			}
			else{
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}


//第一书记签到接口-----------------------------------------------------------------------------------
function setCcpSecretarySign(){
	var url = localStorage.url+"/index.php/Api/Hr/set_ccp_secretary_sign";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				"communist_no":localStorage.user_id,//已登录党员编号
				"sign_position":lon+','+lat,//当前地址
				"sign_time":secretaryTime//签到时间
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				api.toast({msg: '签到成功' ,duration:3000,location: 'top'});
				$('#signInBox').addClass('di-n');
			}else{
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}

//刷新页面  ---------------------------------------------------------
function exec(){
	location.reload();
}


//打开更多-----------------------------------------------------------------------------------
function openList(winName,id){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	'id': id,
	    }
    });
}

//打开详情-----------------------------------------------------------------------------------
function openInfo(winName,id){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	'id':id,
	    }
    });
}

//打开纪实-----------------------------------------------------------------------------------
function openReport(winName){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    }
    });
}

//获取经纬度
function getLocation(){
	var bMap = api.require('bMap');
	bMap.getLocation({
	    accuracy: '100m',
	    autoStop: true,
	    filter: 1
	}, function(ret, err){
	    if(ret.status){
//			alert('经度'+ret.lon);
//			alert('纬度'+ret.lat);
	    	lon = ret.lon;//获取经度
	        lat = ret.lat;//获取纬度
	        getNameFromCoords(lon,lat);
	    }
	});
}

//根据经纬度获取位置详细信息 
function getNameFromCoords(a,b){
	var map = api.require('bMap');
	map.getNameFromCoords({
	    lon: a,
	    lat: b
	},function(ret,err){
	    if(ret.status){
			$('#info_address').html(ret.address);
	    }
	});
}