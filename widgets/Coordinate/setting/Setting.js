// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"widgets/Coordinate/setting/Edit":function(){define("dojo/_base/declare dojo/_base/lang dojo/_base/html dojo/_base/array dijit/_WidgetsInTemplateMixin jimu/BaseWidgetSetting jimu/dijit/CheckBox dojo/text!./Edit.html jimu/SpatialReference/srUtils dijit/form/ValidationTextBox dijit/form/Select".split(" "),function(l,e,f,n,q,m,p,h,d){var k=[{value:"",label:"Default",selected:!0,disabled:!1},{value:"",label:"",selected:!0,disabled:!1},{value:"INCHES",label:"Inches",selected:!1,disabled:!1},
{value:"FOOT",label:"Foot",selected:!1,disabled:!1},{value:"YARDS",label:"Yards",selected:!1,disabled:!1},{value:"MILES",label:"Miles",selected:!1,disabled:!1},{value:"NAUTICAL_MILES",label:"Nautical_Miles",selected:!1,disabled:!1},{value:"MILLIMETERS",label:"Millimeters",selected:!1,disabled:!1},{value:"CENTIMETERS",label:"Centimeters",selected:!1,disabled:!1},{value:"METER",label:"Meter",selected:!1,disabled:!1},{value:"KILOMETERS",label:"Kilometers",selected:!1,disabled:!1},{value:"DECIMETERS",
label:"Decimeters",selected:!1,disabled:!1},{value:"",label:"",selected:!0,disabled:!1},{value:"DECIMAL_DEGREES",label:"Decimal_Degrees",selected:!1,disabled:!1},{value:"DEGREES_DECIMAL_MINUTES",label:"Degrees_Decimal_Minutes",selected:!1,disabled:!1},{value:"DEGREE_MINUTE_SECONDS",label:"Degree_Minutes_Seconds",selected:!1,disabled:!1},{value:"",label:"",selected:!0,disabled:!1},{value:"MGRS",label:"MGRS",selected:!1,disabled:!1},{value:"USNG",label:"USNG",selected:!1,disabled:!1}];return l([m,q],
{baseClass:"jimu-coordinate-edit",templateString:h,currentWkid:null,version:null,enhanceVersion:10.1,_config:null,postCreate:function(){this.inherited(arguments);this.transformForward=new p({label:this.nls.forward,checked:!1},this.transformForward);this.version<this.enhanceVersion?(f.setStyle(this.olderVersionDiv,"display","block"),f.setStyle(this.enhanceVersionDiv,"display","none")):(f.setStyle(this.olderVersionDiv,"display","none"),f.setStyle(this.enhanceVersionDiv,"display","block"));f.setStyle(this.transformDiv,
"display","none");f.setStyle(this.transformForward.domNode,"display","none");this.wkid.set("missingMessage",this.nls.warning);this.transformationWkid.set("missingMessage",this.nls.tfWarning)},setConfig:function(a){this._config=e.clone(a);d.loadResource().then(e.hitch(this,function(){a.wkid&&(this.wkid.set("value",parseInt(a.wkid,10)),this.currentWkid=parseInt(a.wkid,10),this._adjustUnitOption());a.label&&(this.wkidLabel.innerHTML=a.label);a.outputUnit&&this.outputUnit.set("value",a.outputUnit);a.transformationWkid&&
this.transformationWkid.set("value",parseInt(a.transformationWkid,10));a.transformationLabel&&(this.transformationLabel.innerHTML=a.transformationLabel);a.transformForward&&this.transformForward.setValue(a.transformForward)}),e.hitch(this,function(a){console.error(a)}))},getConfig:function(){var a={wkid:d.standardizeWkid(this.wkid.get("value")),label:this.wkidLabel.innerHTML,outputUnit:this.outputUnit.get("value"),transformationWkid:parseInt(this.transformationWkid.get("value"),10),transformationLabel:this.transformationLabel.innerHTML,
transformForward:this.transformForward.getValue()};a.outputUnit=a.outputUnit||d.getCSUnit(a.wkid);var b={sameSRWithMap:d.isSameSR(a.wkid,this.map.spatialReference.wkid),isGeographicCS:d.isGeographicCS(a.wkid),isGeographicUnit:d.isGeographicUnit(a.outputUnit),isProjectedCS:d.isProjectedCS(a.wkid),isProjectUnit:d.isProjectUnit(a.outputUnit),spheroidCS:d.isProjectedCS(a.wkid)?d.getGeoCSByProj(a.wkid):a.wkid,defaultUnit:d.getCSUnit(a.wkid),unitRate:d.getUnitRate(d.getCSUnit(a.wkid),a.outputUnit)};"DEGREES_DECIMAL_MINUTES"===
a.outputUnit&&(b.isGeographicUnit=!0,b.unitRate=1);b.isGeographicUnit&&b.isProjectedCS&&(b.unitRate=1);a.options=b;return a},_removeGeoUnits:function(){n.forEach(d.getGeographicUnits(),e.hitch(this,function(a){this.outputUnit.removeOption(a)}));this.outputUnit.removeOption("DEGREES_DECIMAL_MINUTES")},_removeProjUnits:function(){n.forEach(d.getProjectUnits(),e.hitch(this,function(a){this.outputUnit.removeOption(a)}))},_removeAllUnits:function(){for(var a=0,b=k.length;a<b;a++)this.outputUnit.removeOption(k[a].value)},
_addAllUnits:function(){for(var a=0,b=k.length;a<b;a++){var d=e.clone(k[a]);d.label=this.nls[k[a].label];this.outputUnit.addOption(d)}},_adjustUnitOption:function(){if(this.currentWkid===this.map.spatialReference.wkid){if(d.isWebMercator(this.currentWkid))return;4326===this.currentWkid?this._removeProjUnits():d.isGeographicCS(this.currentWkid)?this._removeProjUnits():d.isProjectedCS(this.currentWkid)&&(this._removeGeoUnits(),this.outputUnit.removeOption("USNG"),this.outputUnit.removeOption("MGRS"))}else d.isGeographicCS(this.currentWkid)&&
this._removeProjUnits();this._config.outputUnit&&this.outputUnit.set("value",this._config.outputUnit)},_isDefaultSR:function(){var a=this.wkid.get("value");return d.isSameSR(a,this.map.spatialReference.wkid)},onWkidChange:function(a){var b="",e=parseInt(a,10);this.popup.disableButton(0);d.isValidWkid(e)?(b=d.getSRLabel(e),this.wkidLabel.innerHTML=b,d.isSameSpheroid(e,this.map.spatialReference.wkid)?(this.transformationWkid.set("value",""),f.setStyle(this.transformDiv,"display","none")):f.setStyle(this.transformDiv,
"display","block"),this.popup.enableButton(0)):a&&(this.wkid.set("value",""),this.wkidLabel.innerHTML=this.nls.cName);this.currentWkid!==e&&this.transformationWkid.set("value","");this.currentWkid=e;this._removeAllUnits();this._addAllUnits();this._adjustUnitOption();this.outputUnit.closeDropDown()},ontfWkidChange:function(a){if(a){var b="",e="";a=parseInt(a,10);d.isValidTfWkid(a)?(b=a,e=d.getTransformationLabel(a),this.transformationLabel.innerHTML=e,f.setStyle(this.transformForward.domNode,"display",
"block")):(this.transformationLabel.innerHTML=this.nls.tName,f.setStyle(this.transformForward.domNode,"display","none"));this.transformationWkid.set("value",b)}else this.transformationLabel.innerHTML=this.nls.tName,f.setStyle(this.transformForward.domNode,"display","none")}})})},"jimu/SpatialReference/srUtils":function(){define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/Deferred dojo/promise/all dojo/request esri/SpatialReference ./unitUtils".split(" "),function(l,e,f,n,q,m,p,h){var d=
null,k=null,a=!1,b=l(null,function(){});l=require.toUrl("jimu");var r=m(l+"/SpatialReference/cs.json",{handleAs:"json"}),t=m(l+"/SpatialReference/transform.json",{handleAs:"json"});b.loadResource=function(){var c=new n;if(d&&k)return c.resolve(),c;q([r,t]).then(function(b){d=b[0];k=b[1];a=!0;c.resolve()},function(b){console.error(b);a=!1;c.reject(b)});return c};b.getAllCSUnits=function(){if(a){var c=[];f.forEach(d.wkids,e.hitch(this,function(a){a=this.getCSUnit(a);-1===f.indexOf(c,a)&&c.push(a)}));
return c}};b.convertUnit=function(c,b,d){if(a)return h.convertUnit(c,b,d)};b.getUnitRate=function(c,b){if(a)return h.getUnitRate(c,b)};b.isProjectUnit=function(c){if(a)return h.isProjectUnit(c)};b.isGeographicUnit=function(c){if(a)return h.isGeographicUnit(c)};b.getGeographicUnits=function(){if(a)return h.getGeographicUnits()};b.getProjectUnits=function(){if(a)return h.getProjectUnits()};b.getCSUnit=function(c){if(a)return c=f.indexOf(d.wkids,c),d.units[c]};b.isSameSR=function(c,b){if(a)return c=
this.indexOfWkid(c),b=this.indexOfWkid(b),d.labels[c]===d.labels[b]};b.isValidWkid=function(c){if(a)return-1<this.indexOfWkid(c)};b.getSRLabel=function(c){if(a&&this.isValidWkid(c))return c=this.indexOfWkid(c),d.labels[c]};b.indexOfWkid=function(c){if(a)return f.indexOf(d.wkids,c)};b.isWebMercator=function(a){return p.prototype._isWebMercator?p.prototype._isWebMercator.apply({wkid:parseInt(a,10)},[]):(new p(parseInt(a,10))).isWebMercator()};b.standardizeWkid=function(a){return this.isWebMercator(a)?
3857:parseInt(a,10)};b.isValidTfWkid=function(c){if(a)return-1<this.indexOfTfWkid(c)};b.getTransformationLabel=function(c){if(a)return this.isValidTfWkid(c)?(c=this.indexOfTfWkid(c),k.labels[c]):""};b.indexOfTfWkid=function(c){if(a)return f.indexOf(k.tfWkids,c)};b.isGeographicCS=function(c){if(a)return this.isValidWkid(c)?(c=this.indexOfWkid(c),!d.projSR[c]):!1};b.isProjectedCS=function(c){if(a)return this.isValidWkid(c)?(c=this.indexOfWkid(c),d.projSR[c]):!1};b.getGeoCSByProj=function(c){if(a&&this.isProjectedCS(c))return c=
this.indexOfWkid(c),d.spheroids[c]};b.getSpheroidStr=function(c){if(a)return this.isGeographicCS(c)?d.labels[this.indexOfWkid(c)]:this.isProjectedCS(c)?(c=b.getGeoCSByProj(c),d.labels[this.indexOfWkid(c)]):null};b.isSameSpheroid=function(c,b){if(a)return c=this.getSpheroidStr(c),b=this.getSpheroidStr(b),c&&b&&c===b?!0:!1};return b})},"widgets/Coordinate/setting/_build-generate_module":function(){define(["dojo/text!./Setting.html","dojo/text!./css/style.css","dojo/i18n!./nls/strings"],function(){})},
"url:widgets/Coordinate/setting/Edit.html":'  \x3cdiv style\x3d"width:100%"\x3e\r\n    \x3cdiv class\x3d"output-wkid edit-module" data-dojo-attach-point\x3d"outputDiv"\x3e\r\n      \x3ctable cellspacing\x3d"0"\x3e\r\n        \x3ctbody\x3e\r\n          \x3ctr\x3e\r\n            \x3ctd\x3e\r\n              \x3cdiv class\x3d"wkid-header"\x3e\r\n                \x3cspan\x3e${nls.output}\x3c/span\x3e\r\n                \x3ca href\x3d"https://developers.arcgis.com/javascript/jshelp/ref_coordsystems.html" target\x3d"blank"\x3eWKID\x3c/a\x3e\r\n              \x3c/div\x3e\r\n            \x3c/td\x3e\r\n          \x3c/tr\x3e\r\n          \x3ctr\x3e\r\n            \x3ctd\x3e\r\n              \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/ValidationTextBox" required\x3d"true"\r\n            placeHolder\x3d"WKID" data-dojo-attach-event\x3d"onChange:onWkidChange"\r\n            data-dojo-attach-point\x3d"wkid" data-dojo-props\x3d\'style:{width:"100%"}\' /\x3e\r\n            \x3c/td\x3e\r\n          \x3c/tr\x3e\r\n          \x3ctr\x3e\r\n            \x3ctd\x3e\r\n              \x3cspan class\x3d"wkid-label" data-dojo-attach-point\x3d"wkidLabel"\x3e${nls.cName}\x3c/span\x3e\r\n            \x3c/td\x3e\r\n          \x3c/tr\x3e\r\n        \x3c/tbody\x3e\r\n      \x3c/table\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"display-units edit-module" data-dojo-attach-point\x3d"displayUnits"\x3e\r\n      \x3ctable cellspacing\x3d"0"\x3e\r\n        \x3ctbody\x3e\r\n          \x3ctr\x3e\r\n            \x3ctd class\x3d"display"\x3e\r\n              \x3cspan\x3e${nls.units}\x3c/span\x3e\r\n            \x3c/td\x3e\r\n            \x3ctd class\x3d"units"\x3e\r\n              \x3cselect data-dojo-attach-point\x3d"outputUnit" data-dojo-props\x3d\'style:{width:"462px"}\' data-dojo-type\x3d"dijit/form/Select"\x3e\r\n                \x3coption value\x3d""\x3e${nls.Default}\x3c/option\x3e\r\n                \x3coption type\x3d"separator"\x3e\x3c/option\x3e\r\n                \x3coption value\x3d"INCHES"\x3e${nls.Inches}\x3c/option\x3e\r\n                \x3coption value\x3d"FOOT"\x3e${nls.Foot}\x3c/option\x3e\r\n                \x3coption value\x3d"YARDS"\x3e${nls.Yards}\x3c/option\x3e\r\n                \x3coption value\x3d"MILES"\x3e${nls.Miles}\x3c/option\x3e\r\n                \x3coption value\x3d"NAUTICAL_MILES"\x3e${nls.Nautical_Miles}\x3c/option\x3e\r\n                \x3coption value\x3d"MILLIMETERS"\x3e${nls.Millimeters}\x3c/option\x3e\r\n                \x3coption value\x3d"CENTIMETERS"\x3e${nls.Centimeters}\x3c/option\x3e\r\n                \x3coption value\x3d"METER"\x3e${nls.Meter}\x3c/option\x3e\r\n                \x3coption value\x3d"KILOMETERS"\x3e${nls.Kilometers}\x3c/option\x3e\r\n                \x3coption value\x3d"DECIMETERS"\x3e${nls.Decimeters}\x3c/option\x3e\r\n                \x3coption type\x3d"separator"\x3e\x3c/option\x3e\r\n                \x3coption value\x3d"DECIMAL_DEGREES"\x3e${nls.Decimal_Degrees}\x3c/option\x3e\r\n                \x3coption value\x3d"DEGREES_DECIMAL_MINUTES"\x3e${nls.Degrees_Decimal_Minutes}\x3c/option\x3e\r\n                \x3coption value\x3d"DEGREE_MINUTE_SECONDS"\x3e${nls.Degree_Minutes_Seconds}\x3c/option\x3e\r\n                \x3coption type\x3d"separator"\x3e\x3c/option\x3e\r\n                \x3coption value\x3d"MGRS"\x3e${nls.MGRS}\x3c/option\x3e\r\n                \x3coption value\x3d"USNG"\x3e${nls.USNG}\x3c/option\x3e\r\n              \x3c/select\x3e\r\n            \x3c/td\x3e\r\n          \x3c/tr\x3e\r\n        \x3c/tbody\x3e\r\n      \x3c/table\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"enhanceVersionDiv"\x3e\r\n      \x3cdiv class\x3d"datum-wkid edit-module" data-dojo-attach-point\x3d"transformDiv"\x3e\r\n        \x3ctable cellspacing\x3d"0"\x3e\r\n          \x3ctbody\x3e\r\n            \x3ctr\x3e\r\n              \x3ctd\x3e\r\n                \x3cdiv class\x3d"wkid-header"\x3e\r\n                  \x3cspan\x3e${nls.datum}\x3c/span\x3e\r\n                  \x3ca href\x3d"http://resources.arcgis.com/en/help/arcgis-rest-api/index.html#//02r3000000r8000000" target\x3d"blank"\x3eTFWKID\x3c/a\x3e\r\n                \x3c/div\x3e\r\n              \x3c/td\x3e\r\n            \x3c/tr\x3e\r\n            \x3ctr\x3e\r\n              \x3ctd\x3e\r\n                \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/ValidationTextBox" required\x3d"true" placeHolder\x3d"${nls.tWKIDPlaceHolder}"\r\n              data-dojo-attach-point\x3d"transformationWkid" data-dojo-attach-event\x3d"onChange:ontfWkidChange" data-dojo-props\x3d\'style:{width:"100%"}\' /\x3e\r\n              \x3c/td\x3e\r\n            \x3c/tr\x3e\r\n            \x3ctr\x3e\r\n              \x3ctd\x3e\r\n                \x3cspan class\x3d"wkid-label" data-dojo-attach-point\x3d"transformationLabel"\x3e${nls.tName}\x3c/span\x3e\r\n              \x3c/td\x3e\r\n            \x3c/tr\x3e\r\n          \x3c/tbody\x3e\r\n        \x3c/table\x3e\r\n        \x3cdiv class\x3d"check" data-dojo-attach-point\x3d"transformForward"\x3e\x3c/div\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"older-version" data-dojo-attach-point\x3d"olderVersionDiv"\x3e${nls.olderVersion}\x3c/div\x3e\r\n  \x3c/div\x3e',
"url:widgets/Coordinate/setting/Setting.html":'\x3cdiv class\x3d"jimu-widget-coordinate-setting"\x3e\r\n  \x3cdiv class\x3d"settings-section" data-dojo-attach-point\x3d"searchesSection"\x3e\r\n    \x3cp\x3e${nls.state}\x3c/p\x3e\r\n    \x3cdiv class\x3d"add-output-coordinate" data-dojo-attach-event\x3d"onclick: onAddClick"\x3e\r\n      \x3cspan class\x3d"add-output-coordinate-icon"\x3e\x3c/span\x3e\r\n      \x3cspan class\x3d"add-output-coordinate-label"\x3e${nls.add}\x3c/span\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"coordinate-table" data-dojo-attach-point\x3d"tableCoordinate"\x3e\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"displayNumber" class\x3d"display-number"\x3e\r\n      \x3cspan class\x3d"spinner-label ops-label"\x3e${nls.spinnerLabel}\x3c/span\x3e\r\n      \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/NumberSpinner" value\x3d"3" data-dojo-attach-point\x3d"spinner" data-dojo-props\x3d"constraints: {min:0}"\x3e\r\n      \x3cspan class\x3d"demical-place"\x3e${nls.decimalPlace}\x3c/span\x3e\r\n      \x3cdiv class\x3d"separator"\x3e\r\n        \x3cdiv class\x3d"check" data-dojo-attach-point\x3d"separator"\x3e\x3c/div\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n\r\n    \x3cdiv class\x3d"displayOrder"\x3e\r\n      \x3cspan class\x3d"jimu-float-leading displayOrderTips"\x3e${nls.displayOrderLonLatTips}\x3c/span\x3e\r\n      \x3cspan class\x3d"order"\x3e\r\n        \x3cdiv class\x3d"jimu-float-leading order-btn"\x3e\r\n          \x3cdiv data-dojo-type\x3d"jimu/dijit/RadioBtn" data-dojo-attach-point\x3d"lonLat" data-dojo-props\x3d"group:\'displayOrderLonLat\'"\x3e\x3c/div\x3e\r\n          \x3clabel\x3e${nls.lonLatTips}\x3c/label\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"jimu-float-leading order-btn"\x3e\r\n          \x3cdiv data-dojo-type\x3d"jimu/dijit/RadioBtn" data-dojo-attach-point\x3d"latLon" data-dojo-props\x3d"group:\'displayOrderLonLat\'"\x3e\x3c/div\x3e\r\n          \x3clabel\x3e${nls.latLonTips}\x3c/label\x3e\r\n        \x3c/div\x3e\r\n      \x3c/span\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e',
"url:widgets/Coordinate/setting/css/style.css":".jimu-widget-coordinate-setting{margin:0; padding:0; font-size: 14px; padding-top: 20px; color: #596679;}.jimu-widget-coordinate-setting .dijitSelect{height: 30px; width: 100%;}.jimu-widget-coordinate-setting .dijitArrowButtonContainer{width: 17px;}.jimu-widget-coordinate-setting .zoom-scale-table{margin-top:12px;}.jimu-widget-coordinate-setting .settings-section p{font-size: 14px; margin-bottom: 20px;}.jimu-widget-coordinate-setting .add-output-coordinate{margin-bottom: 7px; cursor: pointer; display: inline-block;}.jimu-widget-coordinate-setting .add-output-coordinate-icon{background-image: url(images/add_icon.png); background-repeat: no-repeat; background-position: center; width: 14px; height: 14px; display: inline-block; vertical-align: middle;}.jimu-widget-coordinate-setting .add-output-coordinate-label{font-size: 14px; color: #518dca; margin-left: 10px; display: inline-block; height: 100%; text-decoration: underline;}.jimu-widget-coordinate-setting .wkid, .jimu-widget-coordinate-setting .transformationWkid,.jimu-widget-coordinate-setting .actions{width: 120px;}.jimu-widget-coordinate-setting .coordinate-table{height: 186px;}.jimu-widget-coordinate-setting .display-number,.jimu-widget-coordinate-setting .separator{margin-top: 10px;}.jimu-widget-coordinate-setting .display-number .ops-label{min-width: 150px; display: inline-block;}.jimu-widget-coordinate-setting .display-number .dijitNumberTextBox {width: 70px;}.jimu-coordinate-edit{width: 100%; font-size: 16px; color: #596679;}.jimu-coordinate-edit table{width: 100%;}.jimu-coordinate-edit .wkid-header{margin: 0 0 10px;}.jimu-coordinate-edit .check{margin-top: 10px;}.jimu-coordinate-edit .label{font-size: 14px;}.jimu-coordinate-edit .wkid-label{font-size: 14px; font-style: italic; color: #a0acbf; width: 100%; display: inline-block; margin-top: 5px;}.jimu-coordinate-edit .edit-module{margin-bottom: 10px;}.jimu-coordinate-edit .edit-module:last-child{margin-bottom: 0;}.jimu-coordinate-edit .display-units .display{width: 20%;}.jimu-coordinate-edit .older-version{font-size: 14px; font-style: italic; color: #e84b4b;}.jimu-widget-coordinate-setting{width:100%; height:100%;}.jimu-widget-coordinate-setting .displayOrder{margin-top: 16px;}.jimu-widget-coordinate-setting .displayOrder .displayOrderTips{margin-right: 10px;}.jimu-rtl .jimu-widget-coordinate-setting .displayOrder .displayOrderTips{margin-left: 10px; margin-right: auto;}.jimu-widget-coordinate-setting .displayOrder .jimu-radio {border: 1px solid #ccc; vertical-align: top;}.jimu-widget-coordinate-setting .displayOrder .jimu-radio-checked .jimu-radio-inner {width: 6px; height: 6px; margin: 4px; border-radius: 50%; background-color: #24B5CC;}.jimu-widget-coordinate-setting .displayOrder .order-btn{margin: 0 10px 0 10px;}",
"*now":function(l){l(['dojo/i18n!*preload*widgets/Coordinate/setting/nls/Setting*["ar","bs","cs","da","de","en","el","es","et","fi","fr","he","hi","hr","id","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sl","sr","sv","th","tr","zh-cn","vi","zh-hk","zh-tw","ROOT"]'])},"*noref":1}});
define("dojo/_base/declare dojo/_base/lang dojo/_base/html dojo/on dojo/aspect dojo/query dojo/keys dojo/json esri/request jimu/BaseWidgetSetting dijit/_WidgetsInTemplateMixin jimu/dijit/SimpleTable jimu/dijit/Message jimu/dijit/Popup jimu/dijit/CheckBox jimu/dijit/LoadingShelter jimu/portalUtils ./Edit jimu/SpatialReference/srUtils jimu/dijit/RadioBtn dojo/NodeList-dom dijit/form/NumberSpinner dijit/form/NumberTextBox".split(" "),function(l,e,f,n,q,m,p,h,d,k,a,b,r,t,c,u,v,w,g){return l([k,a],{baseClass:"jimu-widget-coordinate-setting",
edit:null,popup:null,popupState:"",editTr:null,gsVersion:0,postCreate:function(){this.inherited(arguments);this.separator=new c({label:this.nls.separator,checked:!1},this.separator);this.shelter1=new u({hidden:!0});this.shelter1.placeAt(this.domNode);this.shelter1.startup();this.shelter2=new u({hidden:!0});this.shelter2.placeAt(this.domNode);this.shelter2.startup()},startup:function(){this.inherited(arguments);this.outputCoordinateTable=new b({autoHeight:!1,fields:[{name:"id",title:this.nls.id,type:"text",
unique:!0,hidden:!0,editable:!1},{name:"wkid",title:this.nls.wkid,type:"text","class":"wkid",hidden:!0,editable:!1},{name:"label",title:this.nls.label,type:"text",editable:!1},{name:"outputUnit",title:this.nls.output,type:"text",hidden:!0,editable:!1},{name:"transformationWkid",title:this.nls.transformationWkid,type:"text","class":"transformationWkid",editable:!1,hidden:!0},{name:"transformationLabel",title:this.nls.transformationLabel,type:"text",editable:!1,hidden:!0},{name:"transformForward",title:this.nls.transformForward,
type:"checkbox",editable:!1,hidden:!0},{name:"options",title:"options",type:"text",editable:!1,hidden:!0},{name:"actions",title:this.nls.actions,type:"actions","class":"actions",actions:["edit","up","down","delete"]}],selectable:!1});f.setStyle(this.outputCoordinateTable.domNode,"height","100%");this.outputCoordinateTable.placeAt(this.tableCoordinate);this.outputCoordinateTable.startup();this.own(n(this.outputCoordinateTable,"actions-edit",e.hitch(this,"onEditClick")));this.setConfig(this.config);
this._initOrderLonLatRadioBtns();this._getGeometryServiceVersion()},setConfig:function(a){this.config=a;this.outputCoordinateTable.clear();this.shelter1.show();g.loadResource().then(e.hitch(this,function(){if(a.spatialReferences&&a.spatialReferences.length){for(var c=[],b=a.spatialReferences.length,d=0;d<b;d++){var x=parseInt(a.spatialReferences[d].wkid,10);c.push({id:d,wkid:g.standardizeWkid(x),label:a.spatialReferences[d].label,outputUnit:a.spatialReferences[d].outputUnit,transformationWkid:a.spatialReferences[d].transformationWkid,
transformationLabel:a.spatialReferences[d].transformationLabel,transformForward:a.spatialReferences[d].transformForward,options:h.stringify(a.spatialReferences[d].options)})}this.outputCoordinateTable.addRows(c)}else this._addMapCoordinate()}),e.hitch(this,function(a){console.error(a)})).always(e.hitch(this,function(){this.shelter1.hide()}));isFinite(parseInt(a.decimalPlaces,10))&&this.spinner.set("value",parseInt(a.decimalPlaces,10));a.addSeparator&&this.separator.setValue(a.addSeparator)},_getGeometryServiceVersion:function(){this.shelter2.show();
if(esriConfig.defaults.geometryService&&esriConfig.defaults.geometryService.url){var a=esriConfig.defaults.geometryService.url,a=a.slice(0,a.indexOf("/Geometry/"));d({url:a,handleAs:"json",callbackParamName:"callback",content:{f:"json"}}).then(e.hitch(this,function(a){console.log(a);a&&a.currentVersion&&(this.gsVersion=parseFloat(a.currentVersion))}),e.hitch(this,function(a){console.error(a)})).always(e.hitch(this,function(){this.shelter2.hide()}))}else this.shelter2.hide(),new r({message:this.nls.getVersionError})},
_addMapCoordinate:function(){var a=this.map.spatialReference.wkid;v.getUnits(this.appConfig.portalUrl).then(e.hitch(this,function(c){if(g.isValidWkid(a)){var b={wkid:g.standardizeWkid(a),label:g.getSRLabel(parseInt(a,10))};g.isProjectedCS(b.wkid)?b.outputUnit="english"===c?"FOOT":"METER":b.outputUnit=b.outputUnit||g.getCSUnit(b.wkid);c={sameSRWithMap:g.isSameSR(b.wkid,this.map.spatialReference.wkid),isGeographicCS:g.isGeographicCS(b.wkid),isGeographicUnit:g.isGeographicUnit(b.outputUnit),isProjectedCS:g.isProjectedCS(b.wkid),
isProjectUnit:g.isProjectUnit(b.outputUnit),spheroidCS:g.isProjectedCS(b.wkid)?g.getGeoCSByProj(b.wkid):b.wkid,defaultUnit:g.getCSUnit(b.wkid),unitRate:g.getUnitRate(g.getCSUnit(b.wkid),b.outputUnit)};this.map.spatialReference.isWebMercator()&&(c.isGeographicUnit=!0,c.isProjectUnit=!1,c.unitRate=1,b.outputUnit="DECIMAL_DEGREES");"DEGREES_DECIMAL_MINUTES"===b.outputUnit&&(c.isGeographicUnit=!0,c.unitRate=1);b.options=h.stringify(c);this.outputCoordinateTable.addRow(b)}}))},_keepDefaultOnlyEdit:function(){var a=
m("."+this.baseClass+" .body-section tr[rowid\x3drow1]")[0];m(".action-item",a).style("display","none");m(".row-edit-div",a).style("display","block");q.after(this.outputCoordinateTable,"onBeforeRowUp",e.hitch(this,function(a){if(m(".body-section .simple-table-row")[1]===a)return!1}),!0)},onAddClick:function(){this.popupState="ADD";this._openEdit(this.nls.add,{})},onEditClick:function(a){var b=this.outputCoordinateTable.getRowData(a);this.popupState="EDIT";this.editTr=a;this._openEdit(this.nls.edit,
b)},_openEdit:function(a,b){this.edit=new w({version:this.gsVersion,map:this.map,nls:this.nls});this.popup=new t({titleLabel:a,autoHeight:!0,content:this.edit,container:"main-page",width:640,buttons:[{label:this.nls.ok,key:p.ENTER,disable:!0,onClick:e.hitch(this,"_onEditOk")},{label:this.nls.cancel,classNames:["jimu-btn-vacation"],key:p.ESCAPE}],onClose:e.hitch(this,"_onEditClose")});this.edit.setConfig(b||{});f.addClass(this.popup.domNode,"widget-setting-popup");this.edit.startup()},_onEditOk:function(){var a=
this.edit.getConfig(),b=null;a.wkid=g.standardizeWkid(a.wkid);a.options=h.stringify(a.options);"ADD"===this.popupState?b=this.outputCoordinateTable.addRow(a):"EDIT"===this.popupState&&(b=this.outputCoordinateTable.editRow(this.editTr,a));b.success?(this.popup.close(),this.popupState="",this.editTr=null):new r({message:a.wkid+this.nls[b.errorCode]})},_onEditClose:function(){this.popup=this.edit=null},getConfig:function(){for(var a=this.outputCoordinateTable.getData(),b=[],c=a.length,d=0;d<c;d++)delete a[d].id,
a[d].options=h.parse(a[d].options),b.push(a[d]);this.config.spatialReferences=b;this.config.decimalPlaces=this.spinner.get("value");this.config.addSeparator=this.separator.getValue();return this.config},_initOrderLonLatRadioBtns:function(){this.own(n(this.lonLat,"click",e.hitch(this,function(){this.config.displayOrderLonLat=!0})));this.own(n(this.latLon,"click",e.hitch(this,function(){this.config.displayOrderLonLat=!1})));this.config.displayOrderLonLat?(this._selectRadioBtnItem("lonLat"),this.config.displayOrderLonLat=
!0):(this._selectRadioBtnItem("latLon"),this.config.displayOrderLonLat=!1)},_selectRadioBtnItem:function(a){(a=this[a])&&a.check&&a.check(!0)}})});