apiready = function () {
	getConfig();//加载配置文件	
}
//关闭当前页
function closeWin(){
	api.closeFrame({});
}

//打开OA模块
function openOaWin(winName,type){
	localStorage.openList=true;
	api.openWin({
	    name: winName,
	    url: '../../official/oa/header/'+winName+'.html',
	    animation:{
	    	type:"movein",                //动画类型（详见动画类型常量）
		    subType:"from_bottom"       //动画子类型（详见动画子类型常量）
	    },
	    pageParam:{
	    	type:type
	    }
    });
    closeWin();
}

//打开CRM模块
function openCrmWin(winName,type,type_id){
	localStorage.openList=true;
	api.openWin({
	    name: winName,
	    url: '../../official/crm/header/'+winName+'.html',
	    animation:{
	    	type:"movein",                //动画类型（详见动画类型常量）
		    subType:"from_bottom"       //动画子类型（详见动画子类型常量）
	    },
	    pageParam:{
	    	type:type,
	    	type_id:type_id
	    }
    });
    closeWin();
}

//打开PMS模块
function openPmsWin(winName){
	localStorage.openList=true;
	api.openWin({
	    name: winName,
	    url: '../../official/pms/header/'+winName+'.html',
	    animation:{
	    	type:"movein",                //动画类型（详见动画类型常量）
		    subType:"from_bottom"       //动画子类型（详见动画子类型常量）
	    },
    });
    closeWin();
}

//打开HR模块
function openHrWin(winName,type){
	localStorage.openList=true;
	api.openWin({
	    name: winName,
	    url: '../../official/hr/header/'+winName+'.html',
	    animation:{
	    	type:"movein",                //动画类型（详见动画类型常量）
		    subType:"from_bottom"       //动画子类型（详见动画子类型常量）
	    },
	    pageParam:{
	    	type:type,
	    }
    });
    closeWin();
}