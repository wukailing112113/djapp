apiready = function(){
	getBdTypeList();//获取转出类型
}

//获取转出类型--------------------------------------------------------
function getBdTypeList(){
	var url = localStorage.url+"/index.php/Api/Public/get_bd_type_list";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				"type_group":"change_type",//转出类型
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				if(ret.data&&ret.data.length>0){
					for(var i=0;i<ret.data.length;i++){
						$('#changeList').append(
							'<option value="'+ret.data[i].type_no+'">'+ret.data[i].type_name+'</option>'
						)
					}
//					turnOut();
				}
			}else{
				alert('无更多数据');
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}

//系统内与系统外转出切换-----------------------------------------------
function turnOut(){
	if($("#changeList").val()=='1'){
			api.openWin({
	            name: "phonebook_select",
	            url: "../../sp_com/com_phonebook/header/com_phonebook_select_header.html",
	            pageParam:{
	            	name:"hr_transfer_edit",
	            }
            });
            
	}else{
	}
}

function qingkong(){
	$('#new_party').val('');
}


//转出类型改吧-------------------------------------------------------------
//$("#changeList").change(function(){
//	turnOut();
//})

function branchSelection(name,id){
	if(name!=='undefined'){
		$('#new_party').val(name);
	}
	if(id!=='undefined'){
		$('#new_party').attr("partyid",id);
	}
}

//提交党员关系转移申请--------------------------------------------------------
function setHrCommunistChange(){
	//alert(localStorage.user_id);
	//alert($("#changeList").val());//转出类型
//	alert($('#new_party').attr("partyid"));//转入组织
//	alert($('#memo').val());//备注
	if($('#new_party').val()==""){
		alert('请填写转入组织');
		return
	}
	var url = localStorage.url+"/index.php/Api/Hr/set_hr_communist_change";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				"communist_no":localStorage.user_id,//登录人编号
				"change_type":$("#changeList").val(),//转出类型
				"new_party":$('#new_party').attr("partyid"),//转入部门编号
				"memo":$('#memo').val(),//备注
			}
		}
	},function(ret,err){	
		if(ret){
			if(ret.status==1){
				alert('提交成功');
				api.execScript({
					name: 'hr_transfer_header',
					frameName: 'hr_transfer',
	                script: 'exec();'
                });
                api.closeWin();
			}else{
//				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
				alert('提交失败');
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}