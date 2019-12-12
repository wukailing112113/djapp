apiready = function(){
    get_custome_info();//获取客户详情
    showProgress();//加载等待   
}
function exec(){
	 location.reload();
}
//获取客户基本信息
function get_custome_info(){
	var url = localStorage.url+"Api/Crm/get_cust_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "cust_no":api.pageParam.id,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$("#cust_name").html(ret.cust_name)
    			$("#type_name").html(ret.type_name);
    			$("#cust_addr").html(ret.cust_addr==null?"无地址":ret.cust_addr);
    			get_cust_contact_list();//获取客户联系人
    			get_cust_business_list()//获取商机列表
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
//获取客户联系人
function get_cust_contact_list(){
	var url = localStorage.url+"Api/Crm/get_cust_contact_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "cust_no":api.pageParam.id,
	        }
	    }
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				$("#contact_list").prev().addClass(" lh-50");
				for(var i=0;i<ret.contact_list.length;i++){
					var name=ret.contact_list[i].custcontact_name
					$("#contact_list").append(
						'<div class="aui-flex-item-4 aui-text-center" onclick="openNewWin(\'customer_contact_infoHeader\',\'联系人\','+ret.contact_list[i].custcontact_no+')">'+
                       	 	'<div class="w50 h50 lh-50 fcolor-white ellipsis-one bor-ra-100b text-align aui-bg-info">'+(name!=null?name.substring(name.length-2,name.length):"")+'</div>'+
                    	'</div>'
					)
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
//获取商机列表
function get_cust_business_list(){
	var url = localStorage.url+"Api/Crm/get_cust_business_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"type":1,
				"cust_no":api.pageParam.id
			}
		}
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
		    	for(var i=0;i<ret.business_list.length;i++){
  				$("#cust_business").append(
  					'<ul class="aui-list-view" onclick="dropDownSwitch(this)">'+
				    		'<li class="aui-list-view-cell">'+
								'<i class="aui-iconfont bg-color-aqua iconfont fsize-14">&#xe698;</i>'+
				    			''+ret.business_list[i].business_no+'商机'+
				    			'<span class="iconfont fsize-14 aui-pull-right">&#xe61b;</span>'+
				    		'</li>'+
				    	'</ul>'+ 
						'<ul class="aui-list-view mb-0 ml-15 mr-15'+(i != 0?" di-n":"")+'">'+
				            '<li class="aui-list-view-cell">'+
				                '<div>'+
				                    '<span>商机名称</span>'+
				                    '<span class="fsize-14 aui-text-info ml-20">'+ret.business_list[i].business_name+'</span>'+
				                '</div>'+
				            '</li>'+
				            '<li class="aui-list-view-cell">'+
				                '<div>'+
				                    '<span>商机状态</span>'+
				                    '<span id="business_status" class="fcolor-link ml-20">'
				                    +(ret.business_list[i].status==1?"沟通":ret.business_list[i].status==2?"合作":ret.business_list[i].status==3?"完成":ret.business_list[i].status==4?"终止":ret.business_list[i].status==5?"被抢单":"删除")+'</span>'+
				                    '<div class="aui-btn aui-pull-right ptb_3lr_5"onclick="edit('+ret.business_list[i].business_no+')">终止</div>'+
//				                    '<i class="iconfont aui-pull-right mt-5 fsize-12">&#xe659;</i>'+
				                '</div>'+
				            '</li>'+
				            '<li class="aui-list-view-cell" onclick="openNewWin(\'customer_contact_infoHeader\',\'联系人\','+ret.business_list[i].business_contact+')">'+
				                '<span class="aui-pull-left">联系人&nbsp&nbsp&nbsp</span>'+
				                '<span class="ml-20 fcolor-cc">'+ret.business_list[i].business_contact_name+'</span>'+
//				                '<div class="aui-flex-col pl-15 pr-15">'+
//				                	'<div class="aui-flex-item-4 aui-text-center" onclick="openNewWin(\'customer_contact_infoHeader\',\'联系人\','+ret.business_list[i].business_contact+')">'+
//			                       	 	'<div class="w50 h50 lh-50 fcolor-white ellipsis-one bor-ra-100b text-align aui-bg-info">'+(ret.business_list[i].business_contact_name!=null?ret.business_list[i].business_contact_name.substring(ret.business_list[i].business_contact_name.length-2,ret.business_list[i].business_contact_name.length):"")+'</div>'+
//			                    	'</div>'+
//				                '</div>'+                
				            '</li>'+
				            '<li class="aui-list-view-cell">'+
			                    '<div><i class="iconfont fcolor-cc fsize-16">&#xe611;</i>简介内容</div>'+
			                    '<div class="ti-2 fcolor-a9 fsize-13">'+(ret.business_list[i].business_content==null?"":ret.business_list[i].business_content)+'</div>'+
				            '</li>'+
				            '<ul class="aui-list-view">'+
				            	//报价
				            	'<li id="price" class="aui-user-view-cell aui-fold" onclick="dropDownSwitch(this)">'+
				                    '<div><i class="iconfont fcolor-cc fsize-16">&#xe6f2;</i>报价'+
										'<span class="iconfont fsize-14 aui-pull-right">&#xe61b;</span>'+
				                    '</div>'+
				                '</li>'+
				                '<div class="aui-fold-content w-all di-n m-0 p-0 aui-border-b">'+
				                    '<ul id="price_list'+i+'" class="aui-list-view lh-30 fsize-14 pl-5 pr-5">'+
				                    	'<div class="aui-col-xs-12 center-text p-15">'+
					                        '<div class="aui-btn aui-btn-info padding-btn bor-ra-0" onclick="openNewWin(\'customer_public_editHeader\',\'报价\','+ret.business_list[i].business_no+')">添加</div>'+
					                    '</div>'+    
				                    '</ul>'+
				                '</div>'+ 
				                //报备
				                 '<li id="record" class="aui-user-view-cell aui-fold" onclick="dropDownSwitch(this)" data="slide">'+
				                    '<div><i class="iconfont fcolor-cc fsize-16">&#xe6f5;</i>报备'+
										'<span class="iconfont fsize-14 aui-pull-right">&#xe61b;</span>'+
				                    '</div>'+
				                '</li>'+
				                '<div class="aui-fold-content w-all di-n m-0 p-0 aui-border-b">'+
				                    '<ul id="record_list'+i+'" class="aui-list-view lh-30 fsize-14 pl-5 pr-5">'+
				                    	'<div class="aui-col-xs-12 center-text p-15">'+
					                        '<div class="aui-btn aui-btn-info padding-btn bor-ra-0" onclick="openNewWin(\'customer_public_editHeader\',\'报备\','+ret.business_list[i].business_no+')">添加</div>'+
					                    '</div>'+
				                    '</ul>'+
				                '</div>'+
				                //沟通
				                '<li id="connect" class="aui-user-view-cell aui-fold" onclick="dropDownSwitch(this)" data="slide">'+
				                    '<div><i class="iconfont fcolor-cc fsize-16">&#xe6c2;</i>沟通'+
										'<span class="iconfont fsize-14 aui-pull-right">&#xe61b;</span>'+
				                    '</div>'+
				                '</li>'+
				                '<div class="aui-fold-content w-all di-n m-0 p-0 aui-border-b">'+
				                    '<ul id="connect_list'+i+'" class="aui-list-view lh-30 fsize-14 pl-5 pr-5">'+
				                    	'<div class="aui-col-xs-12 center-text p-15">'+
				                            '<div class="aui-btn aui-btn-info padding-btn bor-ra-0" onclick="openNewWin(\'customer_public_editHeader\',\'沟通\','+ret.business_list[i].business_no+')">添加</div>'+
				                        '</div>'+
				                    '</ul>'+
				                '</div>'+
				                //合同
				                '<li id="contract" class="aui-user-view-cell aui-fold" onclick="dropDownSwitch(this)" data="slide">'+
				                    '<div><i class="iconfont fcolor-cc fsize-16">&#xe6fc;</i>合同'+
										'<span class="iconfont fsize-14 aui-pull-right">&#xe61b;</span>'+
				                    '</div>'+
				                '</li>'+
				                '<div class="aui-fold-content w-all di-n m-0 p-0 aui-border-b">'+
				                    '<ul id="contract_list'+i+'" class="aui-list-view lh-30 fsize-14 pl-5 pr-5">'+
				                    	 '<div class="aui-col-xs-12 center-text p-15">'+
					                        '<div class="aui-btn aui-btn-info padding-btn bor-ra-0" onclick="openNewWin(\'customer_contract_editHeader\',\'add\','+ret.business_list[i].business_no+')">添加</div>'+
					                    '</div>'+
				                    '</ul>'+
				                '</div>'+
				                //项目
				                 '<li id="issue" class="aui-user-view-cell aui-fold" onclick="dropDownSwitch(this)" data="slide">'+
				                    '<div><i class="iconfont fcolor-cc fsize-18">&#xe6fb;</i>项目'+
										'<span class="iconfont fsize-14 aui-pull-right">&#xe61b;</span>'+
				                    '</div>'+
				                '</li>'+
				                '<div class="aui-fold-content w-all di-n m-0 p-0 aui-border-b">'+
				                    '<ul id="issue_list'+i+'" class="aui-list-view lh-30 fsize-14 pl-5 pr-5">'+
				                    '</ul>'+
				                '</div>'+
				        	'</ul>'+
				    	'</ul>'    					
  				)
  				if(ret.business_list[i].quote_list!=null){
	    				for(var bi=0;bi<ret.business_list[i].quote_list.length;bi++){
	    					$("#price_list"+i).prepend(
		    					'<div class="pl-10 pr-10 bg-color-gray2 hr-d-gray2 mt-5" onclick="openNewWin(\'customer_public_editHeader\',\'报价\',\'\','+ret.business_list[i].quote_list[bi].quote_no+')">'+
		                            '<li class="aui-col-xs-12">报价编号:<span class="fcolor-a9">'+ret.business_list[i].quote_list[bi].quote_no+'</span></li>'+
		                            '<li class="aui-col-xs-12">添加时间：<span class="fcolor-a9">'+new Date(ret.business_list[i].quote_list[bi].add_time.replace(/-/g,"/")).format("yyyy-MM-dd hh:mm:ss")+'</span></li>'+
		                            '<li class="aui-col-xs-12">产品：<span class="fcolor-a9">'+(ret.business_list[i].quote_list[bi].produt_name==null?"":ret.business_list[i].quote_list[bi].produt_name)+'</span></li>'+
		                            '<li class="aui-col-xs-12">单价：<span class="fcolor-a9">￥'+(ret.business_list[i].quote_list[bi].qdetails_price==null?"":ret.business_list[i].quote_list[bi].qdetails_price)+'</span></li>'+
		                            '<li class="aui-col-xs-12">数量：<span class="fcolor-a9">'+(ret.business_list[i].quote_list[bi].qdetails_num==null?"":ret.business_list[i].quote_list[bi].qdetails_num)+'</span></li>'+
		                            '<li class="aui-col-xs-12">总价：<span class="fcolor-a9">￥'+(ret.business_list[i].quote_list[bi].qdetails_amount==null?"":ret.business_list[i].quote_list[bi].qdetails_amount)+'</span></li>'+
		                            '<li class="aui-col-xs-12">需求：<span class="fcolor-a9">'+(ret.business_list[i].quote_list[bi].qdetails_content==null?"":ret.business_list[i].quote_list[bi].qdetails_content)+'</span></li>'+                        
		                        '</div>'
		    				)
	    				}
  				}
  				if(ret.business_list[i].filing_list!=null){
  					for(var ci=0;ci<ret.business_list[i].filing_list.length;ci++){
	    					$("#record_list"+i).prepend(
		    					 '<div class="pl-10 pr-10 bg-color-gray2 hr-d-gray2 mt-5" onclick="openNewWin(\'customer_public_editHeader\',\'报备\','+ret.business_list[i].business_no+','+ret.business_list[i].filing_list[ci].filing_no+')">'+
		                            '<li class="aui-col-xs-12">报备编号：<span class="fcolor-a9">'+ret.business_list[i].filing_list[ci].filing_no+'</span></li>'+
		                            '<li class="aui-col-xs-12">起止时间：<span class="fcolor-a9">'+new Date(ret.business_list[i].filing_list[ci].filing_start_time.replace(/-/g,"/")).format("yyyy-MM-dd")+"-"+new Date(ret.business_list[i].filing_list[ci].filing_end_time.replace(/-/g,"/")).format("yyyy-MM-dd")+'</span></li>'+
		                            '<li class="aui-col-xs-12">报备事项：<span class="fcolor-a9">'+ret.business_list[i].filing_list[ci].filing_content+'</span></li>'+
		                        '</div>'
		    				)
	    				}
  				}
  				if(ret.business_list[i].commu_list!=null){
  					for(var di=0;di<ret.business_list[i].commu_list.length;di++){
		    				$("#connect_list"+i).prepend(
		    					  '<div class="pl-10 pr-10 bg-color-gray2 hr-d-gray2 mt-5" onclick="openNewWin(\'customer_public_editHeader\',\'沟通\','+ret.business_list[i].business_no+','+ret.business_list[i].commu_list[di].commu_id+')">'+
		    					  	'<li class="aui-col-xs-12">客户编号：<span class="fcolor-a9">'+ret.business_list[i].commu_list[di].cust_no+'</span></li>'+
		                            '<li class="aui-col-xs-12">类型：<span class="fcolor-a9">'+ret.business_list[i].commu_list[di].commu_type_name+'</span></li>'+
		                            '<li class="aui-col-xs-12">对接人：<span class="fcolor-a9">'+ret.business_list[i].commu_list[di].reception_man_name+'</span></li>'+
		                            '<li class="aui-col-xs-12">备注：<span class="fcolor-a9">'+ret.business_list[i].commu_list[di].commu_content+'</span></li>'+                       
		                        '</div>'
		    				)
		    			}
  				}
  				if(ret.business_list[i].contract_list!=null){
  					for(var ei=0;ei<ret.business_list[i].contract_list.length;ei++){
		    				$("#contract_list"+i).prepend(
		    					 '<div class="pl-10 pr-10 bg-color-gray2 hr-d-gray2 mt-5" onclick="openNewWin(\'customer_contract_editHeader\',\'info\','+ret.business_list[i].business_no+','+ret.business_list[i].contract_list[ei].contract_no+',\''+ret.business_list[i].business_name+'\')">'+ 
		                            '<li class="aui-col-xs-12">合同编号：<span class="fcolor-a9">'+ret.business_list[i].contract_list[ei].paper_contract_no+'</span></li>'+
		                            '<li class="aui-col-xs-12">签约时间：<span class="fcolor-a9">'+new Date(ret.business_list[i].contract_list[ei].contract_signtime).format("yyyy-MM-dd")+'</span></li>'+
		                            '<li class="aui-col-xs-12">已付金额：<span class="fcolor-a9">'+(ret.business_list[i].contract_list[ei].paid_amount!=null?"￥:"+ret.business_list[i].contract_list[ei].paid_amount:0)+'</span></li>'+
		                            '<li class="aui-col-xs-12">未付金额：<span class="fcolor-a9">'+(ret.business_list[i].contract_list[ei].unpaid_amount!=null?"￥:"+ret.business_list[i].contract_list[ei].unpaid_amount:0)+'</span></li>'+
		                            '<li class="aui-col-xs-12">合同总金额：<span class="fcolor-a9">￥'+ret.business_list[i].contract_list[ei].contract_amount+'</span></li>'+
		                            '<li class="aui-col-xs-12">开发工期：<span class="fcolor-a9">'+ret.business_list[i].contract_list[ei].contract_develop_num+'个工作日</span></li>'+                       
		                        '</div>'
		    				)
		    			}
  				}
  				if(ret.business_list[i].project_list!=null){
  					for(var fi=0;fi<ret.business_list[i].project_list.length;fi++){
		    				$("#issue_list"+i).prepend(
		    					   '<div class="pl-10 pr-10 bg-color-gray2 hr-d-gray2 mt-5">'+                    
			                            '<li class="aui-col-xs-12">项目名称：<span class="fcolor-a9">'+ret.business_list[i].project_list[fi].project_name+'</span></li>'+
			                            '<li class="aui-col-xs-12">阶段：<span class="fcolor-a9">'+ret.business_list[i].project_list[fi].schedule_name+'</span></li>'+
			                            '<li class="aui-col-xs-12">负责人：<span class="fcolor-a9">'+ret.business_list[i].project_list[fi].project_person_name+'</span></li>'+
			                            '<li class="aui-col-xs-12">助理：<span class="fcolor-a9">'+ret.business_list[i].project_list[fi].staff_name+'</span></li>'+
			                            '<li class="aui-col-xs-12">预计完成时间：<span class="fcolor-a9">'+new Date(ret.business_list[i].project_list[fi].project_start_time).format("yyyy-MM-dd")+'</span></li>'+
			                            '<li class="aui-col-xs-12">实际完成时间：<span class="fcolor-a9">'+new Date(ret.business_list[i].project_list[fi].project_date).format("yyyy-MM-dd")+'</span></li>'+
		                          '</div>'
		    				)
		    			}
  				}
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
//折叠菜单
function dropDownSwitch(obj){
    $(obj).next().slideToggle(function(){
        if ($(this).is(':hidden')) {
            $(obj).find("span").html("&#xe61b;");
        }else{
        	$(obj).find("span").html("&#xe6fe;");
        }
    });
}

function edit(business_no){
    //手动编辑商机状态
    api.actionSheet({
        buttons: ['终止','被抢单']
    },function( ret, err ){
        if(ret.buttonIndex == 1){
//          $("#business_status").html("终止");
			set_cust_contract(business_no,4)
        }
        else if(ret.buttonIndex == 2){
//          $("#business_status").html("被抢单");
			set_cust_contract(business_no,5)
        }
    });
}
//更改状态接口
function set_cust_contract(business_no,stats){
	showProgress();//加载等待   
	var url = localStorage.url+"Api/Crm/save_cust_business_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"business_no":business_no,
	    		"add_staff":localStorage.user_id,
	            "status":stats
	        }
	    }
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				exec();
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

//打开新页面
function openNewWin(winName,type,id,type_no,business_name){
    api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
    		id:id,//添加传的是商机id
    		quote_no:type_no,//获取报价详情用的id
    		filing_no:type_no,//获取报备详情用的id
    		commu_id:type_no,//获取沟通详情用的id
    		contract_no:type_no,//获取合同详情用的id
    		qoote_type:1,//用于保存后刷新客户列表页面
        	type:type,
        	cust_no:api.pageParam.id,//客户id
        	business_name:business_name,//商机名称对应
        	info:'详情'
        }
    });
}

//返回
function goBlack(){
    api.closeWin();
}