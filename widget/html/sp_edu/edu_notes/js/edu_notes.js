apiready = function(){	
	//evenScrolltobottom("toTop()");//上拉加载
	//openPullRefresh("exec()");//下拉刷新
	//1从超市进入   2从学习首页 更多进入
	if(api.pageParam.type==2){
	$(".edu_notes_option").append(
		'<select id="notes_type" onchange="edu_change()" class="w-100em f-w color-21">'+
			' <option value ="">'+"全部笔记"+'</option>'+
			' <option value ="1">学习笔记</option>'+
			' <option value="2">会议笔记</option>'+
			'<option value ="3">日常笔记</option>'+
			'<option value="4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;其他</option>'+
		
		'</select>'
		)
	}else if(api.pageParam.type==1){
		$(".edu_notes_option").append(
		'<select id="notes_type" onchange="edu_change()" class="w-100em f-w color-21">'+
			' <option value ="">'+"全部笔记"+'</option>'+
			' <option value ="1">学习笔记</option>'+
			' <option value="2">会议笔记</option>'+
			'<option value ="3">日常笔记</option>'+
			'<option value="4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;其他</option>'+
		
		'</select>'
		)
	
	}
	var mydate = new Date();
	var mydate_first=mydate.getFullYear()+'-'+(mydate.getMonth()+1)+'-'+mydate.getDate();
	localStorage.setItem("time",mydate_first); //存入 参数： 1.调用的值 2.所要存入的数据 	
	var change_type = $("#notes_type").val();
	localStorage.setItem("changetype",change_type);
	getEduNotesList();//调用（获取学习笔记列表）接口
	
	
}
var page=1;
//上拉加载--------------------------------------------------------------------
function toTop(){
	page++;
	//getEduNotesList();
}

function edu_change(){
	var change_type = $("#notes_type").val();
	localStorage.setItem("changetype",change_type);
	getEduNotesList();	
}

