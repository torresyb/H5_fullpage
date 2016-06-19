// 散点图表组件js
var H5ComponentPoint = function(name,cfg){
    var component = new H5Component(name,cfg);
    var base = cfg.data[0][1];

    $.each(cfg.data,function(key,item){
        var $point = $("<div class='point point_"+key+"'>");
        
        // 创建文本内容
        $name = $('<div class="name">'+item[0]+'</div>');
        $per= $('<div class="per">'+item[1]*100+'px</div>');
        $name.append($per);
        $point.append($name);

        // 相对于base第一项的宽高
        var per = (item[1]/base*100)+'%';
        $point.width(per).height(per);

        // 设置背景颜色
        if(item[2]){
            $point.css('backgroundColor',item[2]);
        }


        // 设置相对于第一项的相对位置
        if(item[3]!=undefined&&item[4]!=undefined){
            //$point.css({'left':item[3],'top':item[4]});
            $point.css({'left':'25%','top':'25%'});
            $point.data('left',item[3]);
            $point.data('top',item[4]);
        }

        // 相对位置 z-index 和重新设置初始化位置
        $point.css('zIndex',100-key);

        $point.css('transition','all 1s ease-in-out '+key*0.5+'s');
        component.append($point);
    });

    // 监听事件
    component.on('onLoad', function(event) {
        event.preventDefault();
        event.stopPropagation();
        component.find('.point').each(function(index, el) {
            var $el = $(el);
            var _left = $el.data('left');
            var _top = $el.data('top');  
            if(_left!=undefined && _top!=undefined){
                $el.css({
                    'left':_left,
                    'top':_top
                });
            }
        });
    });

    component.on('onLeave', function(event) {
        event.preventDefault();
        event.stopPropagation();
        component.find('.point').each(function(index, el) {
            var $el = $(el);
            var _left = $el.data('left');
            var _top = $el.data('top');  
            if(_left!=undefined && _top!=undefined){
                $el.css({
                    'left':'25%',
                    'top':'25%'
                });
            }
        });
    });

    component.find('.point').on('click',function(){
        component.find('.point').removeClass('point_focus');
        $(this).addClass('point_focus');

        return false;
   }).eq(0).addClass('point_focus');

    return component;
};