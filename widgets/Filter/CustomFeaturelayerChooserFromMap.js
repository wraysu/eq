// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/declare","dojo/_base/lang","dojo/Deferred","jimu/dijit/LayerChooserFromMap","jimu/dijit/QueryableLayerChooserFromMap"],function(e,c,f,g,h){return e([h],{postMixInProperties:function(){this.inherited(arguments);this.filter=c.hitch(this,g.andCombineFilters([this.filter,c.hitch(this,this._customFilter)]));this.displayTooltipForTreeNode=!0},_customFilter:function(d){var a=new f;d.isTable?a.resolve(!1):d.getLayerObject().then(c.hitch(this,function(b){"esri.layers.ArcGISDynamicMapServiceLayer"===
b.declaredClass?a.resolve(10<=b.version):"esri.layers.ArcGISTiledMapServiceLayer"===b.declaredClass?a.resolve(!1):a.resolve(!0)}),c.hitch(this,function(b){console.error(b);a.resolve(!1)}));return a}})});