apiready = function(){
	get_cust_contact_info();
	
//  if(api.pageParam.type=="添加商机"){
//      $("#business").removeClass("di-n");
//  }else if(api.pageParam.type=="类型"){
//      $("#type").removeClass("di-n");
//  }else{
//      $("#connect").removeClass("di-n");
//  }
}
//获取客户联系人详情
function get_cust_contact_info(){
	showProgress();//加载等待   
	var url = localStorage.url+"Api/Crm/get_cust_contact_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "custcontact_no":api.pageParam.id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$("#portrait").html(ret.custcontact_name.substring(ret.custcontact_name.length-2,ret.custcontact_name.length));
    			$("#custcontact_name").html("姓名："+ret.custcontact_name);
    			$("#custcontact_post").html("职务："+ret.custcontact_post);
    			$("#custcontact_addr").html("地址："+ret.custcontact_addr);
    			$("#custcontact_mobile").html(ret.custcontact_mobile);
    			$("#custcontact_email").html(ret.custcontact_email);
    			$("#custcontact_im").html(ret.custcontact_im);
    			$("#portrait").show();
			}
			else{
				$aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
//保存修改
function save(){
    api.closeWin();
}

function editperson(){
    //选择上传类型
    api.actionSheet({
        buttons: ['修改','删除']
    },function( ret, err ){
        if(ret.buttonIndex == 1){
            openNewWin('customer_contact_editHeader','联系人');
        }
        else if(ret.buttonIndex == 2){
            $aui.alert({
                title:'',
                content:'确认删除该联系人',
                buttons:['确定','关闭'],
            },function(ret){
                //处理回调函数
                if(ret){
                   if(ret==0){
                   		showProgress();//加载等待   
						var url = localStorage.url+"Api/Crm/del_cust_contact";
						api.ajax({
						    url:url,
						    method: 'post',
						    timeout: 100,
						    data: {//传输参数
						    	values: { 
						            "custcontact_no":api.pageParam.id
						        }
						    }
					    },function(ret,err){
					    	if(ret){
					    		if(ret.status==1){
					    			$aui.alert({title:'提示',content:"删除成功",buttons:['确定']},function(ret){
					    				 api.execScript({
						    				name:"customer_infoHeader",
						    				frameName:"customer_info",
							                script: 'exec();'
						                });
					    				api.closeWin({});
					    			});
								}
								else{
									$aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
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
            })
        }
    });
}

function callphone(){
    //选择上传类型
    api.actionSheet({
        buttons: ['拨打电话']
    },function( ret, err ){
        if(ret.buttonIndex == 1){
            callTel($('#phone').html());
        }
    });
}

//打开新页面
function openNewWin(winName,type){
    api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
            "type":type,
            "custcontact_no":api.pageParam.id
        }
    });
}

//打电话
function callTel(phone){
    api.call({
        number:phone
    });
}
//刷新页面
function exec(){
	 location.reload();
}