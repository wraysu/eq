// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/declare","dojo/_base/lang","dojo/on","./settingComponents","./SettingObject"],function(c,k,l,a,m){return c(m,{_inputControl:null,constructor:function(b,n,e,f,c,g,h){b=[];var d;d=a.checkboxCtl("inline-block",!1);b.push(d.div);this._inputControl=d.ctl;h&&this.own(l(this._inputControl,"change",k.hitch(this,h)));g&&b.push(a.text("hint",g));this._mainDiv=a.container("flexbox "+(n||""),"minorTrailingHorizGap",[a.container("inline-block "+(e?e:""),"",[a.text("static-text",c)]),a.container("inline-block "+
(f?f:""),"minorTrailingVertGap",b)])},setValue:function(b){this._inputControl&&this._inputControl.set("value",b)},getValue:function(){if(this._inputControl)return"on"===this._inputControl.get("value")},setConfig:function(){this._inputControl&&this._config&&this.setValue(this._config)},getConfig:function(b,a){this._inputControl&&(this._config=this.getValue())}})});