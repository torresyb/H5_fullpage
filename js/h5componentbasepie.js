// 雷达组件js
var H5ComponentPie =function ( name, cfg ) {

  //  完成 component 的初始化定义
  var component =  new H5Component( name ,cfg );

  var w = cfg.width;
  var h = cfg.height;

  // 创建画布对象并添加到component中 网格背景
  var cvs = document.createElement('canvas');
  var ctx = cvs.getContext('2d');
  cvs.width = ctx.width = w;
  cvs.height = ctx.height = h;
  $(cvs).css('zIndex',1);
  component.append(cvs);

  var r = w/2;
  // 加入底图层
  ctx.beginPath();
  ctx.fillStyle="#eee";
  ctx.strokeStyle="#eee";
  ctx.lineWidth =1;
  ctx.arc(r,r,r,0,2*Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // 绘制数据层
  var cvs = document.createElement('canvas');
  var ctx = cvs.getContext('2d');
  cvs.width = ctx.width = w;
  cvs.height = ctx.height = h;
  $(cvs).css('zIndex',2);
  component.append(cvs);

  var colors=['orange','blue','green','greenyellow','gray'];
  var start_angel = 1.5*Math.PI;
  var end_angel = 0;
  var full_angel = 2*Math.PI;

  var step = cfg.data.length;
  for (var i = 0; i < step; i++) {
    var item = cfg.data[i];
    var color = item[2] || colors.shift();

    end_angel = start_angel+full_angel*item[1];
    ctx.beginPath();
    ctx.fillStyle=color;
    ctx.strokeStyle=color;
    ctx.lineWidth =.1;
    ctx.moveTo(r, r);
    ctx.arc(r,r,r,start_angel,end_angel);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    start_angel = end_angel;

    // 加入文本以及百分比
    var text = $('<div class="text">');
    text.text(item[0]);
    var per = $('<div class="per">');
    per.text(item[1]*100+'%');
    text.append(per);

    var x = r+Math.sin(0.5*Math.PI-start_angel)*r;
    var y = r+Math.cos(0.5*Math.PI-start_angel)*r;
    
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

  // 加入一个蒙版层
  var cvs = document.createElement('canvas');
  var ctx = cvs.getContext('2d');
  cvs.width = ctx.width = w;
  cvs.height = ctx.height = h;
  $(cvs).css('zIndex',3);
  component.append(cvs);

  ctx.fillStyle="#eee";
  ctx.strokeStyle="#eee";
  ctx.lineWidth =1;
  // 绘制折线和阴影，并执行动画
  var draw = function(pre){
    ctx.clearRect(0,0,w,h);

    ctx.beginPath();
    
    ctx.moveTo(r, r);
    if (pre==0) {
      ctx.arc(r,r,r,0,full_angel);
    }else{
      ctx.arc(r,r,r,start_angel,start_angel+2*Math.PI*pre,true);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    if( pre >= 1){
      ctx.clearRect(0,0,w,h);
    }
  };

  draw(0);

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