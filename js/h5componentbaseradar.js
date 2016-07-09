// 雷达组件js
var H5ComponentRadar =function ( name, cfg ) {

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

  // 绘制网格背景 10份
  var r = w/2;
  var step = cfg.data.length;
  var is_blue = false;
  for (var s =10; s > 0; s--) {
    // 圆上找点公式 圆心（a,b） 半径r
    // x = a+sin((2*Math.PI/360)*(360/step)*i)*r;
    ctx.beginPath();
    for (var i = 0; i <step; i++) {
      var rad = (2*Math.PI/360)*(360/step)*i;
      var x = r+Math.sin(rad)*r*(s/10);
      var y = r+Math.cos(rad)*r*(s/10);
      ctx.lineTo(x,y);
    };
    ctx.closePath();
    ctx.fillStyle = (is_blue = !is_blue) ? '#99c0ff':'#f1f9ff';
    ctx.fill();
  };

  // 绘制伞骨图
  for (var i = 0; i < step; i++) {
    var rad = (2*Math.PI/360)*(360/step)*i;
    var x = r+Math.sin(rad)*r;
    var y = r+Math.cos(rad)*r;
    ctx.moveTo(r, r);
    ctx.lineTo(x,y);
    var text = $("<div class='text'>");
    text.text(cfg.data[i][0]);
    // text.css({left:x/2,top:y/2});
    if(x>r){
      text.css('left',x/2);
    }else{
      text.css('right',(w-x)/2);
    }
    if(y>r){
      text.css('top',y/2);
    }else{
      text.css('bottom',(h-y)/2);
    }
    if(cfg.data[i][2]){
      text.css('color',cfg.data[i][2]);
    }
    component.append(text);
  };
  ctx.strokeStyle="#e0e0e0";
  ctx.stroke();
  
  // 创建画布对象并添加到component中 数据层
  var cvs = document.createElement('canvas');
  var ctx = cvs.getContext('2d');
  cvs.width = ctx.width = w;
  cvs.height = ctx.height = h;
  ctx.strokeStyle="#f00";
  component.append(cvs);
  
  
  // 绘制折线和阴影，并执行动画
  var draw = function(pre){
    // 清除画布
    ctx.clearRect(0,0,w,h);
    
    // 输入折线
    ctx.beginPath();
    for (var i = 0; i < step; i++) {
      var rad = (2*Math.PI/360)*(360/step)*i;
      var rate = cfg.data[i][1]*pre;
      var x = r+Math.sin(rad)*r*rate;
      var y = r+Math.cos(rad)*r*rate;
      ctx.lineTo(x,y);
    };
    ctx.closePath();
    ctx.stroke();
    // 圆点
    ctx.fillStyle="#ff7676";
    for (var i = 0; i < step; i++) {
      var rad = (2*Math.PI/360)*(360/step)*i;
      var rate = cfg.data[i][1]*pre;
      var x = r+Math.sin(rad)*r*rate;
      var y = r+Math.cos(rad)*r*rate;
      ctx.beginPath();
      ctx.arc(x,y,5,0,2*Math.PI);
      ctx.closePath();
      ctx.fill();
    };
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