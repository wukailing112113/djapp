apiready = function () {
    openPullRefresh("exec()");//下拉刷新
    showProgress();
    task_list();//加载数据  
}

var status = 1;//临时状态
//加载数据
var dayMount=0; //每日计数
var weekMount=0;//每周计数
var monthMount=0;//每月计数
var yearMount=0;//每年计数
function task_list(){
	showProgress();//加载等待
	var url = localStorage.url+"Api/oa/get_willdo_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            staff_no: localStorage.user_id,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			
    			for(var i=0;i<ret.list.length;i++){
    				
					//去除字符串中的p标签
					if(ret.list[i].willdo_content==null){
						ret.list[i].willdo_content=""
					}
    				ret.list[i].willdo_content=removeHTMLTag(ret.list[i].willdo_content);
    				//时间显示不为null 
    				if(ret.list[i].add_time==null){
    					ret.list[i].add_time="";
    				}
    				//加载每日数据
    				if(ret.list[i].willdo_cycle=="01"){
						$("#day").show();
						if(ret.list[i].willdo_exestatus==2){
							dayMount++; 
	    					$('#day_list').append(
	    					'<li class="mb-0 mt-10">'+
				            '<div class="aui-time-label aui-bg-danger"></div>'+
					            '<div class="aui-timeline-item">'+
					                '<span class="aui-timeline-time pl-10 fsize-14 aui-text-danger lh-1">'+(ret.list[i].willdo_start_time==null?'':ret.list[i].willdo_start_time)+'-'+(ret.list[i].willdo_end_time==null?'':ret.list[i].willdo_end_time)+'</span>'+
					                '<div class="aui-timeline-body pt-24 color-w pb-0">'+
					                	'<div class="aui-border-b">'+
						                	'<div class="pb-5" onclick="openNewWin(\'task_infoHeader\','+ret.list[i].willdo_id+')">'+
						                		'<i class="iconfont aui-text-danger p-0 fsize-14">&#xe6d9;</i>'+
										    	'<span class="ml-5">'+ret.list[i].willdo_title+'</span>'+'<span class="ml-5 aui-text-danger">[已中止]</span>'+
						                	'</div>'+
					                	'</div>'+
					                '</div>'+
					            '</div>'+
					        '</li>'
					        )
						}else{
							if(ret.list[i].willdo_status=='0'){
							dayMount++; 
	    					$('#day_list').append(
		    					'<li class="mb-0 mt-10">'+
					            '<div class="aui-time-label aui-bg-danger"></div>'+
						            '<div class="aui-timeline-item">'+
						                '<span class="aui-timeline-time pl-10 fsize-14 aui-text-danger lh-1">'+(ret.list[i].willdo_start_time==null?'':ret.list[i].willdo_start_time)+'-'+(ret.list[i].willdo_end_time==null?'':ret.list[i].willdo_end_time)+'</span>'+
						                '<div class="aui-timeline-body pt-24 color-w pb-0">'+
						                	'<div class="aui-border-b">'+
							                	'<div class="pb-5" onclick="openNewWin(\'task_infoHeader\','+ret.list[i].willdo_id+')">'+
							                		'<i class="iconfont aui-text-danger p-0 fsize-14">&#xe6d9;</i>'+
											    	'<span class="ml-5">'+ret.list[i].willdo_title+'</span>'+'<span class="ml-5 aui-text-danger">[未开展]</span>'+
							                	'</div>'+
						                	'</div>'+
						                '</div>'+
						            '</div>'+
						        '</li>'
						        )
						    }else if(ret.list[i].willdo_status=='1'){
						     	$('#day_list').append(
		    					'<li class="mb-0 mt-10">'+
					            '<div class="aui-time-label aui-bg-info"></div>'+
						            '<div class="aui-timeline-item">'+
						                '<span class="aui-timeline-time pl-10 fsize-14 aui-text-info lh-1">'+(ret.list[i].willdo_start_time==null?'':ret.list[i].willdo_start_time)+'-'+(ret.list[i].willdo_end_time==null?'':ret.list[i].willdo_end_time)+'</span>'+
						                '<div class="aui-timeline-body pt-24 color-w pb-0">'+
						                	'<div class="aui-border-b">'+
							                	'<div class="pb-5" onclick="openNewWin(\'task_infoHeader\','+ret.list[i].willdo_id+')">'+
							                		'<i class="iconfont aui-text-info p-0 fsize-14">&#xe6d7;</i>'+
											    	'<span class="ml-5">'+ret.list[i].willdo_title+'</span>'+
							                	'</div>'+
						                	'</div>'+
						                '</div>'+
						            '</div>'+
						        '</li>'
						        )
						     }
						}	
    				}
    				//加载每周数据
    				else if(ret.list[i].willdo_cycle=="02"){
    						
    						$("#week").show();
    						if(ret.list[i].willdo_exestatus==2){
    							weekMount++;
    							$('#week_list').append(
		    					'<li class="mb-0 mt-10">'+
					            '<div class="aui-time-label aui-bg-danger"></div>'+
						            '<div class="aui-timeline-item">'+
						                '<span class="aui-timeline-time pl-10 fsize-14 aui-text-danger lh-1">周'+(ret.list[i].willdo_operdate==1?"一":
							                (ret.list[i].willdo_operdate==2?"二":
							                (ret.list[i].willdo_operdate==3?"三":
							                (ret.list[i].willdo_operdate==4?"四":
							                (ret.list[i].willdo_operdate==5?"五":
							                (ret.list[i].willdo_operdate==6?"六":"七"))))))+' '+(ret.list[i].willdo_start_time==null?'':ret.list[i].willdo_start_time)+'-'+(ret.list[i].willdo_end_time==null?'':ret.list[i].willdo_end_time)+'</span>'+
						                '<div class="aui-timeline-body pt-24 color-w pb-0">'+
						                	'<div class="aui-border-b pb-0">'+
							                	'<div class="pb-5" onclick="openNewWin(\'task_infoHeader\','+ret.list[i].willdo_id+')">'+
							                		'<i class="iconfont aui-text-danger p-0 fsize-14">&#xe6d9;</i>'+
											    	'<span class="ml-5">'+ret.list[i].willdo_title+'</span>'+'</span>'+'<span class="ml-5 aui-text-danger">[已中止]</span>'+
							                	'</div>'+
						                	'</div>'+
						                '</div>'+
						            '</div>'+
						        '</li>'
					        	)
    						}else{
    							if(ret.list[i].willdo_status=='0'){
    							weekMount++;
    							$('#week_list').append(
		    					'<li class="mb-0 mt-10">'+
					            '<div class="aui-time-label aui-bg-danger"></div>'+
						            '<div class="aui-timeline-item">'+
						                '<span class="aui-timeline-time pl-10 fsize-14 aui-text-danger lh-1">周'+(ret.list[i].willdo_operdate==1?"一":
							                (ret.list[i].willdo_operdate==2?"二":
							                (ret.list[i].willdo_operdate==3?"三":
							                (ret.list[i].willdo_operdate==4?"四":
							                (ret.list[i].willdo_operdate==5?"五":
							                (ret.list[i].willdo_operdate==6?"六":"七"))))))+' '+(ret.list[i].willdo_start_time==null?'':ret.list[i].willdo_start_time)+'-'+(ret.list[i].willdo_end_time==null?'':ret.list[i].willdo_end_time)+'</span>'+
						                '<div class="aui-timeline-body pt-24 color-w pb-0">'+
						                	'<div class="aui-border-b pb-0">'+
							                	'<div class="pb-5" onclick="openNewWin(\'task_infoHeader\','+ret.list[i].willdo_id+')">'+
							                		'<i class="iconfont aui-text-danger p-0 fsize-14">&#xe6d9;</i>'+
											    	'<span class="ml-5">'+ret.list[i].willdo_title+'</span>'+'</span>'+'<span class="ml-5 aui-text-danger">[未开展]</span>'+
							                	'</div>'+
						                	'</div>'+
						                '</div>'+
						            '</div>'+
						        '</li>'
					        	)
    						}else if(ret.list[i].willdo_status=='1'){
    							$('#week_list').append(
			    					'<li class="mb-0 mt-10">'+
						            '<div class="aui-time-label aui-bg-info"></div>'+
							            '<div class="aui-timeline-item">'+
							                '<span class="aui-timeline-time pl-10 fsize-14 aui-text-info lh-1">周'+(ret.list[i].willdo_operdate==1?"一":
								                (ret.list[i].willdo_operdate==2?"二":
								                (ret.list[i].willdo_operdate==3?"三":
								                (ret.list[i].willdo_operdate==4?"四":
								                (ret.list[i].willdo_operdate==5?"五":
								                (ret.list[i].willdo_operdate==6?"六":"七"))))))+' '+(ret.list[i].willdo_start_time==null?'':ret.list[i].willdo_start_time)+'-'+(ret.list[i].willdo_end_time==null?'':ret.list[i].willdo_end_time)+'</span>'+
							                '<div class="aui-timeline-body pt-24 color-w pb-0">'+
							                	'<div class="aui-border-b pb-0">'+
								                	'<div class="pb-5" onclick="openNewWin(\'task_infoHeader\','+ret.list[i].willdo_id+')">'+
								                		'<i class="iconfont aui-text-info p-0 fsize-14">&#xe6d7;</i>'+
												    	'<span class="ml-5">'+ret.list[i].willdo_title+'</span>'+
								                	'</div>'+
							                	'</div>'+
							                '</div>'+
							            '</div>'+
							        '</li>'
						        	)
	    						}
    						}	
    				}
    				//加载每月数据
    				else if(ret.list[i].willdo_cycle=="03"){
    					$("#month").show();
    					if(ret.list[i].willdo_exestatus==2){
    						monthMount++;
    						$('#month_list').append(
	    					'<li class="mb-0 mt-10">'+
				            '<div class="aui-time-label aui-bg-danger"></div>'+
					            '<div class="aui-timeline-item">'+
					                '<span class="aui-timeline-time pl-10 fsize-14 aui-text-danger lh-1">'+ret.list[i].willdo_operdate+'日'+' '+(ret.list[i].willdo_start_time==null?'':ret.list[i].willdo_start_time)+'-'+(ret.list[i].willdo_end_time==null?'':ret.list[i].willdo_end_time)+'</span>'+
					                '<div class="aui-timeline-body pt-24 color-w pb-0">'+
					                	'<div class="aui-border-b">'+
						                	'<div class="pb-5" onclick="openNewWin(\'task_infoHeader\','+ret.list[i].willdo_id+')">'+
						                		'<i class="iconfont aui-text-danger p-0 fsize-14">&#xe6d9;</i>'+
										    	'<span class="ml-5">'+ret.list[i].willdo_title+'</span>'+'</span>'+'<span class="ml-5 aui-text-danger">[已中止]</span>'+
						                	'</div>'+
					                	'</div>'+
					                '</div>'+
					            '</div>'+
					        '</li>'
					     	)	
    					}else{
    						if(ret.list[i].willdo_status=='0'){
	    						monthMount++;
	    						$('#month_list').append(
		    					'<li class="mb-0 mt-10">'+
					            '<div class="aui-time-label aui-bg-danger"></div>'+
						            '<div class="aui-timeline-item">'+
						                '<span class="aui-timeline-time pl-10 fsize-14 aui-text-danger lh-1">'+ret.list[i].willdo_operdate+'日'+' '+(ret.list[i].willdo_start_time==null?'':ret.list[i].willdo_start_time)+'-'+(ret.list[i].willdo_end_time==null?'':ret.list[i].willdo_end_time)+'</span>'+
						                '<div class="aui-timeline-body pt-24 color-w pb-0">'+
						                	'<div class="aui-border-b">'+
							                	'<div class="pb-5" onclick="openNewWin(\'task_infoHeader\','+ret.list[i].willdo_id+')">'+
							                		'<i class="iconfont aui-text-danger p-0 fsize-14">&#xe6d9;</i>'+
											    	'<span class="ml-5">'+ret.list[i].willdo_title+'</span>'+'</span>'+'<span class="ml-5 aui-text-danger">[未开展]</span>'+
							                	'</div>'+
						                	'</div>'+
						                '</div>'+
						            '</div>'+
						        '</li>'
						     	)	
	    					}else if(ret.list[i].willdo_status=='1'){
	    						$('#month_list').append(
		    					'<li class="mb-0 mt-10">'+
					            '<div class="aui-time-label aui-bg-info"></div>'+
						            '<div class="aui-timeline-item">'+
						                '<span class="aui-timeline-time pl-10 fsize-14 aui-text-info lh-1">'+ret.list[i].willdo_operdate+'日'+' '+(ret.list[i].willdo_start_time==null?'':ret.list[i].willdo_start_time)+'-'+(ret.list[i].willdo_end_time==null?'':ret.list[i].willdo_end_time)+'</span>'+
						                '<div class="aui-timeline-body pt-24 color-w pb-0">'+
						                	'<div class="aui-border-b">'+
							                	'<div class="pb-5" onclick="openNewWin(\'task_infoHeader\','+ret.list[i].willdo_id+')">'+
							                		'<i class="iconfont aui-text-info p-0 fsize-14">&#xe6d7;</i>'+
											    	'<span class="ml-5">'+ret.list[i].willdo_title+'</span>'+
							                	'</div>'+
						                	'</div>'+
						                '</div>'+
						            '</div>'+
						        '</li>'
						     	)	
	    					}
    					}		
    				}
    				//加载每年数据
    				else if(ret.list[i].willdo_cycle=="04"){
    						
    						var month="";
    						var day="";
    						if(ret.list[i].willdo_operdate.substring(0,1)=="0"){
    							month=ret.list[i].willdo_operdate.substring(1,2);
    						}else{
    							month=ret.list[i].willdo_operdate.substring(0,2);
    						}
    						if(ret.list[i].willdo_operdate.substring(2,3)=="0"){
    							day=ret.list[i].willdo_operdate.substring(3,4);
    						}else{
    							day=ret.list[i].willdo_operdate.substring(2,4);
    						}
    						$("#year").show();
    						if(ret.list[i].willdo_exestatus==2){
    							yearMount++;
    							$('#year_list').append(
		    					'<li class="mb-0 mt-10">'+
					            '<div class="aui-time-label aui-bg-danger"></div>'+
						            '<div class="aui-timeline-item">'+
						                '<span class="aui-timeline-time pl-10 fsize-14 aui-text-danger lh-1">'+month+'月'+day+'日   '+(ret.list[i].willdo_start_time==null?'':ret.list[i].willdo_start_time)+'-'+(ret.list[i].willdo_end_time==null?'':ret.list[i].willdo_end_time)+'</span>'+
						                '<div class="aui-timeline-body pt-24 color-w pb-0">'+
						                	'<div class="aui-border-b">'+
							                	'<div class="pb-5" onclick="openNewWin(\'task_infoHeader\','+ret.list[i].willdo_id+')">'+
							                		'<i class="iconfont aui-text-danger p-0 fsize-14">&#xe6d9;</i>'+
											    	'<span class="ml-5">'+ret.list[i].willdo_title+'</span>'+'</span>'+'<span class="ml-5 aui-text-danger">[已中止]</span>'+
							                	'</div>'+
						                	'</div>'+
						                '</div>'+
						            '</div>'+
						        '</li>'
						     	)
    						}else{
    							if(ret.list[i].willdo_status=='0'){
	    							yearMount++;
	    							$('#year_list').append(
			    					'<li class="mb-0 mt-10">'+
						            '<div class="aui-time-label aui-bg-danger"></div>'+
							            '<div class="aui-timeline-item">'+
							                '<span class="aui-timeline-time pl-10 fsize-14 aui-text-danger lh-1">'+month+'月'+day+'日   '+(ret.list[i].willdo_start_time==null?'':ret.list[i].willdo_start_time)+'-'+(ret.list[i].willdo_end_time==null?'':ret.list[i].willdo_end_time)+'</span>'+
							                '<div class="aui-timeline-body pt-24 color-w pb-0">'+
							                	'<div class="aui-border-b">'+
								                	'<div class="pb-5" onclick="openNewWin(\'task_infoHeader\','+ret.list[i].willdo_id+')">'+
								                		'<i class="iconfont aui-text-danger p-0 fsize-14">&#xe6d9;</i>'+
												    	'<span class="ml-5">'+ret.list[i].willdo_title+'</span>'+'</span>'+'<span class="ml-5 aui-text-danger">[未开展]</span>'+
								                	'</div>'+
							                	'</div>'+
							                '</div>'+
							            '</div>'+
							        '</li>'
							     	)	
	    						}else if(ret.list[i].willdo_status=='1'){
	    							$('#year_list').append(
	    							'<li class="mb-0 mt-10">'+
						            '<div class="aui-time-label aui-bg-info"></div>'+
							            '<div class="aui-timeline-item">'+
							                '<span class="aui-timeline-time pl-10 fsize-14 aui-text-info lh-1">'+month+'月'+day+'日   '+(ret.list[i].willdo_start_time==null?'':ret.list[i].willdo_start_time)+'-'+(ret.list[i].willdo_end_time==null?'':ret.list[i].willdo_end_time)+'</span>'+
							                '<div class="aui-timeline-body pt-24 color-w pb-0">'+
							                	'<div class="aui-border-b">'+
								                	'<div class="pb-5" onclick="openNewWin(\'task_infoHeader\','+ret.list[i].willdo_id+')">'+
								                		'<i class="iconfont aui-text-info p-0 fsize-14">&#xe6d7;</i>'+
												    	'<span class="ml-5">'+ret.list[i].willdo_title+'</span>'+
								                	'</div>'+
							                	'</div>'+
							                '</div>'+
							            '</div>'+
							        '</li>'
							     	)
	    						}
    						}		
    				}
    				api.hideProgress();//隐藏进度提示框
//					$(".di-n").removeClass("di-n");
    			}
    			if(dayMount==0){
    				$('#day_mount').addClass('di-n')
    			}
    			if(weekMount==0){
    				$('#week_mount').addClass('di-n')
    			}
    			if(monthMount==0){
    				$('#month_mount').addClass('di-n')
    			}
    			if(yearMount==0){
    				$('#year_mount').addClass('di-n')
    			}
    			$('#day_mount').html(dayMount);//每日必做个数
    			$('#week_mount').html(weekMount);//每周必做个数
    			$('#month_mount').html(monthMount);//每月必做个数
    			$('#year_mount').html(yearMount);//每年必做个数
    			//下拉第一项去除外边距
    			$('#year_list').children().first().removeClass('mt-10');
    			$('#month_list').children().first().removeClass('mt-10');
    			$('#week_list').children().first().removeClass('mt-10');
    			$('#day_list').children().first().removeClass('mt-10');
			}
			else{
//				alert(ret.msg,"提示");
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
	
}
//刷新本页面
//刷新本页面
function exec(){
	location.reload();
}

//打开新页面
function openNewWin(winName,id){
	api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
        	"type":"info",//用来确定是否为详情页
        	"id":id
        }
    });
}
//下拉
function dropDown(obj){
	$('.add').remove(); 
	//关闭其他兄弟节点下拉项
	$(obj).siblings('li').next().slideUp();
	//找到已经展开下拉项的兄弟节点，改变其图标
	$(obj).siblings('li').find('[class="color-w aui-iconfont aui-pull-right aui-icon-fold"]').removeClass('aui-icon-fold').addClass('aui-icon-unfold');
	//找到已经去除下边框的兄弟节点，添加下边框
	$(obj).siblings('li').removeClass('remove-border');
	//展开或者关闭下拉选项
	$(obj).next().slideToggle();
	//当前元素的图标切换
	if($(obj).children().last().attr('class')=='color-w aui-iconfont aui-pull-right aui-icon-unfold'){
		$(obj).children().last().removeClass('aui-icon-unfold').addClass('aui-icon-fold');
		$(obj).addClass('remove-border');
		$(obj).before('<div class="add"></div>');
	}else{
		$(obj).children().last().removeClass('aui-icon-fold').addClass('aui-icon-unfold');	
		$(obj).removeClass('remove-border');
	}
}