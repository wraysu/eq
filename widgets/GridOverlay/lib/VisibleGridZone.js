// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/declare","./GridPolygon"],function(b,c){return b(null,{polyline:null,polygon:null,offset:null,nonPolarGridZone:null,map:null,constructor:function(a){this.offset=Math.round(a.offset);this.polyline=a.polyline;this.polygon=a.polygon;this.nonPolarGridZone=a.nonPolarGridZone;this.map=a.map;a={clippedPolygon:this.polygon,unclippedPolygon:this.nonPolarGridZone.toPolygon(a.offset),map:this.map,xmin:this.nonPolarGridZone.extent.xmin,ymin:this.nonPolarGridZone.extent.ymin,xmax:this.nonPolarGridZone.extent.xmax,
ymax:this.nonPolarGridZone.extent.ymax,minMaxType:"degrees",utmZone:0,text:this.nonPolarGridZone.id,labelParameters:a.labelParameters};this.gridPolygon=new c(a)},getLabels:function(){return this.gridPolygon.getLabels(!0)},getCenterLabel:function(){return this.gridPolygon.getCenterLabel()}})});