var lon;//经度
var lat;//纬度

//页面初始化
apiready=function(){
	
    getLocation();
}

//提交
function set_cms_article(){
	if($('#article_title').val()==""){
		alert('请输入文章标题');
		return
	}else if($('#article_keyword').val()==''){
		alert('请输入文章关键字');
		return
	}else if($('#article_description').val()==''){
		alert('请输入文章描述');
		return
	}else if($('#article_content').val()==''){
		alert('请输入文章内容');
		return
	}
	//获取上传列表id
	 var notice_attach="";
	 $("input[name='file_no']").each(function(){
		if(notice_attach==""){
			notice_attach=notice_attach+$(this).val()
		}
		else{
			notice_attach=notice_attach+","+$(this).val()
		}
	 });
	var url = localStorage.url+"/Api/Publicize/set_cms_article";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
				"article_cat":15,
				"article_title":$('#article_title').val(),  //文章标题
				"article_keyword":$('#article_keyword').val(), //文章关键字
				"article_description":$('#article_description').val(),  //文章描述
				"article_content":$('#article_content').val(),  //文章内容
				"communist_no":localStorage.user_id,  //党员编号
				"add_staff":localStorage.user_id,  //党员编号
				"article_thumb":notice_attach,  //缩略图
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			alert('提交成功')
    			api.closeWin({});
			}else{
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
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
//	    	alert(1)
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
