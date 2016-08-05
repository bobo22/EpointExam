$(function() {
    //此处功能为右侧标题的切换功能

    //初始化
    var $rtitle = $('.righttable-title ul'),
        $rnowtitle = $rtitle.find('li:first()'),
        $rhistitle = $rtitle.find('li:last()'),
        $currentv = $('.current-version'),
        $historyv = $('.history-version');

    //当前版本点击事件
    $rhistitle.on('click', function() {
        $rhistitle.addClass('checkstatus');
        $rhistitle.css('font-weight', 'normal');
        $rnowtitle.css('font-weight', 'bold');
        $currentv.hide();
        $historyv.show();
        $rnowtitle.removeClass('checkstatus');

    });
    //历史版本点击事件
    $rnowtitle.on('click', function() {
        $rnowtitle.addClass('checkstatus');
        $rnowtitle.css('font-weight', 'normal');
        $rhistitle.css('font-weight', 'bold');
        $currentv.show();
        $historyv.hide();
        $rhistitle.removeClass('checkstatus');
    });

    //下面js部分为mock数据模拟部分
    var infos = Mock.mock("test/getinfo", {
        "list|2-7": [{
            "version|+1": 1,
            "filesize": "@float(100, 1000, 1, 2)" + "KB",
            "email": "@email(hotmail.com)",
            "uploadtime": "@date('yyyy-MM-dd  HH:mm:ss')",
            "operate|1": [
                "新增",
                "删除",
                "修改",
                "查找"
            ]
        }]
    });
    $.ajax({
        url: "test/getinfo",
        type: "GET",
        dataType: "json",
        success: function(data) {
            var template = $('#template').html();
            var rendered = Mustache.render(template, data);
            $(".history-version").find('table thead').after(rendered);
        }
    });
})
