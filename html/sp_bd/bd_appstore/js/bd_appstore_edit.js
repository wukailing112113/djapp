apiready = function () {
	getConfig();//加载配置文件	
}
var config = ["partyWork","matrix","discover","transfer","moving","attmeeting","secretary","integral","fa","special","learn","notes","exam","platform","bbs","helpwin","threeservices","survey","problem","volunteer","notice","document","instructions","workplan","phone","chat"];
var getConfig = function(){
	for(var i = 0; i < config.length;i++){
		////同步返回结果：全局配置主路径
		var appKey = api.loadSecureValue({
		    sync: true,
    		key: config[i]
		});
		if(appKey=="false"){//false为不显示所以清除
//	    	$("#"+config[i]).remove();
	    	$("#"+config[i]).addClass('di-n');
	    }else{
	    	$("#"+config[i]).removeClass('di-n');
	    }
	}
}
//function select(){
//	alert("判断是否选中");
//	$("[type='checkbox']").each(function(index,element){
//		if(!$(element).is(':checked')){
//			localStorage.setItem($(element).parent().attr('id'),'false');	
//		}else{
//			localStorage.setItem($(element).parent().attr('id'),'true');
//		}
//	})
//}
