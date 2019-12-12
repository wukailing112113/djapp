var type1=0;
var type2=0;
var type3=0;
var type4=0;
apiready=function(){
//	alert(1);
//	get_banner_list();
	get_meeting_list();
}
//获取banner
function get_banner_list(){
	var url = localStorage.url+"/index.php/Api/Bd/get_banner_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "location_code": 1,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){  
    			for(var i=0;i<ret.banner.length;i++){
    				$('#list').append(
    					'<div class="aui-slide-node bg-dark">'+
							'<img src="'+localStorage.url+ret.banner[i].news_img+'" />'+
						'</div>'
    				)
    			}
    			haha();
			}
			else{
				alert(ret.msg,"提示");
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
//获取会议列表
function get_meeting_list(type){
	if(type!=='new'){
		showProgress();//加载等待
	}
	var url = localStorage.url+"/index.php/Api/Hrmeeting/get_att_meeting_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "staff_no": localStorage.user_id,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){  
	    		if(type=='new'){
					$('#list1,#list2,#list3,#list4').html('');
				}		
    			if(ret.nochecked!==null&&ret.nochecked!==''){
    				for(var i=0;i<ret.nochecked.length;i++){
    					if(ret.nochecked[i].meeting_type=='2002'){
    						$('#list1').show();
    						$('#list1').prev().show();
    						$('#name1').html(ret.nochecked[i].meeting_type_name);
    						type1++;
    						if(type1>5){
    							continue;
    						}
    					}else if(ret.nochecked[i].meeting_type=='2003'){
    						$('#list2').show();
    						$('#list2').prev().show();
    						$('#name2').html(ret.nochecked[i].meeting_type_name);
    						type2++;
    						if(type2>5){
    							continue;
    						}
    					}else if(ret.nochecked[i].meeting_type=='2004'){
    						$('#list3').show();
    						$('#list3').prev().show();
    						$('#name3').html(ret.nochecked[i].meeting_type_name);
    						type3++;
    						if(type3>5){
    							continue;
    						}
    					}else if(ret.nochecked[i].meeting_type=='2005'){
    						$('#list4').show();
    						$('#list4').prev().show();
    						$('#name4').html(ret.nochecked[i].meeting_type_name);
    						type4++;
    						if(type4>4){
    							continue;
    						}
    					}
    					$('#'+(ret.nochecked[i].meeting_type=='2002'?'list1':(ret.nochecked[i].meeting_type=='2003'?'list2':(ret.nochecked[i].meeting_type=='2004'?'list3':'list4')))).append(
    						'<li class="aui-list-view-cell aui-img">'+
								'<img class="aui-img-object aui-pull-left bor-ra-100b" src="../../../statics/dangjian/public/image/three.png">'+
								'<div class="aui-img-body"><span class="fcolor-red2">'+
									ret.nochecked[i].meeting_name+'</span><span id="'+ret.nochecked[i].meeting_no+'" class="more aui-pull-right border bg-blue" onclick="openNewWin(\'oa_attmeeting_sign_in_header\',this)">参加</span>'+
									'<p>'+
										'<div class="more">'+
											'<span>主持人：</span><span class="fcolor-99">'+(ret.nochecked[i].meeting_host_name==null?'':ret.nochecked[i].meeting_host_name)+'</span>'+
										'</div>'+
										'<div class="more">'+
											'<span>组织部门：</span><span class="fcolor-99">'+(ret.nochecked[i].dept_name==null?'':ret.nochecked[i].dept_name)+'</span>'+
										'</div>'+
										'<div class="more">'+
											'<span>会议地点：</span><span class="fcolor-99">'+(ret.nochecked[i].meeting_addr==null?'':ret.nochecked[i].meeting_addr)+'</span>'+
										'</div>'+
										'<div class="more">'+
											'<span>会议人数：</span><span class="fcolor-99">'+(ret.nochecked[i].should==null?'':ret.nochecked[i].should)+'</span>'+
										'</div>'+
										'<div class="more">'+
											'<span>会议时间：</span><span class="fcolor-99">'+(ret.nochecked[i].meeting_start_time==null?'':ret.nochecked[i].meeting_start_time)+'</span>'+
										'</div>'+
									'</p>'+
								'</div>'+
							'</li>'
    					)
    				}
    			}
			}
			else{
				alert(ret.msg,"提示");
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
function haha(){
	var slide3 = new auiSlide({
		container : document.getElementById("aui-slide3"),
		// "width":300,
		"height" : 200,
		"speed" : 500,
		"autoPlay" : 3000, //自动播放
		"loop" : true,
		"pageShow" : true,
		"pageStyle" : 'dot',
		'dotPosition' : 'center'
	})
}
//打开新页面
function openNewWin(winName,obj,id) {
	api.openWin({
		name : winName,
		url : 'header/' + winName + '.html',
		pageParam:{
			meeting_no:$(obj).attr('id'),
			id:id
		}
	});
}


//刷新页面
function exec(){
	location.reload();
}