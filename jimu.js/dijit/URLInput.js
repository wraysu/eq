// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/declare","dojo/_base/html","dijit/form/ValidationTextBox","dojox/validate/regexp"],function(c,d,e,f){return c([e],{declaredClass:"jimu.dijit.URLInput",required:!0,invalidMessage:"Invalid url.",trim:!0,rest:!0,allowNamed:!0,allowLocal:!0,postMixInProperties:function(){this.inherited(arguments);this.invalidMessage=(this.nls=window.jimuNls.urlInput)?this.nls.invalidUrl:"Invalid Url"},postCreate:function(){this.inherited(arguments);d.addClass(this.domNode,"jimu-url-input")},validator:function(b){if(!1===
this.required&&""===b)return!0;if(isFinite(b))return!1;var a="^"+f.url({allowNamed:this.allowNamed,allowLocal:this.allowLocal}),a=new RegExp(a,"g");a.lastIndex=0;a=a.test(b);return this.rest?(b=/\/rest\/services/gi.test(b),a&&b):a}})});