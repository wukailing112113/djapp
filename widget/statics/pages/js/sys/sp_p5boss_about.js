
function openNewWin(winName){
	//打开新页面
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{}
    });
}
function openfeedbackWin(winName){
	//打开新页面
	api.openWin({
	    name: winName,
	    url: '../../sp_mine/mine_feedback/header/'+winName+'.html',
	    pageParam:{}
    });
}