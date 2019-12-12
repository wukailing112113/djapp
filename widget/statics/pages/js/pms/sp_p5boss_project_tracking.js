var cust_no=0;//客户编号
var project_no_cu;//项目编号
apiready = function(){
	showProgress();//加载等待
	if(api.pageParam.project_no){
		//加载数据
		get_tracking_info();
	}else{
		get_project();
	}
}
//刷新页面方法
function exec(){
	location.reload();
}
//打开新页面
function openWin(winName,index,type,project_no,project_name){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	"index":index,
	    	"type":type,
	    	"project_no":project_no_cu,
	    	"cust_no":cust_no,
	    	"project_name":api.pageParam.project_name,
	    }
    });
}
//加载数据
function get_tracking_info(){
	if(api.pageParam.project_no){
		project_no_cu=api.pageParam.project_no;
	}
	var bg='bg-';//判断是否是第一个未完成（正在进行状态）
	var url = localStorage.url+"Api/Pms/get_project_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	          	"project_no":project_no_cu
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.project_logo_path==null||ret.project_logo_path==''){
    				$('#photo').hide();
    				$('#div_logo').show().html(ret.project_abbr.substring(ret.project_abbr.length-2,ret.project_abbr.length));
    			}
    			$('#photo').attr('src',localStorage.url+ret.project_logo_path);//项目logo赋值
    			if(ret.project_abbr==null||ret.project_abbr==''){
    				$('#project_abbr').html('&nbsp;');
    			}else{
    				$('#project_abbr').html(ret.project_abbr);//项目简称赋值
    			}			
    			$('#customer').append('客户名称：'+ret.cust_name);//客户名称赋值
    			cust_no=ret.cust_no;
    			$('#project_person_name').append('项目负责人:'+ret.project_person_name);//负责人赋值
    			$('#module_count_t1').html(ret.module_count_t1);//已完成模块赋值
    			$('#module_count_t2').html(ret.module_count_t2);//未完成模块赋值
    			$('#bug').html(ret.count_t1+'/'+ret.count_all);//bug模块赋值
    			$('#youhua').html(ret.count_t3+'/'+ret.count_t2);//优化模块赋值
    			$('#need').html(ret.count_t5+'/'+ret.count_t4);//需求模块赋值
    			$('#document').html(ret.count_t6)//开发文档赋值
    			for(var i=0;i<ret.schedule_list.length;i++){
    				if(ret.schedule_list[i].status_name=='未完成'){
						bg=bg+(i+1);
						$('#project_photo').removeClass('bg1').addClass(bg);
						api.hideProgress();//隐藏进度提示框
						return;			
    				}
    				if(ret.schedule_list[7].status_name=='已完成'){
    					$('#project_photo').removeClass('bg1').addClass('bg-9');
    					api.hideProgress();//隐藏进度提示框
						return;	
    				}		
    			}
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
function get_project(){
	var url = localStorage.url+"Api/Pms/get_project_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	          	"cust_no":localStorage.user_id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			project_no_cu=ret.cust_list[0].project_no;
				get_tracking_info();
			}
			else{
				alert(ret.msg,"提示");
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}