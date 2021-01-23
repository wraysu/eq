// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
define(["dojo/_base/declare", "jimu/BaseWidget"], function (a, b) { return a([b], { startup: function() {
    this.inherited(arguments);
    this.mapIdNode.innerHTML = 'map id is:' + this.map.id;
  },baseClass: "jimu-widget-mywidget" }) });
