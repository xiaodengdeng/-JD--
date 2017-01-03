// JavaScript Document



var hxsd_tools={
	/*拖拽函数组件  box是拖拽的盒子，title是盒子的标题; 如果有标题，则拖拽标题移动，否则拖动盒子移动。标题在盒子内部*/
	'drag':function(box,title){
		//------------------handle句柄-----------------------------------
		var handle;	
		handle=title?title:box;
		
//------------------拖拽功能----------------------------------	
		var b_w= document.documentElement.clientWidth;
		var b_h= document.documentElement.clientHeight;
		handle.onmousedown=function(ev){//按下鼠标，记录下错位位置
			var oEv =ev || window.event;
			var disX= oEv.clientX-box.offsetLeft; // left 的错位位置
			var disY= oEv.clientY-box.offsetTop; // top 的错位位置
			document.onmousemove=function(ev){
				var oEv= ev || window.event;
				
				var left=oEv.clientX -disX;
				var top=oEv.clientY-disY;
				//确定屏幕的边界
				if(left<0) left=0;
				if(left>b_w-box.offsetWidth) left= b_w-box.offsetWidth;
				box.style.left=left+"px" ;
				
				if(top<0) top=0;
				if(top>b_h-box.offsetHeight) top= b_h-box.offsetHeight;
				box.style.top=top+"px" ;
					
			}	
					document.onmouseup=function(){  //这里用document是为了在鼠标离开屏幕松开时同样释放事件
					document.onmousemove=null;	
				}
				return false;			
		}	
	},
	/*----------------------对一个盒子进行屏幕居中---------------------------------*/
	'center_box':function(elm){
			elm.style.display="block";
			var l = (document.documentElement.clientWidth - elm.offsetWidth)/2;
			var t = (document.documentElement.clientHeight - elm.offsetHeight)/2;
			elm.style.position="absolute";
			elm.style.left=l+"px";
			elm.style.top=t+"px";
	},
	/*--------------------清除空白节点-----------------------------------------*/

	'cleanSpace':function(elm) {  
	    for(var i=0; i<elm.childNodes.length; i++){   
	        var node = elm.childNodes[i];
	        if(node.nodeType==3 && !/\S/.test(node.nodeValue)) node.parentNode.removeChild(node);   
	    }   
	}, 

	/*--------------------为对象添加监听事件（兼容所有浏览器）--------------------*/
	 'addEvent':function(obj,oEv,fn){ //obj 为对象， oEv 是动作， fn 为要执行的函数
			if(obj.attachEvent) obj.attachEvent('on'+oEv,fn);
			else obj.addEventListener(oEv,fn,false)
	},

	/*--------------------获取对象的样式值--------------------------*/
	 'getStyle':function(obj, name){ // obj要查找的对象  name 属性名称，要用引号引住，其为字符串
		var value=obj.currentStyle ? obj.currentStyle[name]:getComputedStyle(obj, false)[name];
		if(name=='opacity'){
			value=Math.round(parseFloat(value)*100);
		}
		else{
			value=parseInt(value);
		}
		return value;
	},

	/*------------------获得具有相同类的对象集合-------------------*/
	 'getByClass':function(oParent,cls){ // oParent 父级对象， cls为类名（字符串）
		var arr=[]; //容器
		var aEl=oParent.getElementsByTagName('*');//所有标签
		if(document.getElementsByClassName(cls)) return document.getElementsByClassName(cls);
		else{
			for(var i=0;i<aEl.length;i++){
				//if(aEl[i].className==cls) arr[arr.length]=aEl[i];//向数组中添加
				if(aEl[i].className==cls) arr.push(aEl[i]);//向数组中添加
			}
			return arr;
		}
		
	},

	/*-----------------对象改变动画，可以同时改变多个属性*/
	 'move':function(obj,modeJson,stopTime,callback){ // obj 要移动的对象，modeJson为改变属性对象，其中存放所有要改变的属性及重点值 stopTime 走完所用时间, callback为回调函数
				clearInterval(obj.timer);
				/*-----设置一个速度对象，里面存放所有预置的停止时间*/
				var speed={
					'verySlow':5000,
					'slow':2000,
					'normal':1000,
					'fast':500,
					'veryFast':300
				};

				if(stopTime){
					if(typeof stopTime == "string"){
						stopTime= speed[stopTime];
					}
				}else{
					stopTime=speed.normal;
				}

				var start={}; // 建立一个start 空对象
				var dis={};  // 建立一个距离dis的空对象
				for( var key in modeJson){
					start[key] = hxsd_tools.getStyle(obj,key); // 创建start起始键值
					dis[key] = modeJson[key]-start[key]; // 创建并计算距离差对象键值
				}

				var count = parseInt(stopTime/30); // 按30ms将总时间分成若干份
				var n=0;  // 计算每次改变的份数

				 obj.timer=setInterval(function(){
					n++;
					var a = 1 -n/count;
					for( var key in modeJson){
						var dis_step = start[key]+dis[key]*(1-a*a*a); // 每次改变的步长
						if(key=="opacity"){
							obj.style.opacity = dis_step/100;  // 如果是透明度，要进行相应的转换
							obj.style.filter='alpha(opacity:'+dis_step+')';
						}else{
							obj.style[key]=dis_step +"px";
						}
					}	
					if(n==count){
						clearInterval(obj.timer);
						callback&&callback(); //这里验证并启动回调函数，可以在本次动画执行后继续执行后续动画
					}
				}, 30);
			},
		'zoom':function(oBox_view,oBox_move,oBox_zoom,oImg){
				oBox_view.onmousemove=function(ev){
					var oEv= ev||window.event;
					var l= oEv.pageX-oBox_view.offsetLeft-oBox_move.offsetWidth/2;
					var t= oEv.pageY-oBox_view.offsetTop-oBox_move.offsetHeight/2;
					// console.log(oBox_move.offsetWidth,oBox_move.offsetHeight);
					//console.log(oEv.pageX,oEv.pageY);
					if(l<0) l=0;
					if(t<0) t=0;
					if(l>oBox_view.offsetWidth-oBox_move.offsetWidth) l=oBox_view.offsetWidth-oBox_move.offsetWidth;
					if(t>oBox_view.offsetHeight-oBox_move.offsetHeight) t=oBox_view.offsetHeight-oBox_move.offsetHeight;
					oBox_move.style.left=l+"px";
					oBox_move.style.top=t+"px";
					
					var rate_x= l/(oBox_view.offsetWidth-oBox_move.offsetWidth);
					var rate_y=t/(oBox_view.offsetHeight-oBox_move.offsetHeight);
					oImg.style.left=(oBox_zoom.offsetWidth-oImg.offsetWidth)*rate_x+"px";
					oImg.style.top=(oBox_zoom.offsetHeight-oImg.offsetHeight)*rate_y+"px";
				}
				oBox_view.onmouseover=function(){
					oBox_move.style.display="block";
					oBox_zoom.style.display="block";
				}
				oBox_view.onmouseout=function(){
					oBox_move.style.display="none";
					oBox_zoom.style.display="none";
				}
			}
		 
}
	
	
/*-----------------------启动加载函数---------------------------*/

function documentReady(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded', fn, false);
	}
	else{
		document.attachEvent('onreadystatechange', function (){//IE兼容
			if(document.readyState=='complete'){
				fn && fn();
			}
		});
	}
};


