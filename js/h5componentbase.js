var H5Component = function(name,cfg){
    var cfg = cfg || {};
    var id =  ('h5_c_'+(Math.random()*99+1)).replace('.','_');
    var cls = 'h5_component_'+cfg.type+' h5_component_name_'+name;
    var cls_type = 'h5_component_'+cfg.type;
    var component = $('<div class="h5_component '+cls+'" id="'+id+'">');
    
    cfg.width && component.width(cfg.width/2);
    cfg.height && component.height(cfg.height/2);

    cfg.text && component.text(cfg.text);
    cfg.css && component.css(cfg.css);
    cfg.bg && component.css('backgroundImage', 'url("'+cfg.bg+'")');

    if(cfg.center===true){
        component.css({
            marginLeft: (cfg.width/4 * -1)+'px',
            left: '50%'
        });
    }


    // 监听事件
    component.on('onLoad', function(event) {
        event.preventDefault();
        event.stopPropagation();
        component.addClass(cls_type+'_load').removeClass(cls_type+'_leave');
        
        cfg.animateIn && component.animate(cfg.animateIn,1000,'linear');
    });

    component.on('onLeave', function(event) {
        event.preventDefault();
        event.stopPropagation();
        component.addClass(cls_type+'_leave').removeClass(cls_type+'_load');
        
        cfg.animateOut && component.animate(cfg.animateOut,1000,'linear');
    });

    return component;
};