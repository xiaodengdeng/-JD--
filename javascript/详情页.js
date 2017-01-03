 function zoom(oBox_view,oBox_move,oBox_zoom,oImg){
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
				
			}

 documentReady(function(){
 	var oShow= document.getElementById('main_show_id');
 	var oShow_box = hxsd_tools.getByClass(oShow,"show_box")[0];
 	var oShow_banner = hxsd_tools.getByClass(oShow,"show_banner")[0];
 	hxsd_widget.tab(oShow_banner,oShow_box);

 	/*------------------放大镜--------------------------*/

 	var zoom_box = document.getElementById('zoom_box_id');
 	var oImg_zoom = zoom_box.getElementsByTagName('img')[0];
 	var move_box = document.getElementById('move_box');
 	var aImg = oShow_box.getElementsByTagName('img');
 	zoom(oShow_box,move_box,zoom_box,oImg_zoom);
 	oShow_box.onmouseover=function(){
 		for(var i=0; i<aImg.length; i++){
 			if(aImg[i].style.display=="block"){
 				zoom_box.children[0].src="images/phone_"+(i+1)+".jpg";
 			}		
 		}
 		move_box.style.display="block";
		zoom_box.style.display="block";		
 	};

 	oShow_box.onmouseout=function(){
 		move_box.style.display="none";
		zoom_box.style.display="none";
 	};

 	/*-----------------购买数量------------------*/
 	var oBuy = document.getElementById('buy_n');
 	var aBtn = oBuy.getElementsByTagName('button');
 	var oInput = oBuy.getElementsByTagName('input')[0];
 	aBtn[0].onclick= function(){
 		var sum = parseInt(oInput.value);
 		sum++;
 		oInput.value=sum;
 	};
 	aBtn[1].onclick= function(){
 		var sum = parseInt(oInput.value);
 		sum--;
 		if(sum<1) sum=1;
 		oInput.value=sum;
 		
 	}

 	/*--------------选项选择--------------------*/
 	var aItem = hxsd_tools.getByClass(document,"item");
 	var oUl=[];
 	for(var i=0; i<aItem.length; i++){
 		oUl[i] = aItem[i].getElementsByTagName('ul')[0];
 		var aLi = oUl[i].children;
 		for(var j=0; j<aLi.length; j++){
 			aLi[j].index = i;
 			if(j==0) {
 				aLi[j].className="select";
 				var oImg=document.createElement('img');
 				oImg.className="foot";		
 				oImg.src="images/footer_l.jpg";
 				aLi[j].appendChild(oImg);
 			}

 			aLi[j].onclick = function(){

 				for(var k=0; k<oUl[this.index].children.length; k++){
 					// console.log(j,k);
 					if(oUl[this.index].children[k].getElementsByClassName('foot')[0]){
 						var oImage=oUl[this.index].children[k].getElementsByClassName('foot')[0];
 						oUl[this.index].children[k].removeChild(oImage);
 					}
 					oUl[this.index].children[k].className="";
 				}
 				this.className="select";
 				/*--------------------添加选中符号-------------------*/
 				var oImg=document.createElement('img');
 				oImg.className="foot";		
 				oImg.src="images/footer_l.jpg";
 				this.appendChild(oImg);

 			}
 			aLi[j].onmouseover = function(){
				if(this.className!="select")
 					this.className="active";
 			}
 			aLi[j].onmouseout= function(){
 				if(this.className!="select")
 					this.className="";
 			}
 		}
 	}

 	/*----------------运送地址选择-----------------*/
 	var oAdd_Select = document.getElementById('add_select');
 	var address = document.getElementById('address_id');
 	var oClose= document.getElementById('closer');
 	var oTab = hxsd_tools.getByClass(address,"tab")[0];
 	var oTab_cont= hxsd_tools.getByClass(address,"tab_cont")[0];
 	oAdd_Select.onmouseover =function(){
 		this.className="over";
 		address.style.display="block";
 	}
 	oClose.onclick =function(){
 		oAdd_Select.className="";
 		address.style.display="none";
 	}
 	hxsd_widget.tab_click(oTab,oTab_cont);

 	/*------------下方组合选项卡---------------------*/
 	var oPro_ex= document.getElementById('productEx_id');
 	var oTab_ex= hxsd_tools.getByClass(oPro_ex,"tab_header")[0];
 	var oTab_contEx=hxsd_tools.getByClass(oPro_ex,"tab_content")[0];
 	var aTab_contEx=oTab_contEx.children;
 	console.log(aTab_contEx[0]);
 	for(var i=0; i<aTab_contEx.length;i++){
 		aTab_contEx[i].style.display="none";
 	}
 	hxsd_widget.tab_click(oTab_ex,oTab_contEx);
 }) 	
