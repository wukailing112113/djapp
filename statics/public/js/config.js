//根据项目配置文件进行区分要显示的模块
var config = ["kb","notice","memo","wp","up","num","sign_first","ap","dp","mdtt","eaa","dm","vr","raavl","cust","business","communicate","project","bug","sign","document","hall","home","pw","stage","tsoa","gas","link","or","intelligence","report","myRemind","myNotice","myWorkPlan","myTask","myArrange","myApproval"];
var getConfig = function(){
	for(var i = 0; i < config.length;i++){
		////同步返回结果：全局配置主路径
		var appKey = api.loadSecureValue({
		    sync:true,
		    key:config[i]
		});
		if(appKey=="false"||localStorage.getItem(config[i])=="false"){//false为不显示所以清除
			if(config[i]=='notice'){
				$('#myNotice').remove();
			}else if(config[i]=='wp'){
				$('#myWorkPlan').remove();
			}else if(config[i]=='mdtt'){
				$('#myTask').remove();
			}else if(config[i]=='ap'){
				$('#myArrange').remove();
			}else if(config[i]=='eaa'){
				$('#myApproval').remove();
			}
	    	$("#"+config[i]).remove();
	    }
	}
}

//加载项目logo
var getLogo = function(){
	//异步返回结果：全局配置主路径
	api.loadSecureValue({
	    key:'logo'
	}, function(ret, err){   
	    $("#logo").html(ret.value);
	});
}