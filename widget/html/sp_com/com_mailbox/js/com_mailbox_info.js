apiready = function(){
	getImailInfo();//调用（书记信箱详情）接口
}
var missiveAttach = '';

//获取书记信箱详情接口------------------------------
function getImailInfo(){
	var url = localStorage.url+"/index.php/Api/Life/get_imail_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"communist_no":localStorage.user_id,
	            "type":api.pageParam.type,
	            "imail_id":api.pageParam.id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status){
    			$('#imail_title').html(clearNull(ret.data.imail_title,'无'));//标题
    			$('#add_time').html(clearNull(ret.data.add_time,'0'));//时间
    			if(api.pageParam.type==1){
    				$('#name').html(clearNull(ret.data.send_name,'无')).prev('div').html('发送人');//发件人
    			}else{
    				$('#name').html(clearNull(ret.data.receive_name,'无')).prev('div').html('收件人');//收件人
    			}
    			$('#imail_content').html(clearNull(ret.data.imail_content,'无'));//内容
    		}else{
    			api.toast({msg: ret.msg ,duration:3000,location: 'top'});
    		}
    	}else{
    		api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
