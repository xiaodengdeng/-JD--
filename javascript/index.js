

    documentReady(function() {
    /*-------section01中左侧导航栏js----------------*/
        var oSection01_left = document.getElementById('sec01_left');
        var oNav= document.getElementById('sec01_nav');
        var aNav_li= oNav.children;
        var aNav_ex= hxsd_tools.getByClass(oSection01_left,"nav_ex");
        var timer_off=null;
        var timer_move=null;
        for(var i=0; i<aNav_li.length;i++){
            aNav_li[i].index=i;
            aNav_li[i].onmouseover=function(){
                clearTimeout(timer_move);
                clearTimeout(timer_off);
                for(var j=0; j<aNav_ex.length; j++){
                   aNav_ex[j].style.display="none";
                   aNav_li[j].className="";
                }
                this.className="active";
                aNav_ex[this.index].style.display="block";
            }
            aNav_li[i].onmouseout=function(){
                var _this= this;
                timer_off=setTimeout(function(){
                    aNav_ex[_this.index].style.display="none";
                    _this.className="";
                },200)     
            }
            aNav_ex[i].onmouseover=function(){
                clearTimeout(timer_off);
                clearTimeout(timer_move);
            }
            aNav_ex[i].onmouseout=function(){
                var _this=this;
                timer_move= setTimeout(function(){
                    _this.style.display="none";
                    for(var j=0; j<aNav_li.length; j++){
                        aNav_li[j].className="";
                    }
                },200)  
            }
        }

    /*---------------------section01中间banner--------------------*/
        
        var oShow_b= document.getElementById('show_banner');
        hxsd_widget.slide(oShow_b,true);
    /*----------------------tab选项卡-----------------------------*/
        var aTab_list= hxsd_tools.getByClass(document,"tab");
        var aTab_cont= hxsd_tools.getByClass(document,"tab_content");
       
        for(var i=0; i<aTab_list.length; i++){
            hxsd_widget.tab(aTab_list[i],aTab_cont[i]);
        }
    /*------------------FLOOR中的轮播图片----------------------*/
        var aFloor_ban= hxsd_tools.getByClass(document,"floor_banner");
        for(var i=0; i<aFloor_ban.length; i++){
            hxsd_widget.slide(aFloor_ban[i]);

        }

    /*-----------------------定位导航-----------------*/

        var aFloor_fix = hxsd_tools.getByClass(document,'floor_fix');
        var aNav_fix =hxsd_tools.getByClass(document,'fix_nav')[0].children;
       
        window.onscroll=function(){
            for(var i=0; i<aFloor_fix.length-1; i++){  
                
                if(document.body.scrollTop>=aFloor_fix[i].offsetTop&&document.body.scrollTop<aFloor_fix[i+1].offsetTop){
                    aNav_fix[i].getElementsByTagName('h3')[0].innerHTML= aNav_fix[i].getElementsByTagName('span')[0].innerHTML;
                    aNav_fix[i].getElementsByTagName('h3')[0].className="active";                   
                }
                else{
                    aNav_fix[i].getElementsByTagName('h3')[0].innerHTML=(i+1)+"F";
                    aNav_fix[i].getElementsByTagName('h3')[0].className="";
                }
           }
           if(document.body.scrollTop>=aFloor_fix[aFloor_fix.length-1].offsetTop){
                aNav_fix[aFloor_fix.length-1].getElementsByTagName('h3')[0].innerHTML= aNav_fix[aFloor_fix.length-1].getElementsByTagName('span')[0].innerHTML;
                aNav_fix[aFloor_fix.length-1].getElementsByTagName('h3')[0].className="active";
           }
           else{
                aNav_fix[aFloor_fix.length-1].getElementsByTagName('h3')[0].innerHTML=aFloor_fix.length+"F";
                aNav_fix[aFloor_fix.length-1].getElementsByTagName('h3')[0].className="";
           }
                
        }
    })