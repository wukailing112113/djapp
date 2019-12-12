apiready = function(){
	var workplanDate = new Date();
//	$('#communist_no').html(localStorage.user_name);
	$('#workplanDate').html(workplanDate.getFullYear()+'-'+(workplanDate.getMonth()+1)+'-'+workplanDate.getDate())
	getBdTypeList();//调用（获取日报类型）接口
}
var selectNum = 0;

//提交通知公告接口方法---------------------------------------
function setOaWorklog(){

	if($('#worklog_title').val()==''){
		alert('请输入日报标题');
		return;
	}else if($('#worklog_summary').val()==''){
		alert('请输入日报内容');
		return;
	}else if($('#sh_list').attr('ChoosePeopleId')==''){
		alert('请选择审核人');
		return;
	}
	//获取上传列表id
	var notice_attach="";
	$("input[name='file_no']").each(function(){
		if(notice_attach==""){
			notice_attach=notice_attach+$(this).val()
		}else{
			notice_attach=notice_attach+","+$(this).val()
		}
	})
	
	var url = localStorage.url+"/index.php/Api/Oa/set_oa_worklog";
//	alert($("#workplan_list").val());
//	alert($('#sh_list').attr('ChoosePeopleId'));
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,//发起人
	            "worklog_audit_man":$('#sh_list').attr('ChoosePeopleId'),//审核人
	            "worklog_title":$('#worklog_title').val(),//标题
	            "worklog_summary":$('#worklog_summary').val(),//内容
	            "worklog_attach":notice_attach,//附件上传
	            "worklog_type":$("#workplan_list").val(),//日报类型
	            "worklog_date":$('#workplanDate').html()//日期
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
				alert('提交成功');
				api.execScript({
					name: 'oa_workplan_header',
				    frameName: 'oa_workplan',
				    script: 'exec()'
				});
				api.closeWin({});
    		}else{
    			api.toast({msg: ret.msg ,duration:3000,location: 'top'});
    		}
    	}else{
    		api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//获取日报类型列表 接口------------------------------------------------------------
function getBdTypeList(){
	var url = localStorage.url+"/index.php/Api/Public/get_bd_type_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values:{
				type_group:"worklog_type"		    	
	    	}
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			for(var i=0;i<ret.data.length;i++){
					$('#workplan_list').append(
						'<option value="'+ret.data[i].type_no+'">'+ret.data[i].type_name+'</option>'
					)
				}
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

//打开选择人页面----------------------------------------
function openPerson(num,type){
    api.openSlidLayout({
		type:'left',
		slidPane:{
			name:'oa_person_right_header',
			url:'../oa_person/header/oa_person_right_add_header.html',
			pageParam:{
		    	num:num,
		    	type:type,
		    	workplan_type:'workplan_type'
		    }
		},
		fixedPane:{
			name:'oa_person_left_header',
			url:'../oa_person/header/oa_person_left_add_header.html',
		},
	}, function(ret, err) {
		
	});
}


//获取选择人方法-----------------------------------------
function ChoosePeople(num,name,id){
	$('#sh_list').html(
		'<li class="pull-left mr-20em lh-45em" onclick="openPerson(0,\'oa_workplan_edit\')">'+
			'<i class="pull-left w-38em h-38em iconfont f-35em color-99 bor-ra-100b mb-8em">&#xe88e;</i>'+
			'<p class="f-12em lh-12em color-99 text-align">添加人员</p>'+
		'</li>'
	);
	var nameData = name.split('   ');
	for(var i=0;i<nameData.length-1;i++){
		$('#sh_list').prepend(
			'<li class="pull-left mr-20em">'+
				'<img class="w-38em h-38em bor-ra-100b mb-8em" src="../../../statics/images/images_oa/oa_img_head.png" alt="" />'+
				'<p class="f-12em lh-12em color-99 text-align">'+nameData[i]+'</p>'+
			'</li>'
		)
	}
	$('#sh_list').attr('ChoosePeopleId',id);
}

//---------------------
//var documentDate = new Date();
//documentDate.getFullYear();    //获取完整的年份(4位,1970-????)
//documentDate.getMonth();       //获取当前月份(0-11,0代表1月)
//documentDate.getDate();        //获取当前日(1-31)