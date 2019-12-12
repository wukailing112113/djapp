apiready = function(){
	getHrCommunistChangeInfo();//获取我的党员关系转移状态
}

//获取我的党员关系转移状态--------------------------------------------------------
function getHrCommunistChangeInfo(){
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_communist_change_info";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				"change_id":api.pageParam.id,//转移详情数据id
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				/*判断字段是否返回正常，状态时候存在，并且状态不处于 0（未提交） 5（转移完成）状态下*/
				if(ret.data&&ret.data.change_audit_status){
					if(ret.data.change_audit_status==50){/*5(状态驳回)*/
						$('#changeTypeBox').find('div').addClass('grad color-white');
						$('#changeTypeBox').find('div').eq(i).html('驳回');
						$('#changeTypeBox').find('i').addClass('color-ff3032');
					}else{
					var cc = ret.data.change_audit_status.substring(0,1);
						for(var i=0;i<cc;i++){
							$('#changeTypeBox').find('div').eq(i).addClass('grad color-white');
							
						}
						for(var i=0;i<(cc-1);i++){
							$('#changeTypeBox').find('i').eq(i).addClass('color-ff3032');
						}
					}
				}
				$('#start_time').html(ret.data.start_time);//转出时间
				$('#type_name').html(ret.data.type_name);//转出类型
				$('#new_party').html(ret.data.new_party);//当前组织
				$('#old_party').html(ret.data.old_party);//转出组织
				$('#memo').html(ret.data.memo);//备注
			}else{
				alert("无更多数据");
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}