apiready=function(){
    //加载数据
    load();
}
window.onload=function(){

}
    
//关键词搜索
//点击搜索条事件
function doSearch(){
    $api.addCls($api.dom(".aui-searchbar-wrap"),"focus");
    $api.dom('.aui-searchbar-input input').focus();
}

//点击取消搜索事件
function cancelSearch(){
    $api.removeCls($api.dom(".aui-searchbar-wrap.focus"),"focus");
    $api.val($api.byId("search-input"),'');
    $api.dom('.aui-searchbar-input input').blur();
}

//赋值方法
function clearInput(){
    $api.val($api.byId("search-input"),'');
}

//搜索后内容回调
function search(){
    var content = $api.val($api.byId("search-input"));
    if(content){
        api.alert({
            title: '搜索提示',
            msg: '您输入的内容为：'+content
        });
    }else{
        api.alert({
            title: '搜索提示',
            msg: '您没有输入任何内容'
        });
    }
    cancelSearch();
}
//加载数据
function load(){
  //类型
   //ajax获取数据处理
    api.ajax({
        url:localStorage.url+"Api/Bd/get_type_list",
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "type_group": "bug_type"
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status == 1){
                for(var i=0;i<ret.list.length;i++){
                    $("#type_list").append(
                        '<div class="aui-flex-item-3" onclick="bug_swith(this)">'+
                            '<div class="noselect ml-10 mr-5 mb-10 bor-ra-7 fsize-12 lh-22 h-35 aui-ellipsis-1" name="" id="'+ret.list[i].type_no+'">'+
                            '<i class="aui-iconfont aui-icon-check color-lan di-n mr-2"></i>'+ret.list[i].text+'</div>'+
                        '</div>'                      
                    )
                }
            }
            api.hideProgress();//隐藏进度提示框
        }else{
            api.hideProgress();//隐藏进度提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    });
    //加载状态
    //ajax获取数据处理
    api.ajax({
        url:localStorage.url+"Api/Bd/get_status_list",
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "status_group": "bug_status"
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status == 1){
                for(var i=0;i<ret.list.length;i++){
                    $("#status_list").append(
                        '<div class="aui-flex-item-6" onclick="bug_swith(this)">'+
                            '<div class="noselect ml-10 mr-5 mb-10 bor-ra-7 fsize-12 lh-22 h-35 aui-ellipsis-1" name="" id="'+ret.list[i].value+'">'+
                            '<i class="aui-iconfont aui-icon-check color-lan di-n mr-2"></i>'+ret.list[i].text+'</div>'+
                        '</div>'                      
                    )
                }
            }
            api.hideProgress();//隐藏进度提示框
        }else{
            api.hideProgress();//隐藏进度提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    });
}   
//切换方法
function bug_swith(obj){
    //通过name判断是否选中name=""证明没有选中，name为aui-bg-info证明已经选中
    if($(obj).children("div").attr("name")==""){
        $(obj).children("div").attr("name","select");
        $(obj).children("div").addClass("select").removeClass("noselect");
        $(obj).children("div").children("i").removeClass("di-n");
        return;
    }
    if($(obj).children("div").attr("name")=="select"){
        $(obj).children("div").attr("name","")
        $(obj).children("div").addClass("noselect").removeClass("select");
        $(obj).children("div").children("i").addClass("di-n");
        return;
    }
}
//搜索方法
function bug_search(){
    var bug_keyword=$("#search-input").val();//关键词
    var start_time=$("#start_time").val();//开始时间
    var end_time=$("#end_time").val();//结束时间
    var bug_type="";//类型编号
    var bug_status="";//状态

    $("#type_list .select").each(function(){
        bug_type+=$(this).attr("id")+","
    })
    $("#status_list .select").each(function(){
        bug_status+=$(this).attr("id")+","
    })
    if(bug_type!=""){
        bug_type=bug_type.substring(0,bug_type.length-1);
    }
    if(bug_status!=""){
        bug_status=bug_status.substring(0,bug_status.length-1);
    }
    api.openWin({
        name: 'bug_search_listHeader',
        url: 'header/bug_search_listHeader.html',
        pageParam:{
            "bug_keyword":bug_keyword,//关键词
            "start_time":start_time,//开始时间
            "end_time":end_time,//结束时间
            "bug_type":bug_type,//类型
            "bug_status":bug_status,//状态
        }
    });
}

//时间选择器
(function($) {
    $.init();
    var btns = $('[name="date"]');
    btns.each(function(i, btn) {
        btn.addEventListener('tap', function() {
            var optionsJson = this.getAttribute('data-options') || '{}';
            var options = JSON.parse(optionsJson);
            var id = this.getAttribute('id');
            /*
             * 首次显示时实例化组件
             * 示例为了简洁，将 options 放在了按钮的 dom 上
             * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
             */
            var picker = new $.DtPicker(options);
            picker.show(function(rs) {
                /*
                 * rs.value 拼合后的 value
                 * rs.text 拼合后的 text
                 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
                 * rs.m 月，用法同年
                 * rs.d 日，用法同年
                 * rs.h 时，用法同年
                 * rs.i 分（minutes 的第二个字母），用法同年
                 */
                btn.value = rs.text;
                /* 
                 * 返回 false 可以阻止选择框的关闭
                 * return false;
                 */
                /*
                 * 释放组件资源，释放后将将不能再操作组件
                 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
                 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
                 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
                 */
                picker.dispose();
            });
        }, false);
    });
})(mui);