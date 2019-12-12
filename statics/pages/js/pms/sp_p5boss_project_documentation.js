var survey=0;//需求调研
var analysis=0;//需求分析
var prototyping=0;//原型设计
var products_design=0;//产品设计
var impression_drawing=0;//界面设计
var coding=0;//程序编码
var test=0;//软件测试
var online=0;//产品上线
apiready = function(){
	get_documentation_list();  //加载数据
}
//打开新页面
function openWin(winName,type){

	api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
        	type:type
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
//加载数据
function get_documentation_list(){
	var type='';
	showProgress();//加载等待
	var url = localStorage.url+"Api/Pms/get_project_doc_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    	   "project_no":api.pageParam.project_no//当前项目编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			for(var i=0;i<ret.list.length;i++){
    				if(ret.list[i].schedule_name=='需求调研'){
    					type='survey';
    				}else if(ret.list[i].schedule_name=='需求分析'){
    					type='analysis';
    				}else if(ret.list[i].schedule_name=='原型设计'){
    					type='prototyping';
    				}else if(ret.list[i].schedule_name=='产品设计'){
    					type='products_design';
    				}else if(ret.list[i].schedule_name=='界面设计'){
    					type='impression_drawing';
    				}else if(ret.list[i].schedule_name=='程序编码'){
    					type='coding';
    				}else if(ret.list[i].schedule_name=='软件测试'){
    					type='test';
    				}else if(ret.list[i].schedule_name=='产品上线'){
    					type='online';
    				}
    				if(ret.list[i].doc_list==0){
    						
    				} else{
    					$('#'+type).show();
						for(var j=0;j<ret.list[i].doc_list.length;j++){
							$('#'+type+'_list').append(
	    						'<li class="aui-list-view-cell pl-10 pr-0 ml-15 mr-15 border-b aui-ellipsis-1" onclick="openEnqueue(\''+localStorage.url+ret.list[i].doc_list[j].doc_attach+'\');openManagerView()">'+
						            '<i class="iconfont bg-word pt-5 pb-5 mr-10 border-radius color-white fsize-12">&#xe62e;</i>'+ret.list[i].doc_list[j].source_name+
						        '</li>'    
	    					)
							if(type=='survey'){
		    					survey++;
		    				}else if(type=='analysis'){
		    					analysis++;		    					
		    				}else if(type=='prototyping'){
		    					prototyping++;		    					
		    				}else if(type=='products_design'){
		    					products_design++;	
		    				}else if(type=='impression_drawing'){
		    					impression_drawing++;	
		    				}else if(type=='coding'){
		    					coding++;	
		    				}else if(type=='test'){
		    					test++;	
		    				}else if(type=='online'){
		    					online++;	
		    				}
						}
    				}	
    			}
    			$('#survey_mount').html(survey);
				$('#analysis_mount').html(analysis);
				$('#prototyping_mount').html(prototyping);
				$('#products_design_mount').html(products_design);
				$('#impression_drawing_mount').html(impression_drawing);
				$('#coding_mount').html(coding);
				$('#test_mount').html(test);
				$('#online_mount').html(online);	
			}
			else{
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}