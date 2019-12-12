apiready=function(){

	if(api.systemType == "ios"){//兼容ios版本
		$("#indexes_right").remove();
	}
//	getPhoneBook();//获取通讯录
	$("#check_all").click(function(){//全选
		if($(this).html() == "全选"){
			$(this).html("取消");
			$("input[type='checkbox']").prop("checked",true);
		}else{
			$(this).html("全选");
			$("input[type='checkbox']").prop("checked",false);
		}
		
	})
	if(api.pageParam.type=="choice"){
		$(".di-n").removeClass("di-n");
		$("#conter").addClass("pt-70");//联系人距离顶部距离
		$("#group-search").css("top","70px");//搜索框距离顶部距离
		$("#indexes_right").addClass("top-330");//右侧索引距离顶部距离
	}
//	if(api.pageParam.id=="chat"){
//      chatgroup()
//  }	
//-----------------------------------------------------------
	get_hr_communist_list();//调用（获取党员列表）接口
}

//获取通讯录
function getPhoneBook(type,dept_no,staff_no){
	showProgress();//加载等待	
	$("#group_list").html("");
	var indexes = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	//ajax获取数据处理
	var url = localStorage.url+"Api/Hr/get_staff_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"staff_no":staff_no,
	    		"dept_no":(dept_no==undefined?api.pageParam.dept_no:dept_no),
	    		"post_no":api.pageParam.post_no
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			var list = ret.list;
    			var type="aui-checkbox"
    			if(api.pageParam.stats=="接待"){
    				type="aui-radio"
    			}
    			for(var i = 0; i < indexes.length; i++){
					$("#group_list").append('<li class="aui-list-view-cell aui-indexed-list-view-group" id="group-'+indexes[i]+'" data-group="'+indexes[i]+'">'+indexes[i]+'</li>');
				}
				for(var j = 0;j < list.length;j++){
					$("#pinyin").val(list[j].staff_name);
					var img=(list[j].staff_avatar!= null&&list[j].staff_avatar!=""&&list[j].staff_avatar.substring(0,1)!="#"?'<img class="aui-img-object aui-pull-left"width="50px" height="50px" src=\''+localStorage.url+list[j].staff_avatar+'\'/>':'<div style="background:'+list[j].staff_avatar+'" class="w-50 h-50 aui-col-xs-4 mr-15 lh-50 fcolor-white ellipsis-one bor-ra-100b text-align fsize-12">'+list[j].staff_name.substring(0,3)+'</div>')
					$("#group-"+$("#pinyin").toPinyin().substring(0,1)).after(
						'<li class="aui-user-view-cell aui-img" onclick="openNewWin(\'personalDataHeader\',\'通讯录详情\','+list[j].staff_no+',\''+list[j].is_hide+'\')">'+
							img+
			                '<div class="aui-img-body lh-50">'+
			                    '<span class="aui-text-info">'+
			                    	'<span>'+list[j].staff_name+'</span>'+
			                    	'<em class="pr-20" onclick="javascript:event.stopPropagation()"><input type="'+(api.pageParam.stats=="接待"?'radio':'checkbox')+'" value="'+list[j].staff_no+'" class=" '+type+' di-n aui-checkbox-info" name="reception"/></em>'+
			                    	'<input type="hidden" value='+(list[j].staff_avatar != null && list[j].staff_avatar != ""?""+localStorage.url+list[j].staff_avatar+"":"../../statics/public/images/res/noavatar.gif")+'>'+
			                    '</span>'+
			                '</div>'+
			      	    '</li>'
					);
				}
				$(".aui-indexed-list-view-group").each(function(){
					if($(this).next().attr("class") != "aui-user-view-cell aui-img"){
						$(this).remove();
					}
				})
				
				var userAgent = navigator.userAgent;
				var index = userAgent.indexOf("Android");
				if(index >= 0){  
					var androidVersion = parseFloat(userAgent.slice(index+8)); 
					if(androidVersion<4.4 && api.pageParam.type=="choice"){  
					// 版本小于4.4的事情 
						$(".aui-searchbar,#indexes_right").remove();
						$("em").removeClass("pr-20");
					}else{
						var indexedList = new auiIndexedList();
					}
				}
				
			}
			//判断是否存在选择功能
			if(api.pageParam.type=="choice"){
				$(".di-n").removeClass("di-n");//显示顶部导航和复选框
				var userAgent = navigator.userAgent;
				var index = userAgent.indexOf("Android");
				if(index >= 0){  
					var androidVersion = parseFloat(userAgent.slice(index+8)); 
					if(androidVersion<4.4){  
					// 版本小于4.4的事情 
						$("header").removeClass("pt-25");
						$("#conter").css("padding-top","45px");//联系人距离顶部距离
						$("#group-search").css("top","45px");//搜索框距离顶部距离
						$("#indexes_right").css("top","295px");//右侧索引距离顶部距离
					}
				}
				api.addEventListener({
				    name: 'keyback'
				}, function(ret, err){
					api.removeEventListener({
					    name: 'keyback'
					});
					api.closeWin({});
				});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//确认选择人
function confirmChoice(){
	var staff_name="";
	var staff_no="";
	var staff_url ="";
	if(api.pageParam.stats=="接待"){
		$('input[type="radio"]:checked').each(function(){
			staff_name += $(this).parent().prev().html()+",";//获取父级的上一个元素内容
			staff_no += $(this).val()+",";
		})
	}else{
		//遍历所有checkbox
		$('input[type="checkbox"]:checked').each(function(){
//			information+="{\"groupId\":\""+$(this).val()+"\",\"groupName\":\""+$(this).parent().prev().html()+"\",\"portraitUrl\":\""+$(this).parent().next().val()+"\"},"
			staff_name += $(this).parent().prev().html()+",";//获取父级的上一个元素内容
			staff_no += $(this).val()+",";
			staff_url+=$(this).parent().next().val()+",";
		})
	}
	staff_name = staff_name.substring(0,staff_name.length-1);
	staff_no = staff_no.substring(0,staff_no.length-1);
	staff_url = staff_url.substring(0,staff_url.length-1);
	//截取字符串
    api.execScript({
        name:api.pageParam.name,
        frameName:api.pageParam.frameName,
        script: 'evaluate("'+api.pageParam.id+'","'+staff_name+'","'+staff_no+'","'+staff_url+'");'
    });
    if(api.pageParam.name != "index"){
    	api.closeWin({});    
 	}
}

//修改滑动箭头
function update_arrow(is_open){
	if(is_open){
		$("#slid_img").attr("src","../../../statics/public/images/res/phoneBook_type_APP_P5.png");
	}
	else{
		$("#slid_img").attr("src","../../../statics/public/images/res/phoneBook_APP_P5.png");
	}
}

//打开新页面
function openNewWin(winName,type,id,is_hide){
	//打开新页面
	if(winName=="personalDataHeader"){
		if(is_hide==1){
			return;
		}
		api.openWin({
		    name: winName,
		    url: '../../../html/public/sys/header/'+winName+'.html',
		    pageParam:{
		    	type:type,
		    	id:id
		    }
	    });
	}
	else{
		api.openWin({
		    name: winName,
		    url: 'header/'+winName+'.html',
		    pageParam:{
		    }
	    });
    }
}

//新建群聊
function chatgroup(){
    $("#check_all").removeClass("di-n");//显示顶部导航和复选框
    $("input").removeClass("di-n");    
}

//隐藏复选框
function hideinput(){
    $("input").addClass("di-n");
    $("#check_all").addClass("di-n");
}




//获取党员列表接口------------------------------------------------------
function get_hr_communist_list(){
	var url = localStorage.url+"/index.php/Api/Hrcommunist/get_hr_communist_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "party_no":localStorage.dept_no,
	            "pagesize":"8",
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			for(var i=0;i<ret.communist_list.length;i++){
    				$('#communist_list').append(
						'<li class="pull-left w-25b pb-12em">'+
							'<img class="w-52em h-52em m-a" src='+((ret.communist_list[i].communist_avatar)?(localStorage.url+ret.communist_list[i].communist_avatar):("../../../statics/images/images_oa/oa_img_head.png"))+' alt="" />'+
							'<p class="f-12em lh-12em color-75 pt-8em text-align">'+ret.communist_list[i].communist_name+'</p>'+
						'</li>'
    				)
    			}
			}
			else{
				alert('2')
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