//初始化时   获取学习笔记列表 接口------------------------------------------------------------
function getEduNotesList(){
	$('#list>div').remove();
	var time  = localStorage.getItem("time");
	var changetype  = localStorage.getItem("changetype");
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_notes_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,
	            "page":page,
	            "pagesize":10,
	            "note_time":time,
	            "notes_type":changetype,//类型
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    		$('#list').fadeIn(800);
    		$('#list1 .no_more').hide();
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){	
	    		 //type_video=yes视频  /type_video=no文章   /material=null日常笔记 	
		    		if(ret.data[i].material==null){
		    			$('#list').append(
				    		'<div class="edu_notes_con mt-12em p-12em clearfix w-100b" onclick="openScene_infowin(\'edu_special_twostudies_scene_info_header\','+ret.data[i].notes_id+')">'+
				    			'<div class="pull-left mr-8em">'+
				    			'<img class="w-32em h-32em" src="../../../statics/public/images/edu_notes_daily.png" alt="返回" />'+
				    			'</div>'+	
				    			
				    			'<div class="pull-left w-85b over-h">'+
				    			'<div class="color-21 f-14em f-w">'+InterceptField(ret.data[i].notes_title,'无标题',20)+'</div>'+
				    			'<div class="f-12em color-a3">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
				    			'<div class="icon_regular color-21 f-14em mt-15em">'+clearNull(ret.data[i].notes_content,'无内容')+'</div>'+
				    				    			
				    			'</div>'+		    			
				    		'</div>'	
				    	)
		    		}	
					if(ret.data[i].type_video=='yes'){
						$('#list').append(
						'<div class="edu_notes_con mt-12em mb-12em p-12em clearfix w-100b">'+
						'<div class="pull-left mr-8em">'+
						'<img class="w-32em h-32em" src="../../../statics/public/images/edu_notes_shipin.png" alt="返回" />'+
						'</div>'+
						'<div class="pull-left w-85b over-h" onclick="openScene_infowin(\'edu_special_twostudies_scene_info_header\','+ret.data[i].notes_id+')">'+
						'<div class="color-21 f-14em f-w">'+InterceptField(ret.data[i].notes_title,'无标题',20)+'</div>'+
						'<div class="f-12em color-a3">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
						'<div class="icon_regular color-21 f-14em mt-15em">'+InterceptField(ret.data[i].notes_content,'无标题',50)+'</div>'+
						'<div class="border-3em-de border-radius-25em clearfix mt-15em p-5em" onclick="openLearnInfo(\'edu_learn_videoInfo_header\','+ret.data[i].material.material_id+')">'+
						'<img class="w-281em h-178em over-h m-a" src='+((ret.data[i].material.material_thumb!="")?(localStorage.url+ret.data[i].material.material_thumb):"../../../statics/images/images_edu/edu_info_tu1.png")+' alt=""/>'+
						'<div class="f-16em color-12 pt-8em f-w">'+InterceptField(ret.data[i].material.material_title,'无标题',16)+'</div>'+
						
						'</div>'+
						'</div>'+
						'</div>'
						)
					}else if(ret.data[i].type_video=='no'){
					//文章笔记
						$('#list').append(
				    		'<div class="edu_notes_con mt-12em p-12em clearfix w-100b">'+
				    			'<div class="pull-left mr-8em">'+
				    				'<img class="w-32em h-32em" src="../../../statics/public/images/edu_notes_tu1.png" alt="返回" />'+
				    			'</div>'+	
				    			
				    			'<div class="pull-left w-85b over-h" onclick="openScene_infowin(\'edu_special_twostudies_scene_info_header\','+ret.data[i].notes_id+')">'+
				    				'<div class="color-21 f-14em f-w">'+InterceptField(ret.data[i].notes_title,'无标题',20)+'</div>'+
				    				'<div class="f-12em color-a3">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
				    				'<div class="icon_regular color-21 f-14em mt-15em">'+clearNull(ret.data[i].notes_content,'无内容')+'</div>'+
				    			'<div class="w-100b over-h border-3em-de border-radius-25em clearfix mt-15em p-8em" onclick="openLearnInfo(\'edu_learn_info_header\','+ret.data[i].material.material_id+')">'+
				    			'<div class="pull-left w-60b over-h">'+
				    				'<div class="color-12 f-16em f-w mr-10em">'+clearNull(ret.data[i].material.material_title,'无标题')+'</div>'+
				    				'<div class="f-11em color-a4 mt-9em">'+clearNull(ret.data[i].notes_type_name,'无')+'</div>'+		    			
				    			'</div>'+
				    			'<div class="pull-right w-30b over-h">'+
				    				'<img class="w-80em h-58em over-h border-radius-25em" src='+((ret.data[i].material.material_thumb!=null)?(localStorage.url+ret.data[i].material.material_thumb):"../../../statics/images/images_edu/edu_special_learn1.png")+' alt="" />'+		    					    			
				    			'</div>'+		    			
				    			'</div>'+		    			
				    			'</div>'+		    			
				    		'</div>'	
				    	)
					}
				
		    			
		    			
		    		}
		    		
		    		
		    	}
			}else{
    			//无数据
    			$('#list>div').remove();
				if($('#list1 h1').length>0){
					$('#list1 h1').remove();
					$('#list1').append('<h1 class="no_more f-12em color-66 pb-10em w-100b text-center">今天没有学习笔记哦~</h1>');
				}else{
					$('#list1').append('<h1 class="no_more f-12em color-66 pb-10em w-100b text-center">今天没有学习笔记哦~</h1>');
				}
    			
    			api.hideProgress();//隐藏进度提示框
    		}
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//关键词搜索----------------------------------------------------------------
$('#keyword').keyup(function(){
	$('#list').html('');
	getEduNotesList();
})

//打开详情页---------------------------------------------------------------
function openInfo(winName,type){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+".html",
	    pageParam:{
	    	type:type,
	    }
    });
}

//刷新页面-------------------------------------------------------
function exec(){
	location.reload();
}

