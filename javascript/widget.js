// JavaScript Document


var hxsd_widget={
	/*-------------黑色蒙版组件--------------*/
	 'modal':function(){
		var modal=document.createElement('div');
		
	    modal.id="black_modal";
	    modal.className="modal";
		document.body.appendChild(modal);
	},
	/*-----------------登录弹框组件-----------------*/
	 'login':function(){
		
		/*运行黑色蒙版*/
		hxsd_widget.modal();	
		/*---------------创建登录框---------------------*/
		var oBox =document.createElement('div');
		oBox.innerHTML='<h4>用户登录<a href="#" href="javascript:;">x</a></h4>'+
	    '<p><label>用户名:<input type="text" /></label></p>'+
	    '<p><label>密　码:<input type="password"></label></p>'+
	    '<Button type="button">登录</Button>';
	    oBox.id="box";
	    oBox.className="loginbox";
		document.body.appendChild(oBox);
		
		/*-------------登录框添加行为---------------------*/
		var oBtn= document.getElementById('Btn_login'); 
		var oBox= document.getElementById('box');
		var oModal= document.getElementById('black_modal');
		var title= oBox.getElementsByTagName('h4')[0];
		var closer= title.getElementsByTagName('a')[0];
		var aInput= document.getElementsByTagName('input');
		aInput[0].onmousedown=function(ev){
			var oEv = ev || window.event;
			oEv.cancelBubble=true;	 // 禁止事件冒泡
		}
		aInput[1].onmousedown=function(ev){
			var oEv = ev || window.event;
			oEv.cancelBubble=true;	 //禁止事件冒泡
		}
		
		oBox.style.display=oModal.style.display="block";
		hxsd_tools.center_box(oBox);	
		hxsd_tools.drag(oBox);
		
		closer.onclick= function(){
			document.body.removeChild(oBox);
			document.body.removeChild(oModal);
		}
	},
	/*----------------------警告弹框------------------------*/

	 'alert_box':function(text){  // text是警告弹框里的文本
		/*----加黑色蒙版---------*/
		hxsd_widget.modal();
		var oModal= document.getElementById('black_modal');
		oModal.style.display="block";
		/*-----警告弹框---------*/
		var oDiv= document.createElement('div');
		oDiv.className="alert_box";
		oDiv.innerHTML="<p>"+text+"</p><button type='button'>确定</button>";
		document.body.appendChild(oDiv);
		hxsd_tools.center_box(oDiv); //要先显示再居中，因为只有显示后才能计算宽高
		oDiv.getElementsByTagName('button')[0].onclick=function(){
			document.body.removeChild(oDiv);
			document.body.removeChild(oModal);	
		}
	},
	/*-----------------错误提示------------------------*/

	'error_box':function(text,delay_time){ // text 为提示文本  delay_time 为提示延迟消失时间
		//插入到页面当中
		var oBox= document.createElement('div');
		var timer=null;
		var t=delay_time||2000;
		oBox.className="error_box";
		//居中显示，并具有最大宽度
		hxsd_tools.center_box(oBox);
		oBox.innerHTML=text;
		document.body.appendChild(oBox);
		hxsd_tools.center_box(oBox);
		//2秒以后，自动消失，从页面移出
			timer=setTimeout(function(){
			document.body.removeChild(oBox);
		    }, t);
		
		//鼠标移入，不消失
		oBox.onmouseover=function(){
			clearTimeout(timer);
		}
		oBox.onmouseout=function(){
			document.body.removeChild(oBox);
		}
	},

/*-----------------文本收起以及展开------------------*/
/*要用此组件，必须满足以下结构
	<div id>
		<span></span>  span里面用于放文字
		<a href=""></a>  a里面用于放“收起”或“详情”
	</div>
*/
	 'showMoreTxt':function(id,text,num){  //id 为父亲盒子的id ， text 是文本， num 是要截取的字数
		var oPar= document.getElementById(id);
		var oSpan= document.getElementsByTagName('span')[0];
		var oLink= oPar.getElementsByTagName('a')[0];
		var text_par=text.substr(0,num)+"....";  //这是截取的部分字体
		var show=true;  // 显示开关
		oSpan.innerHTML=text_par;  // 初始状态为未完整显示
		oLink.onclick=function(){
			if(show) {
				oSpan.innerHTML=text;  // 显示完整文字
				this.innerHTML="[收起]";
				show=false;
			}else{
				oSpan.innerHTML=text_par;  // 显示部分文字
				this.innerHTML="[详情]";
				show=true;
			}
		}
	},
/*---------------带回调函数的confirm弹框----------------*/
	 'confirmBox':function(txt,callback){  // callback为回调函数，其行为可以自己随意定义
				var oBox = document.createElement('div');
				oBox.className="confirmBox";
				oBox.innerHTML='<p>'+txt+'</p>'+
								'<button class="y">确定</button>'+
								'<button class="n">取消</button>';
				document.body.appendChild(oBox);
				hxsd_tools.center_box(oBox); // 只有先在文档中存在，才能绝对居中
				hxsd_tools.drag(oBox);
				var aBtn = document.getElementsByTagName('button');
				aBtn[0].onclick = function(){
					document.body.removeChild(oBox);
					callback(); // 启用回调函数
				};
				aBtn[1].onclick = function(){
					document.body.removeChild(oBox);
				};

	},
	/*------------------------滚动轮播图-----------------------------------------*/
    'slide':function(obj,num){ //obj为展示框对象，num 是判断下标按钮是否加数字
        		var oBtn_list= obj.getElementsByTagName('ol')[0];
        		var oBanner= obj.getElementsByTagName('ul')[0];
                var aImg= oBanner.children;
                var show_index=0;
                var li_w = aImg[0].offsetWidth;
                var timer=null;
                var Btn_l=obj.getElementsByTagName('a')[0];
                var Btn_r=obj.getElementsByTagName('a')[1];
                oBanner.style.width = li_w*aImg.length+"px";

                for(var i=0; i<aImg.length; i++){
                	var oBtn = document.createElement('li')
                	if(num) oBtn.innerHTML=i+1;
                	if(i==0) oBtn.className="active";
                	oBtn_list.appendChild(oBtn);
                }
                
                var aLi = oBtn_list.children;
                function active_item(index){//封装一个函数，其定义被选中的行为
                    for(var i=0; i<aLi.length;i++)
                        aLi[i].className="";
                    aLi[index].className="active";
                    show_index=index;
                    hxsd_tools.move(oBanner,{"left":-li_w*index},500);
                }
                
                function autorun(){
                    clearInterval(timer);
                    timer=setInterval(function(){   
                        if(show_index==aLi.length){
                            show_index=0;
                            oBanner.style.left= li_w+"px";
                            active_item(show_index);
                        }else{
                            active_item(show_index);    
                        }
                        show_index++;
                    },3000);
                };
                
                autorun();

                obj.onmouseover=function(){
                    clearInterval(timer);
                    for(var i=0; i<aLi.length; i++){
                        if(aLi[i].className=="active")
                        show_index=i;   
                    };
                    Btn_l.style.display=Btn_r.style.display="block";
                }
                obj.onmouseout=function(){
                    autorun();
                    Btn_l.style.display=Btn_r.style.display="none";  
                }

                for(var i=0; i<aLi.length; i++){
                    aLi[i].index=i;
                    aLi[i].onclick = function(){
                        active_item(this.index);
                    }       
                }

                Btn_l.onclick= function(){
                    if(show_index==0){
                        show_index=aLi.length-1;
                        oBanner.style.left= -li_w*aImg.length+"px";
                        active_item(show_index);
                    }else{
                        show_index--;
                        active_item(show_index);
                    }       
                }
                
                Btn_r.onclick= function(){
                    if(show_index==aLi.length-1){
                        show_index=0;
                        oBanner.style.left= li_w+"px";
                        active_item(show_index);
                    }else{
                        show_index++;
                        active_item(show_index);
                    }       
                }   
            },
  /*----------------------------Tab-----------------------------*/
  'tab':function(Tab,Tab_cont){  //Tab 为 选项卡对象 Tab_cont为相应内容对象
		var aTab= Tab.children;
		var aTab_cont= Tab_cont.children;
		for(var i=0; i<aTab.length; i++){
			if(i==0) aTab_cont[i].style.display="block";
			else aTab_cont[i].style.display="none";
		}
		for( var i=0; i<aTab.length; i++){
			aTab[i].index= i;
			if(i==0) aTab[i].className="active";
			aTab[i].onmouseover=function(){
				for(var j=0; j<aTab.length; j++){
					aTab[j].className="";	
					aTab_cont[j].style.display="none";
				}
				
				this.className="active";
				aTab_cont[this.index].style.display="block";
			}	
		}			
	},
	 /*----------------------------Tab点击切换-----------------------------*/
  'tab_click':function(Tab,Tab_cont){  //Tab 为 选项卡对象 Tab_cont为相应内容对象
		var aTab= Tab.children;
		var aTab_cont= Tab_cont.children;
		for(var i=0; i<aTab.length; i++){
			if(i==0) aTab_cont[i].style.display="block";
			else aTab_cont[i].style.display="none";
		}
		for( var i=0; i<aTab.length; i++){
			aTab[i].index= i;
			if(i==0) aTab[i].className="active";
			aTab[i].onclick=function(){
				for(var j=0; j<aTab.length; j++){
					aTab[j].className="";	
					aTab_cont[j].style.display="none";
				}
				
				this.className="active";
				aTab_cont[this.index].style.display="block";
			}	
		}			
	}
}








