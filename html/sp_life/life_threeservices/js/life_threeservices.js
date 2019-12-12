apiready = function(){	
	getHrPartyList();
	getBdBannerList('bannerList',10,1);//获取banner
	// alert(localStorage.dept_no)
	// getHrPartyInfo(1);
}

function getHrPartyList(){
//alert(localStorage.dept_no)
	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_party_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"type":''
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
    				for(var i=0;i<ret.data.length;i++){
    					if(localStorage.dept_no==ret.data[i].party_no){
    						getHrPartyInfo(localStorage.dept_no);
    					}else{
    						//getHrPartyInfo(ret.data[0].party_no);
    					}
    				}
    			}
			}
			else{
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//三务公开-------------------------------------------------------------------------
function getHrPartyInfo(party_no){
	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_party_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		party_no:party_no,
	    		
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    		//alert(ret.data.party_name)
    			$('#party_name').html(ret.data.party_name);
    			$('#party_name').attr('party_no',party_no);
    			$('#memo').html(ret.data.memo);
    			
			}
			else{
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

function openlist(winName,type){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	"type":type,
	    	"id":$('#party_name').attr('party_no')
	    }
    });
}

//轮播
var slide = new auiSlide({
    container:document.getElementById("aui-slide"),
    // "width":300,
    "height":200,
    "speed":300,
    "autoPlay": 3000, //自动播放
    "pageShow":true,
    "pageStyle":'dot',
    "loop":true,
    'dotPosition':'center',
    
})
var slide3 = new auiSlide({
    container:document.getElementById("aui-slide3"),
    // "width":300,
    "height":240,
    "speed":500,
    "autoPlay": 3000, //自动播放
    "loop":true,
    "pageShow":true,
    "pageStyle":'line',
    'dotPosition':'center'
})