//日历组件 ------------------------初始化#test2------------------------------
var page=1;
laydate.render({
 	elem: '#test2'
 	,lang: 'cn'
  	,position: 'static'
 	,min: -6 //7天前
  	,max: 0 //7天后
    ,type: 'date' //默认，可不填
    ,format: 'd日' //日期组合方式 可任意组合
	,isInitValue: true //是否允许填充初始值，默认为 true
	,trigger: 'click' //如果绑定的元素非输入框，则默认事件为：click 采用click弹出
	,show: true //直接显示
  	,showBottom: false//是否显示底部栏 	 
 	 //控件初始打开的回调
 	  ,ready: function(date){
 	   $(".layui-laydate-header").addClass('di-n');//隐藏header
 	  	//隐藏5天之外
 	  if($(".layui-laydate-content tr td").hasClass('laydate-disabled')){
			$('.laydate-disabled').addClass('di-n');					
		}

 		 }
 	//日期时间被切换后的回调
	,change: function(value, date, endDate){
		var this_data=date.year+'-'+date.month+'-'+date.date;
		localStorage.setItem("time",this_data);
		var this_time_select = date.year+'-'+date.month+'-'+date.date;	
	 	$("#test3 #layui-laydate2").remove();
	 	render_test3_time(this_time_select);
		 	//监听日期被切换
		 	 lay('#testView').html(value);//切换日期时显示的值			
 	  		if($(".layui-laydate-content tr td").hasClass('laydate-disabled')){
					$('.laydate-disabled').addClass('di-n');//隐藏5天之外
				}
		var change_type=$("#notes_type").val();
		localStorage.setItem("changetype",change_type);
		$("#list").css('display','none'); 
		getEduNotesList();//获取学习笔记
	  }
	});


	
$('#tabBox4').find('li').click(function(){
	$('#list').html('');
	$('#tabBox4').find('li').removeClass('tabBox2-active').find('.active').hide();
	$(this).addClass('tabBox2-active').find('.active').show();
	is_num = $(this).attr('num');
	if(is_num==1){
		//getEduMaterialVideo();
	}else if(is_num==2){
		//getEduMaterial();
	}else if(is_num==3){
		//getEduExamList();
	}else{
		//getEduNotesList();
	}
})

