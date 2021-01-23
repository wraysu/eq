// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:widgets/RelatedTableCharts/setting/ChartThemeSelector.html":'\x3cdiv style\x3d"width: 232px; position: relative;"\x3e\r\n    \x3cdiv class\x3d"esriCTselectedItemNode"  data-dojo-attach-event\x3d"onclick: _onDropDownClick"\x3e\r\n        \x3cdiv class\x3d"esriCTThemeItem"\x3e\r\n            \x3cdiv class\x3d"esriCTThemeChart" data-dojo-attach-point\x3d"selectedThemeChart"\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv  class\x3d"esriCTThemeName" data-dojo-attach-point\x3d"selectedThemeName"\x3e\r\n            \x3c/div\x3e\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"esriCTDropSelect jimu-float-trailing" data-dojo-attach-point\x3d"dropArrowNode"\r\n        data-dojo-attach-event\x3d"onclick: _onDropDownClick"\x3e\r\n        \x3cdiv class\x3d"jimu-icon jimu-icon-down-arrow-8"\x3e\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"esriCTThemeChooserList" data-dojo-attach-point\x3d"themeChooseNode" style\x3d"display: block"\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"themeList"\x3e\r\n            \x3c/div\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e\r\n'}});
define("dojo/_base/declare jimu/BaseWidgetSetting dijit/_WidgetsInTemplateMixin dojo/text!./ChartThemeSelector.html dojo/_base/lang dojox/charting/Chart2D dojo/on dojo/dom-style dojo/dom-attr dojo/dom-construct dojo/_base/array".split(" "),function(k,l,m,n,f,p,q,d,c,e,h){return k([l,m],{baseClass:"jimu-widget-RelatedTableCharts-setting",templateString:n,selectedTheme:null,themes:[],postCreate:function(){this._setThemes();this.themes&&0<this.themes.length&&(this.selectedTheme=f.clone(this.themes[0]),
this._createThemeList())},destroy:function(){this.inherited(arguments)},_setThemes:function(){this.themes=[{themeDisplayName:this.nls.ThemeSelector.themeAdobebricks,className:"dojox/charting/themes/Adobebricks",themeName:"Adobebricks"},{themeDisplayName:this.nls.ThemeSelector.themeAlgae,className:"dojox/charting/themes/Algae",themeName:"Algae"},{themeDisplayName:this.nls.ThemeSelector.themeBahamation,className:"dojox/charting/themes/Bahamation",themeName:"Bahamation"},{themeDisplayName:this.nls.ThemeSelector.themeBlueDusk,
className:"dojox/charting/themes/BlueDusk",themeName:"BlueDusk"},{themeDisplayName:this.nls.ThemeSelector.themeCubanShirts,className:"dojox/charting/themes/CubanShirts",themeName:"CubanShirts"},{themeDisplayName:this.nls.ThemeSelector.themeDesert,className:"dojox/charting/themes/Desert",themeName:"Desert"},{themeDisplayName:this.nls.ThemeSelector.themeDistinctive,className:"dojox/charting/themes/Distinctive",themeName:"Distinctive"},{themeDisplayName:this.nls.ThemeSelector.themeDollar,className:"dojox/charting/themes/Dollar",
themeName:"Dollar"},{themeDisplayName:this.nls.ThemeSelector.themeGrasshopper,className:"dojox/charting/themes/Grasshopper",themeName:"Grasshopper"},{themeDisplayName:this.nls.ThemeSelector.themeGrasslands,className:"dojox/charting/themes/Grasslands",themeName:"Grasslands"},{themeDisplayName:this.nls.ThemeSelector.themeGreySkies,className:"dojox/charting/themes/GreySkies",themeName:"GreySkies"},{themeDisplayName:this.nls.ThemeSelector.themeHarmony,className:"dojox/charting/themes/Harmony",themeName:"Harmony"},
{themeDisplayName:this.nls.ThemeSelector.themeIndigoNation,className:"dojox/charting/themes/IndigoNation",themeName:"IndigoNation"},{themeDisplayName:this.nls.ThemeSelector.themeIreland,className:"dojox/charting/themes/Ireland",themeName:"Ireland"},{themeDisplayName:this.nls.ThemeSelector.themeMiamiNice,className:"dojox/charting/themes/MiamiNice",themeName:"MiamiNice"},{themeDisplayName:this.nls.ThemeSelector.themeMinty,className:"dojox/charting/themes/Minty",themeName:"Minty"},{themeDisplayName:this.nls.ThemeSelector.themePurpleRain,
className:"dojox/charting/themes/PurpleRain",themeName:"PurpleRain"},{themeDisplayName:this.nls.ThemeSelector.themeRoyalPurples,className:"dojox/charting/themes/RoyalPurples",themeName:"RoyalPurples"},{themeDisplayName:this.nls.ThemeSelector.themeSageToLime,className:"dojox/charting/themes/SageToLime",themeName:"SageToLime"},{themeDisplayName:this.nls.ThemeSelector.themeTufte,className:"dojox/charting/themes/Tufte",themeName:"Tufte"},{themeDisplayName:this.nls.ThemeSelector.themeWatersEdge,className:"dojox/charting/themes/WatersEdge",
themeName:"WatersEdge"},{themeDisplayName:this.nls.ThemeSelector.themeWetlandText,className:"dojox/charting/themes/Wetland",themeName:"Wetland"},{themeDisplayName:this.nls.ThemeSelector.themePlotKitblue,className:"dojox/charting/themes/PlotKit/blue",themeName:"PlotKit.blue"},{themeDisplayName:this.nls.ThemeSelector.themePlotKitcyan,className:"dojox/charting/themes/PlotKit/cyan",themeName:"PlotKit.cyan"},{themeDisplayName:this.nls.ThemeSelector.themePlotKitgreen,className:"dojox/charting/themes/PlotKit/green",
themeName:"PlotKit.green"},{themeDisplayName:this.nls.ThemeSelector.themePlotKitorange,className:"dojox/charting/themes/PlotKit/orange",themeName:"PlotKit.orange"},{themeDisplayName:this.nls.ThemeSelector.themePlotKitpurple,className:"dojox/charting/themes/PlotKit/purple",themeName:"PlotKit.purple"},{themeDisplayName:this.nls.ThemeSelector.themePlotKitred,className:"dojox/charting/themes/PlotKit/red",themeName:"PlotKit.red"}]},_onDropDownClick:function(){"none"===d.get(this.themeChooseNode,"display")?
this.showChooseNode():this.hideChooseNode()},showChooseNode:function(){d.set(this.themeChooseNode,"display","")},hideChooseNode:function(){d.set(this.themeChooseNode,"display","none")},_createThemeList:function(){var a=[];h.forEach(this.themes,function(b){a.push(b.className)});require(a,f.hitch(this,function(){h.forEach(this.themes,f.hitch(this,function(b){var a,g,d;a=e.create("div",{"class":"esriCTThemeItem",title:b.themeDisplayName},this.themeList);c.set(a,"themeDisplayName",b.themeDisplayName);
c.set(a,"themeClass",b.className);c.set(a,"themeName",b.themeName);q(a,"click",f.hitch(this,function(){var b={themeDisplayName:c.get(a,"themeDisplayName"),className:c.get(a,"themeClass"),themeName:c.get(a,"themeName")};this.selectTheme(b)}));g=dojo.create("div",{"class":"esriCTThemeChart"},a);d=dojo.create("div",{"class":"esriCTThemeName"},a);g=e.create("div",{},g);e.create("div",{className:"title",innerHTML:b.themeDisplayName},d);this._createChart(b.themeName,g)}));this.selectTheme(this.selectedTheme)}))},
_createChart:function(a,b){b=e.create("div",{className:"chart"},b);b=new p(b);b.setTheme(dojo.getObject("dojox.charting.themes."+a));b.addPlot("default",{type:"Pie",radius:11,labels:!1,radGrad:"vml"===dojox.gfx.renderer?"fan":"native"});b.addSeries("Series A",[.35,.25,.42,.53,.69]);b.render()},selectTheme:function(a){this.selectedThemeChart&&e.empty(this.selectedThemeChart);this.selectedTheme={themeDisplayName:a.themeDisplayName||a.themeName,className:a.className,themeName:a.themeName};this._createChart(a.themeName,
this.selectedThemeChart);c.set(this.selectedThemeName,"innerHTML",this.selectedTheme.themeDisplayName);this.hideChooseNode();this.onThemeSelect(this.selectedTheme)},onThemeSelect:function(a){}})});