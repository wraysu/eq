// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

define(["dojo/_base/declare","dijit/_WidgetBase","dojo/dom-style","dojo/dom-construct"],function(b,c,a,d){return b(c,{baseClass:"jimu-loading-indicator",declaredClass:"jimu.dijit.LoadingIndicator",hidden:!1,postCreate:function(){this.inherited(arguments);(this.hidden=!0===this.hidden)&&a.set(this.domNode,{display:"none"});a.set(this.domNode,{width:"100%",height:"100%"});d.place('\x3cdiv class\x3d"jimu-loading"\x3e\x3c/div\x3e',this.domNode)},show:function(){this.domNode&&a.set(this.domNode,"display",
"block")},hide:function(){this.domNode&&a.set(this.domNode,"display","none")}})});