////初始化加载
//apiready=function(){
////	get_dept_list();//加载部门列表
//}
////加载部门列表
//function get_dept_list(){
//	//showProgress();//加载等待
//	//ajax获取数据处理
//	var url = localStorage.url+"Api/Hr/get_dept_list";
//	api.ajax({
//	    url:url,
//	    method: 'post',
//	    timeout: 100,
//	    data: {//传输参数
//	    	values: { 
//	        }
//	    }
//  },function(ret,err){
//  	if(ret){
//  		if(ret.status == 1){
//  			var list = ret.list;
//  			//一级分类
//				for(var i = 0; i < list.length; i++){
//					$("#department").append(
//						'<li class="aui-list-view-cell level_1" onclick="dropDownSwitch(this,1,'+list[i].dept_no+')">'+
//							'<span class="aui-iconfont aui-icon-list pl-20 fsize-18"><span class="ml-10">'+list[i].dept_name+'</span></span>'+
//							'<span class="aui-pull-right">'+
//								'<span class="aui-iconfont aui-icon-unfold pr-100"></span>'+
//							'</span>'+
//						'</li>'+
//						'<div id="type_'+i+'"></div>'
//					)
//					//二级分类
//					var list_2 = list[i].list;
//					for(var j = 0; j < list_2.length; j++){
//						$("#type_"+i).append(
//							'<li class="aui-list-view-cell level_2 bg-color-white1" onclick="dropDownSwitch(this,2,'+list_2[j].dept_no+')">'+
//								'<span class="pl-50 fsize-16">'+list_2[j].dept_name+'</span>'+
//								'<span class="aui-pull-right">'+
//									'<span class="aui-iconfont aui-icon-right pr-100 level_right_2"></span>'+
//								'</span>'+
//							'</li>'+
//							'<div id="type_'+i+"_"+j+'" class="di-n fsize-14"></div>'
//						)
//						//三级分类
//						var list_3 = list_2[j].list;
//						if(list_3 != undefined){
//							for(var k = 0; k < list_3.length; k++){
//								$("#type_"+i+"_"+j).append(
//									'<li class="aui-list-view-cell level_3 bg-color-white3" onclick="dropDownSwitch(this,3,'+list_3[k].dept_no+')">'+
//										'<span class="pl-80">'+list_3[k].dept_name+'</span>'+
//									'</li>'
//								)
//							}
//						}
//					}
//				}
//			}
//			api.hideProgress();//隐藏进度提示框
//  	}else{
//  		api.hideProgress();//隐藏进度提示框
//  		/**无网络提示 */
//	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
//  	}
//  });
//}
//
////切换下拉及加载数据
//function dropDownSwitch(obj,type,dept_no){
//	if(type == 1 || type == 2){
//		$(obj).siblings(".level_1,.level_2").next().slideUp();//关闭非当前行分类
//		$(obj).next().slideToggle();//切换当前分类显示与隐藏
//		if(type == 1){//当切换一级分类时清除所有分当前状态
//			$(".level_2").next().slideUp();//关二级分类
//			$(".level_2").children(".aui-pull-right").children("span").removeClass("aui-icon-fold").addClass("aui-icon-unfold")
//			$(".level_2,.level_3").attr("style","");
//		}
//	}
//	//更换选中颜色
//	if($(obj).attr("style") != "" && $(obj).attr("style") != undefined){//关闭
//		$(obj).attr("style","");
//		//展开否更换图标
//		$(obj).children(".aui-pull-right").children("span").removeClass("aui-icon-fold").addClass("aui-icon-unfold")
//	}else{//打开
//		$(obj).siblings(".level_1,.level_2,.level_3").attr("style","");
//		//展开否更换图标
//		$(obj).children(".aui-pull-right").children("span").addClass("aui-icon-fold");
//		$(obj).siblings(".level_1,.level_2").children(".aui-pull-right").children("span").removeClass("aui-icon-fold").addClass("aui-icon-unfold")
//		if(type == 1){
//			$(obj).attr("style","background: #021422");
//		}else if(type == 2){
//			$(obj).attr("style","background: #1f435b");
//		}else{
//			$(obj).attr("style","background: #3a7aa0");
//			//关闭侧滑
////			api.closeSlidPane();
//		}
//		
//	}
//	//判断是否为选择方式
//	if(api.pageParam.type=="choice"){
//		api.execScript({
//			name: 'phoneBook',
//	        script: 'getPhoneBook("'+api.pageParam.type+'",'+dept_no+');',
//	        
//	    });
//	}else{
//	    //展开分类更换数据
//		api.execScript({
//			name: 'index',
//			frameName: 'phoneBook',
//	        script: 'getPhoneBook("'+api.pageParam.type+'",'+dept_no+');'
//	    });
//	}
//}
//
////获取我的关注
//function getFollow(){
//	//判断是否为选择方式
//	if(api.pageParam.type=="choice"){
//		api.execScript({
//			name: 'phoneBook',
//	        script: 'getPhoneBook("'+api.pageParam.type+'","",'+localStorage.user_id+');'
//	    });
//	}else{
//	    //展开分累更换数据
//		api.execScript({
//			name: 'index',
//			frameName: 'phoneBook',
//	        script: 'getPhoneBook("'+api.pageParam.type+'","",'+localStorage.user_id+');'
//	    });
//	}
//	//关闭侧滑
//	api.closeSlidPane();
//}