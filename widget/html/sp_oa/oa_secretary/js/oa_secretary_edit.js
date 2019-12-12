var date = new Date();
//	year = date.getFullYear();
//	month = date.getMonth();
//	day = date.getDate();
//	date = year+'-'+month+'-'+day;
apiready = function(){
	$('#time').html(date.toLocaleString());
}

//第一书记签到接口-----------------------------------------------------------------------------------
function setCmsArticle(){
	//获取上传列表id
	var notice_attach="";
	$("input[name='file_no']").each(function(){
		if(notice_attach==""){
			notice_attach=notice_attach+$(this).val()
		}else{
			notice_attach=notice_attach+","+$(this).val()
		}
	})
	
	var url = localStorage.url+"/index.php/Api/Publicize/set_cms_article";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				"communist_no":localStorage.user_id,//已登录党员编号
				"article_cat":11,//类型：第一书记
				"article_title":$('#article_title').val(),//标题
				"article_content":$('#article_content').val(),//内容
				"article_thumb":notice_attach//图片
				
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				alert('新增成功');
				api.closeWin({name:api.winName});
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

//获取经纬度  ---------------------------------------------------------
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

//根据经纬度获取位置详细信息   ---------------------------------------------------------
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