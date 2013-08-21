/*jshint devel: true*//*global TweenMax: true*//*global Chart: true*/$(document).ready(function(){var e={s:{},genSet:function(){e.s.ani=.25;e.s.col={teal:"#08AFB7",tealDrk:"?",pink:"#ED1E79",pinkDrk:"?",sky:"#3FA9F5",skyDrk:"?",blue:"#243751",bueDrk:"?",gray:"#CCCCCC",grayDrk:"?"};e.s.prc={100:100,200:300,300:700};e.s.sld={};e.s.sld.main=$(".slider");e.s.sld.opt=e.s.sld.main.siblings(".slider-options");e.s.sld.optLi=e.s.sld.opt.find("li");e.s.sld.opt100=e.s.sld.opt.find('li[data-val="100"]');e.s.sld.opt200=e.s.sld.opt.find('li[data-val="200"]');e.s.sld.opt300=e.s.sld.opt.find('li[data-val="300"]');e.s.sld.prcNum=e.s.sld.main.siblings(".price-container").find(".price .number");e.s.shw=$(".slideshow-module");e.s.pieCht={pie1:$(".pie-1").find("canvas").get(0).getContext("2d"),pie2:$(".pie-2").find("canvas").get(0).getContext("2d"),pie3:$(".pie-3").find("canvas").get(0).getContext("2d"),pie4:$(".pie-4").find("canvas").get(0).getContext("2d")}},init:function(){e.genSet();e.genSld();e.uiLst();e.genPie()},genSld:function(){var t=e.s.sld.main;t.slider({range:"min",value:200,min:100,max:300});e.s.sld.bar=t.find(".ui-slider-range")},uiLst:function(){var t=e.s.sld.main;t.on("slidestart",function(){e.uiAct.sld.ui.slidestart()}).on("slide",function(){var n=t.slider("value");e.uiAct.sld.ui.slide(n,!1)}).on("slidestop",function(){var n=t.slider("value");e.uiAct.sld.ui.slidestop(n)}).on("mouseenter",function(){}).on("mouseleave",function(){});var n=e.s.sld.opt;n.on("click","li",function(){var n=t.slider("value");e.uiAct.sld.opt.onclick($(this),n)}).on("mouseenter","li",function(){e.uiAct.sld.opt.mouseenter($(this))}).on("mouseleave","li",function(){e.uiAct.sld.opt.mouseleave($(this))});var r=e.s.shw;r.on("mouseenter",".slideshow-options li",function(){e.uiAct.shw.opt.mouseenter($(this))}).on("mouseenter",".slideshow-image",function(){e.uiAct.shw.img.mouseenter($(this))}).on("mouseleave",".slideshow-image",function(){e.uiAct.shw.img.mouseleave($(this))})},uiAct:{sld:{ui:{slidestart:function(){var t=e.s.sld.bar;t.addClass("active")},slide:function(t,n){var r=e.uiAct.sld.ui.findVal(t),i=e.s.sld.opt,s=e.s.sld.optLi,o=e.s.sld["opt"+r];s.removeClass("active");o.addClass("active");n||i.addClass("slide");e.uiAct.sld.ui.prcAni(t)},slidestop:function(t){var n=e.s.sld.opt,r=e.s.sld.bar,i=e.uiAct.sld.ui.findVal(t);r.removeClass("active");n.removeClass("slide");e.uiAct.sld.ui.sldAni(t,i);e.uiAct.sld.ui.slide(t,!0)},findVal:function(e){return e<=150?100:e>150&&e<250?200:300},sldAni:function(t,n){function s(){r.slider("value",i.newPos);e.uiAct.sld.ui.prcAni(i.newPos)}var r=e.s.sld.main,i={newPos:t};TweenMax.to(i,.5,{newPos:n,onUpdate:s})},prcAni:function(t){var n=e.s.sld.prcNum,r=e.s.prc,i=null;t<=200?i=(t-100)/100*e.s.prc[200]:i=(t-200)/100*(e.s.prc[300]-e.s.prc[200])+e.s.prc[200];i=Math.round(i);n.text(i)},mouseenter:function(){console.log("mouseenter")},mouseleave:function(){console.log("mouseleave")}},opt:{onclick:function(t,n){var r=e.s.sld.opt,i=t.attr("data-val");e.uiAct.sld.ui.sldAni(n,i);r.find("li").removeClass("active");t.addClass("active")},mouseenter:function(e){e.addClass("enter")},mouseleave:function(e){e.removeClass("enter")}}},shw:{opt:{mouseenter:function(t){var n=e.s.shw,r=t.siblings("li"),i=t.attr("data-val");n.attr({"data-val":i});r.removeClass("enter");t.addClass("enter")}},img:{mouseenter:function(e){e.addClass("enter")},mouseleave:function(e){e.removeClass("enter")}}}},genPie:function(){var t=[{value:30,color:e.s.col.gray},{value:50,color:e.s.col.pink},{value:100,color:e.s.col.sky},{value:40,color:e.s.col.blue}],n=e.s.pieCht.pie1,r=e.s.pieCht.pie2,i=e.s.pieCht.pie3,s=e.s.pieCht.pie4;(new Chart(n)).Doughnut(t);(new Chart(r)).Doughnut(t);(new Chart(i)).Doughnut(t);(new Chart(s)).Doughnut(t)}};(function(){e.init()})()});