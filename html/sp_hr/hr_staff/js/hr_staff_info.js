apiready=function(){
 openPullRefresh("exec()");//下拉刷新
	get_hr_communist_info();
	get_communist_log_type();
	get_hr_log_list('','10');
}
//加载数据方法----------------------------------------------------------------------
function get_hr_communist_info(){
//	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_communist_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,
	            "log_type":1
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
//  		alert(JSON.stringify(ret));
    			$('#communist_avatar').attr('src',localStorage.url+ret.data.communist_avatar);//党员姓名
    			$('#communist_name').html(ret.data.communist_name);//党员姓名
    			$('.party_name').html(InterceptField(ret.data.party_name,'无',10));//所属支部
    			$('#integral').html(ret.data.integral);//个人积分
    			$('#communist_ccp_date').html(ret.data.communist_ccp_date);//入党时间赋值
    			$('#communist_ccp_date1').html(ret.data.communist_ccp_date);//入党时间赋值
    			$('#communist_mobile').html(ret.data.communist_mobile);//手机号赋值
    			$('#communist_idnumber').html(ret.data.communist_idnumber);//身份证号赋值
    			$('#communist_tel').html(ret.data.communist_tel);//电话赋值
    			$('#communist_email').html(clearNull(ret.data.communist_email,'无'));//邮箱赋值
    			//$('#').html(ret);//qq赋值
    			$('#communist_school').html(ret.data.communist_school);//毕业学校赋值
    			$('#communist_specialty').html(ret.data.communist_specialty);//专业赋值
    			$('#communist_paddress').html(ret.data.communist_paddress);//籍贯赋值
    			$('#communist_address').html(ret.data.communist_address);//现住址赋值
    			$('#post_name').html(InterceptField(ret.data.post_name,'无',10));//职务赋值
	
			//党员发展历程
			if(ret.data.dev_log_list!==null&&ret.data.dev_log_list!==''){
			for(var i=0;i<ret.data.dev_log_list.length;i++){
				$('#dev_log_list').append(
					'<li class="100b">'+
					'<div class="pull-left">'+ret.data.dev_log_list[i].add_time+'</div>'+
					'<div class="pull-left ml-12em po-re z-index2">'+
						'<img class="wh-24em left-12mem" src="../../../statics/images/images_edu/edu_notes_time.png" alt="" />'+					
					'</div>'+
					'<div class="pull-left ml-12mem pl-20em w-60b over-h pb-20em border-left-3 z-index1">'+
						'<div class="f-14em color-21">'+clearNull(ret.data.dev_log_list[i].log_title,'无')+'</div>'+
						'<div class="f-12em color-66">'+ret.data.dev_log_list[i].log_content+'</div>'+
					'</div>'+
					
					
					'</li>'
				)
			}
				
			
			}
			
//				if(ret.data.dev_log_list!==null&&ret.data.dev_log_list!==''){
//					$('#dev_log_list').append('<div class="po-ab w-2px h-100b bg-color-ffb767 left-50b ml-1mpx" id="line"></div>')
//					for(var i=0;i<ret.data.dev_log_list.length;i++){
//						if(i%2==0){
//	    					$('#dev_log_list').append(
//								'<li class="di-b over-h">'+
//				                   '<div class="w-50b pull-right po-re pb-25em">'+
//				                   		'<img class="po-ab wh-24em left-12mem top-0" src="../../../statics/images/images_edu/edu_notes_time.png" alt="" />'+
//				                      	'<p class="f-15em lh-24em color-33 pl-20em">'+
//				                      	ret.data.dev_log_list[i].add_time+
//				                      	'</p>'+
//				                      	'<p class="f-15em lh-18em color-99 mt-4em pl-20em"><span class="color-ffb767 mr-8em">'+ret.data.dev_log_list[i].log_content+'</span></p>'+
//				                   '</div>'+
//				                '</li>'
//							)
//						}else{
//							$('#dev_log_list').append(
//								'<li class="di-b over-h">'+
//				                   '<div class="w-50b pull-left po-re pb-25em text-r">'+
//										'<img class="po-ab wh-24em right-12mem top-0" src="../../../statics/images/images_edu/edu_notes_time.png" alt="" />'+
//				                      	'<p class="f-15em lh-24em color-33 pr-20em">'+
//				                      	ret.data.dev_log_list[i].add_time+
//				                      	'</p>'+
//				                      	'<p class="f-15em lh-18em color-99 mt-4em pr-20em"><span class="color-ffb767 ml-8em">'+ret.data.dev_log_list[i].log_content+'</span></p>'+
//				                   '</div>'+
//				                '</li>'
//							)
//						}
//						
//  				}
//  				
//				}else{
//					$('#bb').hide();
//				}
				
				
//					var bgc=['aui-time-label bor-ra-100b w-20 h-20 lh-21 text-align bg_a','aui-time-label bor-ra-100b w-20 h-20 lh-21 text-align bg_b','aui-time-label bor-ra-100b w-20 h-20 lh-21 text-align bg_c','aui-time-label bor-ra-100b w-20 h-20 lh-21 text-align bg_d']
//					var flow_list=$("#flow_list .aui-time-label")
//					var flow_list_1=$("#flow_list_1 .aui-time-label")
//					var c=0;
//					var d=0;
//					for(var i=0;i<flow_list.length;i++){
//						flow_list[i].className=add();
//					}
//					for(var k=0;k<flow_list_1.length;k++){
//						flow_list_1[k].className=adb();
//					}
//					function add(){
//						if(c==bgc.length){
//							c=0;
//						}
//						c++;
//						return bgc[c-1];
//						
//					}
//					function adb(){
//						if(d==bgc.length){
//							d=0;
//						}
//						d++;
//						return bgc[d-1];
//						
//					}
							
				
				
    		}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });

}

