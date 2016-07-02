// 散点图表组件js
var H5ComponentPolyline =function ( name, cfg ) {

  //  完成 component 的初始化定义
  var component =  new H5Component( name ,cfg );

  var w = cfg.width;
  var h = cfg.height;

  // 创建画布对象并添加到component中 网格背景
  var cvs = document.createElement('canvas');
  var ctx = cvs.getContext('2d');
  cvs.width = ctx.width = w;
  cvs.height = ctx.height = h;
  component.append(cvs);

  var step = 10;
  // 水平网格线
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#aaa";

  // 画水平线
  for (var i = step; i >= 0; i--) {
    var y = (h/step)*i;
    ctx.moveTo(0,y);
    ctx.lineTo(w,y);
  };

  // 画垂直线
  var datas = cfg.data.length+1;
  var txt_w = Math.floor(w/datas);
  for (var i = datas; i >= 0; i--) {
    var x = (w/datas)*i;
    ctx.moveTo(x,0);
    ctx.lineTo(x,h);
    if(cfg.data[i]){
      var $text = $("<div class='text'>");
      $text.text(cfg.data[i][0]);
      $text.css({
        width:txt_w/2,
        left:(x/2+txt_w/2-txt_w/4),
        '-webkit-transition-delay':(i*0.2+2)+'s'
      });
      component.append($text);
    }
  };

  ctx.stroke();

  // 创建画布对象并添加到component中 绘制折线
  var cvs = document.createElement('canvas');
  var ctx = cvs.getContext('2d');
  cvs.width = ctx.width = w;
  cvs.height = ctx.height = h;
  component.append(cvs);
  
  
  // 绘制折线和阴影，并执行动画
  var draw = function(pre){
    // 清除画布
    ctx.clearRect(0,0,w,h);
    // 折线基本样式
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#ff8878";
    // 根据数据画圆
    var x = 0;
    var y =0;
    for (var i = datas-1; i >0; i--) {
      var item = cfg.data[i-1];
      x = (w/datas)*i;
      y = h-h*item[1]*pre;
      ctx.moveTo(x, y);
      ctx.arc(x,y,5,0,2*Math.PI);  
    };

    // 链接圆点
    ctx.moveTo(w/datas,(h-h*cfg.data[0][1]*pre));
    for (var i=1; i<datas;i++) {
      var item = cfg.data[i-1];
      x = (w/datas)*i;
      y = h-h*item[1]*pre;
      ctx.lineTo(x,y);
    };
    
    // 绘制阴影
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(225,225,225,0)';

    ctx.lineTo(x,h);
    ctx.lineTo(w/datas,h);
    ctx.lineTo(w/datas,(h-h*cfg.data[0][1]*pre));
    ctx.fillStyle = 'rgba(225,118,118,0.2)';
    ctx.fill();

    // 写数据
    for (var i = datas-1; i >0; i--) {
      var item = cfg.data[i-1];
      x = (w/datas)*i;
      y = h-h*item[1]*pre;
      ctx.moveTo(x, y);
      ctx.fillStyle = item[2]?item[2]:'#595959';
      ctx.font = "24px Arial";
      ctx.fillText(((item[1]*100)>>0)+'%',x-20,y-20);
    };


    ctx.stroke();
  }
  // 监听component 页面加载动画
  component.on('onLoad', function(event) {
    event.preventDefault();
    var s = 0;
    for (var i = 0; i <100; i++) {
      setTimeout(function(){
        s +=0.01;
        draw(s);
      },i*10+1000);
    };
  });

  component.on('onLeave', function(event) {
    event.preventDefault();
    var s = 1;
    for (var i = 0; i <100; i++) {
      setTimeout(function(){
        s-=0.01;
        draw(s);
      },i*10);
    };
  });

  return component;
}