apiready = function(){
	getHrPartyList();//调用（获取一级部门列表接口）
}

//获取一级部门列表接口------------------------------------------------------------------
function getHrPartyList(){
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_party_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values:{
	    		party_pno:0,
	    		is_all:1
	    	}
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
    				for(var i=0;i<ret.data.length;i++){
    					$("#first_list").append(
    						'<li class="first" onclick="selectFirst(this,'+ret.data[i].party_no+')">'+
								'<div><i class="iconfont first_icon">&#xe890;</i><p>'+ret.data[i].party_name+'</p></div>'+
								'<ul class="second_list"></ul>'+
							'</li>'
    					)
    				}
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

//四级（以内）点击效果-----------------------------------------------------
//$('.third').find('ul').hide();
//$('.second').find('ul').hide();
//$('.first').find('ul').hide();

//点击调用二级部门列表接口--------------------------------------------------------------
function selectFirst(This,pno){//This:指定选中项;pno:父级编号;
	//调用选择人员页面获取人员列表方法
	api.execScript({
		name: 'com_phoneBook_right_header',
		frameName: 'com_phonebook_right',
        script: 'tabCommunistList('+pno+');'
	});
	//判断此部门下是否有内容，有内容时点击使其清空;无内容时添加内容
	if($(This).find('.second_list').html()!=''&&$(This).find('.second_list').html()!=null&&$(This).find('.second_list').html()!=' '){
		$(This).removeClass('select_first').find('.second_list').html('');//清除选中项的选中类并清空下级内容
		$(This).find('.first_icon').html('&#xe890;');//改变选中选中项的选中标识
	}else{
		$('.first').removeClass('select_first').find('.second_list').html('');//清除所有一级项的选中类并清空下级内容
		$('.first').find('.first_icon').html('&#xe890;');//改变所有一级项的选中标识
		$(This).addClass('select_first');//对选中项赋予选中类
		$(This).find('.first_icon').html('&#xe9ad;');//将选中项改成选中标识
		$('.second').removeClass('select_second').find('.third_list').html('');//清除所有二级项的选中类并清空下级内容
		$('.third').removeClass('select_third').find('.fourth_list').html('');//清除所有三级项的选中类并清空下级内容
		//调用ajax方法获取后台数据
		var url = localStorage.url+"/index.php/Api/Hr/get_hr_party_list";
		api.ajax({
		    url:url,
		    method: 'post',
		    timeout: 100,
		    data: {//传输参数
		    	values:{
		    		party_pno:pno,//父级编号
	    			is_all:1
		    	}
		    }
	    },function(ret,err){
	    	if(ret){
	    		if(ret.status==1){
	    			if(ret.data&&ret.data.length>0){
	    				for(var i=0;i<ret.data.length;i++){
	    					$(This).find('.second_list').append(
								'<li class="second" onclick="selectSecond(this,'+ret.data[i].party_no+')">'+
									'<div><i class="iconfont second_icon">&#xe82d;</i><p>'+ret.data[i].party_name+'</p></div>'+
									'<ul class="third_list"></ul>'+
								'</li>'
	    					)
	    				}
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
}
function selectSecond(This,pno,e){//This:指定选中项;pno:父级编号;e:阻止事件冒泡
	//阻止事件冒泡
	var evt = e ? e : window.event;
	if (evt.stopPropagation){//W3C 
		evt.stopPropagation();
	}else{//IE      
		evt.cancelBubble = true;
	}
	//调用选择人员页面获取人员列表方法
	api.execScript({
		name: 'com_phoneBook_right_header',
		frameName: 'com_phonebook_right',
        script: 'tabCommunistList('+pno+');'
	});
	//判断此部门下是否有内容，有内容时点击使其清空;无内容时添加内容
	if($(This).find('.third_list').html()!=''&&$(This).find('.third_list').html()!=null&&$(This).find('.third_list').html()!=' '){
		$(This).removeClass('select_second').find('.third_list').html('');//清除选中项的选中类并清空下级内容
	}else{
		$('.second').removeClass('select_second').find('.third_list').html('');//清除所有二级项的选中类并清空下级内容
		$(This).addClass('select_second');//对选中项赋予选中类
		$('.third').removeClass('select_third').find('.fourth_list').html('');//清除所有三级项的选中类并清空下级内容
		//调用ajax方法获取后台数据
		var url = localStorage.url+"/index.php/Api/Hr/get_hr_party_list";
		api.ajax({
		    url:url,
		    method: 'post',
		    timeout: 100,	
		    data: {//传输参数
		    	values:{
		    		party_pno:pno,
		    		is_all:1
		    	}
		    }
	    },function(ret,err){
	    	if(ret){
	    		if(ret.status==1){
	    			if(ret.data&&ret.data.length>0){
	    				for(var i=0;i<ret.data.length;i++){
	    					$(This).find('.third_list').append(
								'<li class="third" onclick="selectThird(this,'+ret.data[i].party_no+')">'+
									'<div><p>'+ret.data[i].party_name+'</p><i class="iconfont third_icon">&#xe890;</i></div>'+
									'<ul class="fourth_list"></ul>'+
								'</li>'
	    					)
	    				}
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
}

function selectThird(This,pno,e){
	//阻止事件冒泡
	var evt = e ? e : window.event;
	if (evt.stopPropagation){//W3C 
		evt.stopPropagation();
	}else{//IE      
		evt.cancelBubble = true;
	}
	//调用选择人员页面获取人员列表方法
	api.execScript({
		name: 'com_phoneBook_right_header',
		frameName: 'com_phonebook_right',
        script: 'tabCommunistList('+pno+');'
	});
	//判断此部门下是否有内容，有内容时点击使其清空;无内容时添加内容
	if($(This).find('.fourth_list').html()!=''&&$(This).find('.fourth_list').html()!=null&&$(This).find('.fourth_list').html()!=' '){
		$(This).removeClass('select_third').find('.fourth_list').html('');//清除选中项的选中类并清空下级内容
		$(This).find('.third_icon').html('&#xe890;');//改变选中选中项的选中标识
	}else{
		$('.third').removeClass('select_third').find('.fourth_list').html('');//清除所有三级项的选中类并清空下级内容
		$('.third').find('.third_icon').html('&#xe890;');//改变所有三级项的选中标识
		$(This).addClass('select_third');//对选中项赋予选中类
		$(This).find('.third_icon').html('&#xe9ad;');//将选中项改成选中标识
		//调用ajax方法获取后台数据
		var url = localStorage.url+"/index.php/Api/Hr/get_hr_party_list";
		api.ajax({
		    url:url,
		    method: 'post',
		    timeout: 100,
		    data: {//传输参数
		    	values:{
		    		party_pno:pno,
		    		is_all:1
		    	}
		    }
	    },function(ret,err){
	    	if(ret){
	    		if(ret.status==1){
	    			if(ret.data&&ret.data.length>0){
	    				for(var i=0;i<ret.data.length;i++){
	    					$(This).find('.fourth_list').append(
								'<li class="fourth" onclick="selectFourth(this,'+ret.data[i].party_no+')">'+
									'<div><p>'+ret.data[i].party_name+'</p></div>'+
								'</li>'
	    					)
	    				}
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
}
function selectFourth(This,pno,e){
	//阻止事件冒泡
	var evt = e ? e : window.event;
	if (evt.stopPropagation){//W3C 
		evt.stopPropagation();
	}else{//IE      
		evt.cancelBubble = true;
	}
	//调用选择人员页面获取人员列表方法
	api.execScript({
		name: 'com_phoneBook_right_header',
		frameName: 'com_phonebook_right',
        script: 'tabCommunistList('+pno+');'
	});
	$('.fourth').removeClass('selected_fourth');//清除所有四级项的选中类
	$(This).addClass('selected_fourth');//对选中项赋予选中类
}