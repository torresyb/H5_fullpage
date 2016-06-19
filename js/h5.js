// 内容管理对象
var H5 = function(){
    this.page = []; // 存储页面，供后面fullpage 调用
    // 创建元素
    this.id = ('h5_'+(Math.random()*99+1)).replace('.', '_');
    this.el = $('<div id="'+this.id+'" class="h5">').hide();
    
    $('body').append(this.el);
    
    /**
     * 新增一个页面
     * @param {string} name 组件名称，会加入到classname中
     * 
     * @param {string} text 页内默认文本
     * @return {h5} h5对象，可以重复使用
     * 
     */
    this.addPage = function(name, text){
        var page = $('<div class="h5_page section">');

        name!=undefined && page.addClass('h5_page_'+name);
        text!=undefined && page.text(text);
        this.el.append(page);
        this.page.push(page);
        return this;
    };

    // 添加组件
    this.addComponent = function(name, cfg){
        var cfg = cfg || {};
        cfg = $.extend({type:'base'},cfg);

        var component; // 组件元素

        switch (cfg.type) {
            case 'base':
                component = new H5Component(name,cfg);        
                break;
            default:
                // statements_def
                break;
        }
        this.page.slice(-1)[0].append(component);

        return this;
    };

    this.loader = function(){
        this.page[0].find('.h5_component').trigger('onLoad');
        this.el.fullpage({
            'onLeave': function(index, nextIndex, direction){
                $(this).find('.h5_component').trigger('onLeave');
            },
            'afterLoad': function(index, nextIndex, direction){
                $(this).find('.h5_component').trigger('onLoad');
            }
        });
        this.el.show();
    }

    return this;
};