//打电话
function callTel(tel){
	api.call({
	    number:tel
    });
}

//打开新页面
function openNewWin(winName){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{}
    });
}