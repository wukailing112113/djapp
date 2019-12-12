apiready = function(){
	getHrPartyInfo();//调用（获取党组织详情）接口
	getHrCommunistList();//调用（获取党员列表）接口
}


//打开谁是党员列表----------------------------------------
//function openPerson(){
//  api.openSlidLayout({
//		type:'left',
//		slidPane:{
//			name:'com_phonebook_right_header',
//			url:'../../sp_com/com_phonebook/header/com_phonebook_right_header.html',
//			pageParam:{
//		    	num:num,
//		    	type:type
//		    }
//		},
//		fixedPane:{
//			name:'com_phonebook_left_header',
//			url:'../../sp_com/com_phonebook/header/com_phonebook_left_header.html',
//		},
//	}, function(ret, err) {
//		
//	});
//}

//获取党组织详情接口------------------------------------------------------
function getHrPartyInfo(){
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_party_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "party_no":api.pageParam.type,//localStorage.dept_no,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#memo').html(ret.data.memo);
    			$('#communist_num').html(ret.data.communist_num);
    			$('#party_num').html(ret.data.party_num);
    			$('#integral_total').html(ret.data.integral_total);
    			$('#dues_amount').html(ret.data.dues_amount);
    			if(ret.data.meeting_list&&ret.data.meeting_list.length>0){
	    			for(var i=0;i<ret.data.meeting_list.length;i++){
	    				$('#list').append(
	    					'<li class="f-14em lh-14em pb-12em">'+
	    						'<span class="color-75 pr-10em">'+"["+ret.data.meeting_list[i].meeting_start_time.substring(0,10)+"]"+'</span>'+
	    						'<span class="color-33 pl-8em">'+ret.data.meeting_list[i].meeting_name+'</span>'+
	    					'</li>'
							
	    				)
	    			}
	    		}else{
	    			$('#list').parent().parent().addClass('di-n');
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

//获取党员列表接口------------------------------------------------------
function getHrCommunistList(){
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_communist_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "party_no":api.pageParam.type,//localStorage.dept_no,
	            "page":1,
	            "pagesize":"8",
	            "status":1,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0)
	    			for(var i=0;i<ret.data.length;i++){
	    				$('#communist_list').append(
							'<li class="pull-left w-25b pb-12em">'+
								'<img class="w-52em h-52em m-a" src="'+((ret.data[i].communist_avatar)?(localStorage.url+ret.data[i].communist_avatar):("../../../statics/images/images_oa/oa_img_head.png"))+'" alt="" />'+
								'<p class="f-12em lh-12em color-75 pt-8em text-align">'+ret.data[i].communist_name+'</p>'+
							'</li>'
	    				)
	    			}
			}
			else{
			$('.none').removeClass('di-n');
				//api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//打开谁是党员列表--------------------------------------------------------
function openPhonebookRight(nochat){
	api.openWin({
	    name: 'com_phonebook_right_header',
	    url: '../../sp_com/com_phonebook/header/com_phonebook_right_header.html',
	    pageParam:{
	    	type:api.pageParam.type,//党组织id
	    	nochat: nochat
	    }
    });
}
