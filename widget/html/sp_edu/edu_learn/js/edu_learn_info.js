apiready=function(){
	getEduMaterialInfo();//调用（获取文章资料详情）接口
	//接收监听
  	api.addEventListener({
           name: 'myEvent_learn_info'
       }, function(ret, err) {
           if (ret.value.state == 'no') {
               exec();
           }
       });
}
var video_time;
var ID;
var num;
//获取文章资料详情 接口--------------------------------------------------------------------------------
function getEduMaterialInfo(){
//alert(api.pageParam.type)
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_material_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"communist_no":localStorage.user_id,
	    		"material_id":api.pageParam.type,//文章id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#material_title').html(ret.data.material_title);//标题
    			$('#material_desc').html(clearNull(ret.data.material_desc,'无'));//摘要
    			$('#add_time').html(ret.data.add_time.substring(0,16));//时间
    			$('#add_type').html(ret.data.material_topic.substring(0,10));//类型
    			$('#add_communist').html(ret.data.add_staff);//发布人
    			$('#material_content').html(ret.data.material_content);//内容
    			$('#people_no').html(ret.data.log_list_count);//共多少人浏览
    			//浏览人头像
    			if(ret.data.log_list){
    				for(var i=0;i<ret.data.log_list.length;i++){
    				if(i<=2){
    					$('#people_head').append(
    					'<img class="w-22em h-22em over-h di-i bor-ra-50b" src='+((ret.data.log_list[i].communist_avatar!=null)?(localStorage.url+ret.data.log_list[i].communist_avatar):"../../../statics/images/images_oa/oa_img_head.png")+'>'
    					
    					)
    				}
    					
    				}
    			}
    			
    			//文章详情中两条内容    			
    			if(ret.data.notes_list){
    				for(var i=0;i<ret.data.notes_list.length;i++){
    				if(i==0){
    					$('#list1').append(
    					 	'<li class="border-3em-de pt-12em pb-5em" onclick="openScene_infowin(\'edu_notes_info_header\','+ret.data.notes_list[i].notes_id+')">'+
    					 	 
    					 		'<div class="clearfix">'+
    					 		'<div class="pull-left f-12em color-66 ">'+ret.data.notes_list[i].add_staff+'</div>'+
    					 			'<div class="pull-right f-12em color-66 ">'+ret.data.notes_list[i].add_time+'</div>'+
    					 		
    					 		'</div>'+
    					 		 '<div class="f-15em color-21 pt-8em ">'+InterceptField(ret.data.notes_list[i].notes_content,'无',20)+
    					 		'<span class="f-12em color-d4a500">'+"&nbsp;&nbsp;[详情]"+'</span>'+
    					 		'</div>'+  					 	
    					 	'</li>'
    					 )
    				}else if(i==1){
    					$('#list1').append(
    					 	'<li class="border-3em-de pt-12em pb-5em" onclick="openScene_infowin(\'edu_notes_info_header\','+ret.data.notes_list[i].notes_id+')">'+
    					 	  
    					 		'<div class="clearfix">'+
    					 		'<div class="pull-left f-12em color-66 ">'+ret.data.notes_list[i].add_staff+'</div>'+
    					 			'<div class="pull-right f-12em color-66 ">'+ret.data.notes_list[i].add_time+'</div>'+
    					 		
    					 		'</div>'+
    					 		'<div class="f-15em color-21 pt-8em ">'+InterceptField(ret.data.notes_list[i].notes_content,'无',20)+
    					 		'<span class="f-12em color-d4a500">'+"&nbsp;&nbsp;[详情]"+'</span>'+
    					 		'</div>'+ 
    					 		 					 	
    					 	'</li>'
    					 )
    				}else{
    					$('#list1').append(
    					 	'<li class="border-3em-de show_more pt-12em pb-5em" onclick="openScene_infowin(\'edu_notes_info_header\','+ret.data.notes_list[i].notes_id+')">'+
    					 	
    					 		'<div class="clearfix">'+
    					 		'<div class="pull-left f-12em color-66 ">'+ret.data.notes_list[i].add_staff+'</div>'+
    					 			'<div class="pull-right f-12em color-66 ">'+ret.data.notes_list[i].add_time+'</div>'+
    					 		
    					 		'</div>'+
    					 		'<div class="f-15em color-21 pt-8em ">'+InterceptField(ret.data.notes_list[i].notes_content,'无',20)+
    					 		'<span class="f-12em color-d4a500">'+"&nbsp;&nbsp;[详情]"+'</span>'+
    					 		'</div>'+    					 	
    					 	'</li>'
    					 )
    				}
    				
    					 
    				}
    			}
    			
    			if(ret.data.notes_list==''){
    				$("#list1").hide();
    			}else{
    				$("#list1").show();
    			} 
    			//判断是否展开学习笔记
    			if($('#list1 li').hasClass("show_more")){
    				$(".show_more").hide();
    			}    			
    			if($('#list1 li').length>2){
    				$("#showMore").show();
    			}else{
    				$("#showMore").hide();
    			}
    			$("#showMore").click(function(){
    				$(".show_more").show();
    				$("#showMore").hide();
    			})
    			
    			
    			video_time=(ret.data.material_duration)*60000;    			
    			ID=ret.data.material_id;
    			start();
    			//读取附件列表
                if(ret.data.material_attach!=null){
                    $("#whole").val(ret.data.material_attach);
                    material_attach = ret.data.material_attach.split("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
                    for(var i=0;i<material_attach.length;i++){
                        $('#material_attach').append(
                            '<div class="b-1-dfdfdf p-12em bg-color-fcfdfe over-h mb-12em" onclick="openEnqueue(\''+localStorage.url+material_attach[i]+'\')">'+
                                '<div class="pull-left pr-12em">'+
                                    '<img class="w-35em h-35em" src="../../../statics/images/images_oa/oa_img_doc.png" alt="" />'+
                                '</div>'+
                                '<div class="pull-left">'+
                                    '<p class="f-15em color-b3">'+material_attach[i].split('/')[(material_attach[i].split('/').length-1)]+'</p>'+
                                '</div>'+
                            '</div>'
                        )
                    }
                }else{
                	$('#material_attach').hide();
                }
                
    			$('#set_edu_notes').click(function(){
    				set_edu_notes(ret.data.material_id);
    			})
    			setTimeout(function(){
    				set_integral(1);
    				
    			},video_time)
			}
			else{
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


//提交学习心得-------------------------------------------------------------------
function set_edu_notes(type){
	showProgress();//加载等待
	localStorage.topic_type
	var notice_attach="";
	$("input[name='file_no']").each(function(){
	if(notice_attach==""){
		notice_attach=notice_attach+$(this).val()
	}else{
		notice_attach=notice_attach+","+$(this).val()
		}
	})
	
	var url = localStorage.url+"/index.php/Api/Edu/set_edu_notes";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: {
	    		"communist_no":localStorage.user_id,
	    		"material_id":type,//文章id或视频id
	    		"topic_type":localStorage.topic_type,
	    		"notes_title":"学习了"+$('#material_title').html(),//笔记标题
	    		"notes_content":$('#notes_content').val(),//笔记内容
	    		"notes_type":'1',//笔记类型
	    		"notes_thumb":notice_attach,//图片
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    		//发送监听
	         api.sendEvent({
	               name: 'myEvent_learn_info',
	               extra: {
	                   state: 'no'
	               }
	           });       			
    			$('#notes_content').val('');
    			$('#add_upload_list').html('');
    			alert('提交成功');
			}
			else{
			alert("请填写笔记内容!");
				//alert(ret.msg,"提示");
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//下载全部附件-----------------------------------------------------------------------------
function foreach_file(){
	var file=$("#whole").val().split("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
    //阻止事件冒泡
    $("#download").mousedown(function(event){
        event.stopPropagation();
    });
    if(file.length>1){
       for(var i=0;i<file.length;i++){
            openEnqueue(''+file[i]+'');
        }
        openManagerView() 
    }else{
        openEnqueue(''+file[0]+'');
        openManagerView()
    }
}


var interval = null;//计时器
var i = 0;
function start(){//启动计时器函数
	if(interval!=null){//判断计时器是否为空
		clearInterval(interval);
		interval=null;
	}
	interval = setInterval(overs,1000);//启动计时器，调用overs函数，
}

function overs(){
	i++;
	if(i==video_time){
		stop();
		set_integral()

	}
}

//加积分-------------------------------------------------------------------
function set_integral(type){
	var url = localStorage.url+"/Api/Edu/set_integral";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"communist_no":localStorage.user_id,
	    		"material_id":ID, //Id
	    		"material_type":type,//1 文章  2 视频
	    		"task_id":api.pageParam.id,
	    		
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    		//1看过
    		if(ret.data.is_has==1){
    			alert("您今天已经看过此文章，请浏览其他文章获得积分!")
    		}else{
    			alert('获得'+ret.data.integral_article+'积分');
    			//发送监听
			     api.sendEvent({
				 name: 'myEvent_xw1',
				 extra: {
					     state: 'no'
					    }
					});
    			
    			//api.toast({msg: '获得'+ret.data.integral_article+'积分' ,duration:3000,location: 'top'});
    		}
				
				
			}
			else{
//				api.toast({msg: ret.msg ,duration:3000,location: 'top'});	
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}


//遮罩层--------------------------------------------------------
$("#edu_article_input").focus(function(){
 $(".edu_article_mask").removeClass("di-n");
 $(this).hide();
});
//关闭遮罩层
$(".mask_close").click(function(){
	//api.closeWin({});
	 $(".edu_article_mask").addClass("di-n");
	 $("#edu_article_input").show();
});

//打开已学习文章人员
function open_learn_look(winName,type){
	api.openWin({
        name: winName,
        url: './header/'+winName+'.html',
        pageParam:{
        	type:api.pageParam.type
        }
    });
}
//刷新页面---------------------------------------------------------------------------------
function exec(){
	location.reload();
}
//打开学习笔记页面-------------------------------------------------------------
function openScene_infowin(winName,type){
	api.openWin({
		name: winName,
		url: '../edu_notes/header/' + winName + '.html',
		pageParam:{
			type:type,
		}
	})
}








