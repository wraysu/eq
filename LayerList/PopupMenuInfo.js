// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/Deferred dojo/promise/all jimu/WidgetManager jimu/portalUrlUtils esri/lang ./NlsStrings".split(" "),function(l,g,e,k,m,n,p,f,q){var h=l([],{_candidateMenuItems:null,_displayItems:null,_layerInfo:null,_layerType:null,_appConfig:null,constructor:function(a,b,c,e){this.nls=q.value;this._layerInfo=a;this._layerType=c;this.layerListWidget=e;this._initCandidateMenuItems();this._initDisplayItems(b)},_getATagLabel:function(){var a,b;a=this._layerInfo.getUrl();
(b=this._layerInfo.isItemLayer())?(a=this._getItemDetailsPageUrl(b)||a,b=this.nls.itemShowItemDetails):!a||"CSVLayer"!==this._layerType&&"KMLLayer"!==this._layerType?(a=a&&"WMSLayer"===this._layerType?a+(-1<a.indexOf("?")?"\x26":"?")+"SERVICE\x3dWMS\x26REQUEST\x3dGetCapabilities":a&&"WFSLayer"===this._layerType?a+(-1<a.indexOf("?")?"\x26":"?")+"SERVICE\x3dWFS\x26REQUEST\x3dGetCapabilities":a?a:"",b=this.nls.itemDesc):b=this.nls.itemDownload;this._ATagLabelUrl=a;return'\x3ca class\x3d"menu-item-description" target\x3d"_blank" href\x3d"'+
a+'"\x3e'+b+"\x3c/a\x3e"},_getItemDetailsPageUrl:function(a){var b="";return b=p.getItemDetailsPageUrl(a.portalUrl,a.itemId)},_initCandidateMenuItems:function(){this._candidateMenuItems=[{key:"separator",label:""},{key:"empty",label:this.nls.empty},{key:"zoomto",label:this.nls.itemZoomTo},{key:"transparency",label:this.nls.itemTransparency},{key:"moveup",label:this.nls.itemMoveUp},{key:"movedown",label:this.nls.itemMoveDown},{key:"table",label:this.nls.itemToAttributeTable},{key:"controlPopup",label:this.nls.removePopup},
{key:"controlLabels",label:this.nls.showLabels},{key:"url",label:this._getATagLabel()}]},_initDisplayItems:function(a){this._displayItems=[];g.forEach(a,function(a){g.forEach(this._candidateMenuItems,function(b){a.key===b.key&&(this._displayItems.push(e.clone(b)),a.onClick&&(this._displayItem.onClick=a.onClick))},this)},this)},_isSupportedByAT:function(){return!0},_isSupportedByAT_bk:function(a,b){a=a.config;a=0===a.layerInfos.length?!0:g.some(a.layerInfos,function(a){if(a.id===this._layerInfo.id&&
a.show)return!0},this);return b.isSupportedLayer&&b.isSupportQuery&&!b.otherReasonCanNotSupport&&a?!0:!1},getDeniedItems:function(){var a=new k,b=[];this.layerListWidget.layerListView.isFirstDisplayedLayerInfo(this._layerInfo)&&b.push({key:"moveup",denyType:"disable"});this.layerListWidget.layerListView.isLastDisplayedLayerInfo(this._layerInfo)&&b.push({key:"movedown",denyType:"disable"});this._ATagLabelUrl||b.push({key:"url",denyType:"disable"});this._layerInfo.canShowLabel()||b.push({key:"controlLabels",
denyType:"hidden"});var c=this._layerInfo.loadInfoTemplate(),f=this._layerInfo.getSupportTableInfo();m({infoTemplate:c,supportTableInfo:f}).then(e.hitch(this,function(c){c.infoTemplate||b.push({key:"controlPopup",denyType:"disable"});c=c.supportTableInfo;var d=this.layerListWidget.appConfig.getConfigElementsByName("AttributeTable")[0];d&&d.visible?this._isSupportedByAT(d,c)||(this._layerInfo.parentLayerInfo&&this._layerInfo.parentLayerInfo.isMapNotesLayerInfo()?b.push({key:"table",denyType:"hidden"}):
b.push({key:"table",denyType:"disable"})):b.push({key:"table",denyType:"hidden"});a.resolve(b)}),function(){a.resolve(b)});return a},getDisplayItems:function(){return this._displayItems},onPopupMenuClick:function(a){var b={closeMenu:!0};switch(a.itemKey){case "zoomto":this._onItemZoomToClick(a);break;case "moveup":this._onMoveUpItemClick(a);break;case "movedown":this._onMoveDownItemClick(a);break;case "table":this._onTableItemClick(a);break;case "transparencyChanged":this._onTransparencyChanged(a);
b.closeMenu=!1;break;case "controlPopup":this._onControlPopup();break;case "controlLabels":this._onControlLabels()}return b},_onItemZoomToClick:function(a){this._layerInfo.zoomTo()},_isValidExtent:function(a){var b=!1;f.isDefined(a)&&f.isDefined(a.xmin)&&isFinite(a.xmin)&&f.isDefined(a.ymin)&&isFinite(a.ymin)&&f.isDefined(a.xmax)&&isFinite(a.xmax)&&f.isDefined(a.ymax)&&isFinite(a.ymax)&&(b=!0);return b},_onMoveUpItemClick:function(a){this._layerInfo.isFirst||a.layerListView.moveUpLayer(this._layerInfo)},
_onMoveDownItemClick:function(a){this._layerInfo.isLast||a.layerListView.moveDownLayer(this._layerInfo)},_onTableItemClick:function(a){this._layerInfo.getSupportTableInfo().then(e.hitch(this,function(b){var c=this.layerListWidget.appConfig.getConfigElementsByName("AttributeTable")[0];this._isSupportedByAT(c,b)&&(b=n.getInstance(),b.triggerWidgetOpen(c.id).then(e.hitch(this,function(){a.layerListWidget.publishData({target:"AttributeTable",layer:this._layerInfo})})))}))},_onTransparencyChanged:function(a){this._layerInfo.setOpacity(1-
a.extraData.newTransValue)},_onControlPopup:function(a){this._layerInfo.controlPopupInfo.enablePopup?this._layerInfo.disablePopup():this._layerInfo.enablePopup();this._layerInfo.map.infoWindow.hide()},_onControlLabels:function(a){this._layerInfo.canShowLabel()&&(this._layerInfo.isShowLabels()?this._layerInfo.hideLabels():this._layerInfo.showLabels())}});h.create=function(a,b){var c=new k,f=a.isRootLayer(),g={RootLayer:[{key:"zoomto"},{key:"transparency"},{key:"separator"},{key:"moveup"},{key:"movedown"},
{key:"separator"},{key:"url"}],RootLayerAndFeatureLayer:[{key:"zoomto"},{key:"transparency"},{key:"separator"},{key:"controlPopup"},{key:"separator"},{key:"controlLabels"},{key:"separator"},{key:"moveup"},{key:"movedown"},{key:"separator"},{key:"table"},{key:"separator"},{key:"url"}],FeatureLayer:[{key:"controlPopup"},{key:"separator"},{key:"table"},{key:"separator"},{key:"url"}],GroupLayer:[{key:"url"}],Table:[{key:"table"},{key:"separator"},{key:"url"}],"default":[{key:"url",onClick:null}]};a.getLayerType().then(e.hitch(this,
function(d){var e="",e=!f||"FeatureLayer"!==d&&"CSVLayer"!==d&&"ArcGISImageServiceLayer"!==d&&"StreamLayer"!==d&&"ArcGISImageServiceVectorLayer"!==d?f?"RootLayer":"FeatureLayer"===d||"CSVLayer"===d?"FeatureLayer":"GroupLayer"===d?"GroupLayer":"Table"===d?"Table":"default":"RootLayerAndFeatureLayer";c.resolve(new h(a,g[e],d,b))}),e.hitch(this,function(){c.resolve(new h(a,[{key:"empty"}]))}));return c};return h});