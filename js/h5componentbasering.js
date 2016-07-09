// 雷达组件js
var H5ComponentRing =function ( name, cfg ) {
  if (cfg.data.length>0) {
    cfg.data = [cfg.data[0]];
  };
  cfg.type = 'pie';
  //  完成 component 的初始化定义
  var component =  new H5ComponentPie( name ,cfg );

  // 添加环形图特有的样式
  component.addClass('h5_component_ring');
  
  // 把创建好的遮罩元素添加到组件中
  var mask = $('<div class="mask">');
  component.append(mask);

  var text = component.find('.text');

  text.attr('style','');
  if(cfg.data[0][2]){
    text.css('color',cfg.data[0][2]);
  }
  // 在遮罩元素( .mask ) 中添加文本信息
  mask.append( text );
  

  return component;
}