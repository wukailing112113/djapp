var page=1;
var pageParamName = '';
apiready = function(){
	getHrPartyList('');
	openPullRefresh('getHrPartyList("","pull")')
//	evenScrolltobottom("getHrPartyList('')")
	api.parseTapmode();
	pageParamName = api.pageParam.name;
}
function save(){
	var id=$('input:checked').attr('party_no')
	var name=$('input:checked').prev().html()
	if(!id){
		alert("请选择党支部");
		return false;
	}else{
		if(pageParamName=="hr_transfer_edit"){
		api.execScript({
		    name: 'hr_transfer_edit_header',
		    frameName: 'hr_transfer_edit',
		    script: 'branchSelection("'+name+'","'+id+'")'
		});
	}else{
		api.execScript({
		    name: 'login',
		    frameName: 'mine_personal_login',
		    script: 'cc("'+name+'","'+id+'")'
		});
	}
	}

	api.closeWin({
    });
}
function getHrPartyList(party_name,pull){
	if(pull=='pull'){
		page=1;
		$('#list').html('');
	}
	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_party_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"party_name":party_name,//关键字搜索
	    		"page":page,
	    		"pagesize":10
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			for(var i=0;i<ret.data.length;i++){
	    			$('#list').append(
	    				'<div class="aui-input-row">'+
				            '<label class="aaui-input-addon">'+ret.data[i].party_name+'</label>'+
				            '<input party_no="'+ret.data[i].party_no+'" class="aui-pull-right aui-radio aui-radio-info" type="radio" name="demo">'+
				        '</div>'
	    			)
	    		}
	    		page++;
			}
			else{
				$('#more').remove();
				$('#list').append(
					'<li id="more" class="aui-list-view-cell aui-text-center">'+
			           ' 无更多数据'+
			        '</li>'
				)
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
function doSearch(){
	$api.addCls($api.dom(".aui-searchbar-wrap"),"focus");
	$api.dom('.aui-searchbar-input input').focus();
}
function cancelSearch(){
	$api.removeCls($api.dom(".aui-searchbar-wrap.focus"),"focus");
	$api.val($api.byId("search-input"),'');
	$api.dom('.aui-searchbar-input input').blur();
}
function clearInput(){
	$api.val($api.byId("search-input"),'');
}
function search(){
	var content = $api.val($api.byId("search-input"));
	if(content){
		getHrPartyList(content,'pull');
	}else{
		api.alert({
		    title: '搜索提示',
		    msg: '您没有输入任何内容'
		});
	}
	cancelSearch();
}