//日历遮罩--------------------------------------------------------------
$(".this_month").click(function(){
	$(".this_month_mask").fadeIn(200);
	$(".this_month_mask").removeClass("di-n");
	
	
});
$(".this_month_back").click(function(){
	$(".this_month_mask").fadeOut(200);
});
//日历遮罩 日历详情页面---------------------------初始化#test3-----------------------------------
var this_time="";
var page=1;
var first_day = getCurrentMonthFirst();
var last_day = getCurrentMonthLast();
laydate.render({
 	elem: '#test3'
 	,lang: 'cn'
  	,position: 'static'
    ,type: 'date' //默认，可不填
    ,format: 'M月d日' //日期组合方式 可任意组合
    ,min: first_day
	,max: last_day
	,show: true //直接显示
	,position: 'static'
  	,showBottom: false//是否显示底部栏 	
 	 //一、控件初始打开的回调
 	 ,ready: function(date){ 	  
 	  	lay('#testView').html(1);//切换日期时显示的值	
 	 
 	}
 	//二、日期时间被切换后的回调
	,change: function(value, date, endDate){
		$(".this_month_mask").fadeOut(200);
	    $("#test2 #layui-laydate1").remove();
	  	var this_time1=date.date+'日'; 
	  	var this_time2=date.year+'-'+date.month+'-'+date.date;
	  	var this_time3 = getBeforeDate(this_time2, -6);
	//在#test3中初始化#test2
  	laydate.render({
 	elem: '#test2'
 	,lang: 'cn'
  	,position: 'static'
 	,min: this_time3 
  	,max: this_time2
    ,type: 'date' //默认，可不填
    ,format: 'd日' //日期组合方式 可任意组合
     //传入Date对象给初始值
	,value: this_time1 //参数即为：2018-08-20 20:08:08 的时间戳
	,isInitValue: true //是否允许填充初始值，默认为 true
	,trigger: 'click' //如果绑定的元素非输入框，则默认事件为：click 采用click弹出
	,show: true //直接显示
  	,showBottom: false//是否显示底部栏
 	 //一、控件初始打开的回调
 	  ,ready: function(date){
 	 // $(".laydate-day-prev").addClass("laydate-disabled");
      //$(".laydate-day-next").addClass("laydate-disabled");
 	  lay('#testView').html(1);//切换日期时显示的值	
 	   $("#test2 .layui-laydate-header").addClass('di-n');//隐藏header
 	  	//隐藏5天之外
 	  		if($(".layui-laydate-content tr td").hasClass('laydate-disabled')){
					$('.laydate-disabled').addClass('di-n');					
			}
			
		localStorage.setItem("time",this_time2);
		var change_type=$("#notes_type").val();
		localStorage.setItem("changetype",change_type);
		getEduNotesList();//获取学习笔记
	   
 		 }
 	//二、日期时间被切换后的回调
	,change: function(value, date, endDate){
		var this_time_select = date.year+'-'+date.month+'-'+date.date;
		$("#test3 #layui-laydate2").remove();
		render_test3_time(this_time_select);
		 	//监听日期被切换
		 	lay('#testView').html(value);//切换日期时显示的值		
		 	 $("#test2 .layui-laydate-header").addClass('di-n');//隐藏header 	
 	  		if($(".layui-laydate-content tr td").hasClass('laydate-disabled')){
					$('.laydate-disabled').addClass('di-n');//隐藏5天之外
				}
				
		localStorage.setItem("time",this_time_select);
		var change_type=$("#notes_type").val();
		localStorage.setItem("changetype",change_type);
		getEduNotesList();//获取学习笔记
	  
	  }
	});
	
	
	
	  }
	  
	});

		
//判断距离当前日期几天前和几天后
function getBeforeDate(strDate,n){//strDate 为字符串日期 如:'2019-01-01' n为你要传入的参数，当前为0，前一天为-1，后一天为1
	var datt = strDate.split('-');//这边给定一个特定时间
	var newDate = new Date(datt[0], datt[1]-1, datt[2]);
	var befminuts = newDate.getTime() + 1000 * 60 * 60 * 24 * parseInt(n);//计算前几天用减，计算后几天用加，最后一个就是多少天的数量
	var beforeDat = new Date;
	beforeDat.setTime(befminuts);
	var befMonth = beforeDat.getMonth()+1;
	var mon = befMonth >= 10 ? befMonth : '0' + befMonth;
	var befDate = beforeDat.getDate();
	var da = befDate >= 10 ? befDate : '0' + befDate;
	var newDate = beforeDat.getFullYear() + '-' + mon + '-' + da;
	return newDate;
	
 }

