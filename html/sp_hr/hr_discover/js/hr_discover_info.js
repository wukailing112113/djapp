apiready = function(){
	getHrCommunistInfo();//调用（获取党员发展全纪实详情）接口
}

//获取党员发展全纪实详情接口--------------------------------------------
function getHrCommunistInfo(){
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_communist_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":api.pageParam.id,//党员编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#communist_name').html(clearNull(ret.data.communist_name,'无'));//姓名
    			$('#communist_avatar').attr('src',((ret.data.communist_avatar)?(localStorage.url+ret.data.communist_avatar):("../../../statics/public/aui2/img/dl-icon.png")));//头像
    			$('#communist_birthday').html(clearNull(ret.data.communist_birthday,'0'));//出生日期
    			$('#status').html(clearNull(ret.data.status,'暂无'));//状态
    			$('#time').html(clearNull(ret.data.time,'0').substring(0,10));//状态改变时间
    			$('#communist_idnumber').html(clearNull(ret.data.communist_idnumber,'0'));//身份证号
	    		if(ret.data.log_list&&ret.data.dev_log_list.length>0){
	    			for(var i=0;i<ret.data.dev_log_list.length;i++){
	    				if(i%2==0){
		    				$('#list').append(
			    				'<li class="di-b over-h">'+
				                   '<div class="w-50b pull-right po-re pb-25em">'+
				                   		'<img class="po-ab wh-24em left-12mem top-0" src="../../../statics/images/images_edu/edu_notes_time.png" alt="" />'+
				                      	'<p class="f-15em lh-24em color-33 pl-20em">'+clearNull(ret.data.dev_log_list[i].log_content,'无')+'</p>'+
//			                    	  	'<p class="f-15em lh-15em color-99 mt-4em pl-20em"><span class="color-ffb767 mr-8em">积极分子</span><span>备注:积极</span></p>'+
				                   '</div>'+
				                '</li>'	
			    			)
	    				}else{
	    					$('#list').append(
			    				'<li class="di-b over-h">'+
				                   '<div class="w-50b pull-left po-re pb-25em text-r">'+
										'<img class="po-ab wh-24em right-12mem top-0" src="../../../statics/images/images_edu/edu_notes_time.png" alt="" />'+
				                      	'<p class="f-15em lh-24em color-33 pr-20em">'+clearNull(ret.data.dev_log_list[i].log_content,'无')+'</p>'+
//			                   		   	'<p class="f-15em lh-15em color-99 mt-4em pr-20em"><span>备注:积极</span><span class="color-ffb767 ml-8em">积极分子</span></p>'+
				                   '</div>'+
				                '</li>'	
			    			)
	    				}
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