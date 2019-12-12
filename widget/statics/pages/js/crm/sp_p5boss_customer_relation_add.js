//刷新
function exec(){
	location.reload();
}

//页面初始化
apiready=function(){
	get_cust_contact_list();//获取联系人列表数据
	get_cust_business_list();//获取商机列表
	get_cust_communication_list();//获取预约列表
}

//获取联系人列表
function get_cust_contact_list(){
	//ajax获取数据处理
	var url = localStorage.url+"Api/Crm/get_cust_contact_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 500,
	    data: {//传输参数
	    	values: { 
	    		"cust_no":api.pageParam.cust_no//客户编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
				$("#custcontact_name").html(ret.contact_list[0].custcontact_name);//联系人
    			$("#custcontact_post").html(ret.contact_list[0].custcontact_post);//职务
    			$("#custcontact_addr").html(ret.contact_list[0].custcontact_addr);//地址
    			$("#custcontact_mobile").html(ret.contact_list[0].custcontact_mobile);//手机
    			$("#custcontact_tel").html(ret.contact_list[0].custcontact_tel);//联系电话
    			$("#custcontact_im").html(ret.contact_list[0].custcontact_im);//qq
    			$("#custcontact_email").html(ret.contact_list[0].custcontact_email);//邮箱
    			$("#contacts").attr("onclick","openNewWin('customer_contact_editHeader',"+ret.contact_list[0].custcontact_no+")");
	    		
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//获取商机列表
function get_cust_business_list(){
	//ajax获取数据处理
	var url = localStorage.url+"Api/Crm/get_cust_business_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 500,
	    data: {//传输参数
	    	values: { 
	    		"cust_no":api.pageParam.cust_no,//客户编号
	    		"psge":1,
	    		"pagesize":9999999
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			for(var i = 0; i < ret.business_list.length; i++){
    				$("#business_list").prepend(
	    				'<div class="pl-10 pr-10 bg-color-gray2 bor-ra-8 mb-15" onclick="openNewWin(\'business_editHeader\',\''+ret.business_list[i].business_no+'\')">'+
	                        '<li>'+
	                            '<div>名称：<span class="aui-pull-right lh-24 mr-15 fsize-12 fcolor-99">'+ret.business_list[i].business_name+'</span></div>'+
	                        '</li>'+
	                        '<li>'+
	                            '<div>联系人：<span class="aui-pull-right lh-24 mr-15 fsize-12 fcolor-99">'+ret.business_list[i].business_contact+'</span></div>'+
	                        '</li>'+
	                    '</div>'
	    			);
    			}
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//获取预约列表
function get_cust_communication_list(){
	//ajax获取数据处理
	var url = localStorage.url+"Api/Crm/get_cust_communication_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 500,
	    data: {//传输参数
	    	values: { 
	    		"cust_no":api.pageParam.cust_no,//客户编号
	    		"page":1,
	    		"pagesize":9999
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			for(var i = 0; i < ret.list.length; i++){
    				$("#order_list").prepend(
	    				'<div class="pl-10 pr-10 bg-color-gray2 bor-ra-8 mb-15" onclick="openNewWin(\'customer_public_editHeader\','+ret.list[i].commu_id+')">'+
	                        '<li>'+
	                            '<div>时间：'+
	                                '<span class="aui-pull-right lh-24 mr-15 fsize-12 fcolor-99">'+ret.list[i].commu_time+'</span>'+
	                            '</div>'+
	                        '</li>'+
	                        '<li>'+
	                            '<div>类型：'+
	                                '<span class="aui-pull-right lh-24 mr-15 fsize-12 fcolor-99">'+ret.list[i].commu_type_name+'</span>'+
	                            '</div>'+
	                        '</li>'+
	                        '<li>'+
	                            '<div>状态：'+
	                                '<span class="aui-pull-right lh-24 mr-15 fsize-12 fcolor-99">'+ret.list[i].status_name+'</span>'+
	                            '</div>'+
	                        '</li>'+
	                        '<li>'+
	                            '<div>沟通人：'+
	                                '<span class="aui-pull-right lh-24 mr-15 fsize-12 fcolor-99">'+ret.list[i].commu_man_name+'</span>'+
	                            '</div>'+
	                        '</li>'+
	                        '<li>'+
	                            '<div>对接人：'+
	                                '<span class="aui-pull-right lh-24 mr-15 fsize-12 fcolor-99">'+ret.list[i].reception_man_name+'</span>'+
	                            '</div>'+
	                        '</li>'+
	                        '<li>'+
	                            '<div>说明：'+
	                            '</div>'+
	                        '</li>'+
	                        '<li>'+
	                            '<div class="lh-24 fsize-12 fcolor-99 ti-2">'+
	                                ret.list[i].commu_content+
	                            '</div>'+
	                        '</li>'+
	                    '</div>'
	    			);
    			}
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
//切换下拉及加载数据
function dropDownSwitch(obj){
    if($(obj).attr("id") == "connect"){
        list_id = "contacts";
    }else if($(obj).attr("id") == "business"){
        list_id = "business_list";
    }else if($(obj).attr("id") == "order"){
        list_id = "order_list";
    }else{
        list_id = "more_list";
    }       
    //切换当前分类显示与隐藏
    $(obj).addClass("aui-fold-active");
    $(obj).siblings("li").removeClass("aui-fold-active");
    
    $("#"+list_id).parents(".aui-fold-content").slideToggle(function(){
        if ($(this).is(':hidden')) {
            $(obj).removeClass("aui-fold-active");
            $(obj).find("i").html("&#xe61b;");
        }else{
        	$(obj).find("i").html("&#xe6fe;");
        }
    });
}

//打开新页面
function openNewWin(winName,custcontact_no){
    api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
        	"cust_no":api.pageParam.cust_no,//客户编号
            "custcontact_no":custcontact_no,//联系人编号（也可用于商机编号）
            "commu_id":custcontact_no,//预约id
            "type":"沟通"//烦人的沟通页面用于标识模块
        }
    });
}