//$('#line').css('height',($('#dev_log_list_height').height()-$('#dev_log_list_height').find('li').last().height()));

//获取党内生活分类
function get_communist_log_type(){
//	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Hr/get_communist_log_type";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data!=null){
    				for(var i=0;i<ret.data.length;i++){
    					$('#log_type').append(
    						' <li class="pull-left ca_btn pl-10em pr-10em f-11em mr-10em mt-10em text-align lh-20em" onclick="get_hr_log_list(this,'+ret.data[i].type_no+')">'+ret.data[i].type_name+((ret.data[i].count!='0'||ret.data[i].count!=null)?'( '+ret.data[i].count+' )':'')+'</li>'
    					)
    					$('#log_type li').eq(0).addClass('ca_btn_click').removeClass('ca_btn');
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


//加载数据方法----------------------------------------------------------------------
function get_hr_log_list(This,id){

//alert(localStorage.user_id);
//alert(id);
	$('#log_type li').removeClass('ca_btn_click').addClass('ca_btn');
	$(This).addClass('ca_btn_click').removeClass('ca_btn');
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_communist_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,
	             "log_type":id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#log_list').html('');
				if(ret.data.log_list!==null&&ret.data.log_list!==''){
					for(var i=0;i<ret.data.log_list.length;i++){
						$('#log_list').append(
							'<div class="clearfix pl-12em pr-12em pt-15em pb-15em bb-1-eb bg-color-whiter">'+
					   			
					   			'<div class="f-14em lh-17em color-21">'+
					   				'<img class="w-15em h-17em lh-17em pull-left mr-5em mt-4em" src="../../../statics/images/images_edu/edu_notes_time.png" alt="" />'+
					   				ret.data.log_list[i].log_content+
					   			'</div>'+
					   			'<p class="f-12em lh-15em color-99 mt-10em pull-right mr-15em ">'+
					   			ret.data.log_list[i].add_time+
					   			'</p>'+
					   		'</div>'
						)							


    				}
    				
    
				}else{
					$('#aa').hide()
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



//打开积分页------------------------------------------------------------------------
function openIntegral(winName){
	api.openWin({
        name: winName,
        url: '../hr_integral/header/'+winName+'.html',
        pageParam:{
        }
    });
}

//刷新页面-----------------------------------------------------------
function exec(){
	location.reload();
}