function render_test3_time(time){
	laydate.render({
 	elem: '#test3'
 	,lang: 'cn'
  	,position: 'static'
    ,type: 'date' //默认，可不填
    ,format: 'yyyy-MM-dd' //日期组合方式 可任意组合
    ,min: first_day
	,max: last_day
     //传入Date对象给初始值
	,value: time //必须遵循format参数设定的格式
	//,isInitValue: true //是否允许填充初始值，默认为 true
	//,trigger: 'click' //如果绑定的元素非输入框，则默认事件为：click 采用click弹出
	,show: true //直接显示
	,position: 'static'
  	,showBottom: false//是否显示底部栏 	
 	 //一、控件初始打开的回调
 	  ,ready: function(date){
 	  lay('#testView').html(1);//切换日期时显示的值	

 	}
 	//二、日期时间被切换后的回调
	,change: function(value, date, endDate){
	$(".this_month_mask").fadeOut(200);
	
	console.log(value); //得到日期生成的值，如：2017-08-18
    console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
    $("#test2 #layui-laydate1").remove();
  	var this_time1=date.date+'日'; 
  	
  	var this_time2=date.year+'-'+date.month+'-'+date.date;
  	var this_time3 = getBeforeDate(this_time2, -6);


  	laydate.render({
 	elem: '#test2'
 	,lang: 'cn'
  	,position: 'static'
 	,min: this_time3 //7天前-6
  	,max: this_time2 //7天后
    ,type: 'date' //默认，可不填
    ,format: 'd日' //日期组合方式 可任意组合
     //传入Date对象给初始值
	,value: this_time1 //参数即为：2018-08-20 20:08:08 的时间戳
	,isInitValue: true //是否允许填充初始值，默认为 true
	,trigger: 'click' //如果绑定的元素非输入框，则默认事件为：click 采用click弹出
	,show: true //直接显示
  	,showBottom: false//是否显示底部栏
 	 //一、控件初始打开的回调
 	  ,ready: function(date){
 	  lay('#testView').html(1);//切换日期时显示的值	
 	   $("#test2 .layui-laydate-header").addClass('di-n');//隐藏header
 	  	//隐藏5天之外
 	  		if($(".layui-laydate-content tr td").hasClass('laydate-disabled')){
					$('.laydate-disabled').addClass('di-n');					
			}

		localStorage.setItem("time",this_time2);
		var change_type=$("#notes_type").val();
		localStorage.setItem("changetype",change_type);
		getEduNotesList();//获取学习笔记
	   
 		 }
 	//二、日期时间被切换后的回调
	,change: function(value, date, endDate){
	var this_time_select = date.year+'-'+date.month+'-'+date.date;
	$("#test3 #layui-laydate2").remove();
	 render_test3_time(this_time_select);
	// alert('select2'+this_time_select);
	//$("#testView").hide();
	 if($('#testView li').length>0){
		  $('#testView li').remove();
		 }
		 	//监听日期被切换
		 	lay('#testView').html(value);//切换日期时显示的值		
		 	 $("#test2 .layui-laydate-header").addClass('di-n');//隐藏header 	
 	  		if($(".layui-laydate-content tr td").hasClass('laydate-disabled')){
					$('.laydate-disabled').addClass('di-n');//隐藏5天之外
				}
				
		localStorage.setItem("time",this_time_select);
		var change_type=$("#notes_type").val();
		localStorage.setItem("changetype",change_type);
		getEduNotesList();//获取学习笔记
	   
	  
	  }
	});
	
	
	
	  }
	  
	});

}

// 获取当前月的第一天
function getCurrentMonthFirst(){
    var date = new Date();
    date.setDate(1);
    var month = parseInt(date.getMonth()+1);
    var day = date.getDate();
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }
    return date.getFullYear() + '-' + month + '-' + day;
}
// 获取当前月的最后一天
function getCurrentMonthLast(){
    var date=new Date();
    var currentMonth=date.getMonth();
    var nextMonth=++currentMonth;
    var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
    var oneDay=1000*60*60*24;
    var lastTime = new Date(nextMonthFirstDay-oneDay);
    var month = parseInt(lastTime.getMonth()+1);
    var day = lastTime.getDate();
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }
    return date.getFullYear() + '-' + month + '-' + day;
}

//打开文章与视频详情
function openLearnInfo(winName,type){
	api.openWin({
	    name: winName,
	    url: '../edu_learn/header/'+winName+'.html',
	    pageParam:{
	    	type:type
	    }
    });
} 
//打开学习笔记页面-------------------------------------------------------------
function openScene_infowin(winName,id){
	api.openWin({
		name: winName,
		url: '../edu_special/header/'+winName+'.html',
		pageParam:{
			id:id,
		}
	})
}

//打开学习笔记页面-------------------------------------------------------------
function notes_infowin(winName,id){
	api.openWin({
		name: winName,
		url: '../edu_notes/header/'+winName+'.html',
		pageParam:{
			id:id,
		}
	})
}











