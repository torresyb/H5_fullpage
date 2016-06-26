// 散点图表组件js
var H5ComponentBar = function(name,cfg){
    var component = new H5Component(name,cfg);
    // 遍历数据
    $.each(cfg.data,function(key,item){
        // 创建元素对象
        var $line = $("<div class='line clearfix'>");
        var $name = $("<div class='name bar'>");
        var $rate = $("<div class='rate bar'>");
        var $per = $("<div class='per bar'>");

        var _width = item[1]*100+'%';
        
        var bgStyle = '';
        if(item[2]){
            bgStyle = 'background-color:'+item[2];
        }
        $rate.width(_width);
        $name.text(item[0]);
        $rate.append('<div class="bg" style="'+bgStyle+'">');
        $per.text(_width);

        $line.append($name);
        $line.append($rate);
        $line.append($per);
        component.append($line);
    })

    return component;
};