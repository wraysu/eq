// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:jimu/dijit/templates/RelationshipConfig.html":'\x3cdiv\x3e\r\n  \x3ctable class\x3d"setting-table" cellpadding\x3d"0" cellspacing\x3d"0" cellpadding\x3d"10px" style\x3d"width:100%;"\x3e\r\n    \x3ctbody\x3e\r\n      \x3ctr\x3e\r\n        \x3ctd class\x3d"value-td" colspan\x3d"2"\x3e\r\n          \x3cspan data-dojo-attach-point\x3d"titleLabel"\x3e\x3c/span\x3e\r\n        \x3c/td\x3e\r\n      \x3c/tr\x3e\r\n      \x3ctr\x3e\r\n        \x3ctd class\x3d"fields-td"\x3e\r\n          \x3cdiv data-dojo-attach-point\x3d"fieldsTable" data-dojo-type\x3d"jimu/dijit/SimpleTable" data-dojo-props\x3d\'fields:[{name:"visibility",title:"${nls.visibility}",type:"checkbox"},{name:"name",title:"${nls.name}",type:"text",editable:false},{name:"alias",title:"${nls.alias}",type:"text",editable:true},{name:"actions",title:"${nls.actions}",type:"actions",actions:["up","down"]}]\'\x3e\x3c/div\x3e\r\n        \x3c/td\x3e\r\n        \x3ctd class\x3d"delete-td" nowrap\x3e\r\n          \x3cdiv class\x3d"delete" data-dojo-attach-point\x3d"btnDelete" data-dojo-attach-event\x3d"click:_destroySelf"\x3e\x3c/div\x3e\r\n        \x3c/td\x3e\r\n      \x3c/tr\x3e\r\n    \x3c/tbody\x3e\r\n  \x3c/table\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"loading" data-dojo-type\x3d"jimu/dijit/LoadingIndicator"\x3e\x3c/div\x3e\r\n\x3c/div\x3e\r\n'}});
define("dojo/_base/declare dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/text!./templates/RelationshipConfig.html dojo/dom-construct dojo/_base/lang dojo/_base/array".split(" "),function(g,h,k,l,m,e,f,d){return g([h,k,l],{_def:null,declaredClass:"jimu.dijit.RelationshipConfig",baseClass:"jimu-single-filter",templateString:m,fields:null,config:null,title:"",postCreate:function(){this.inherited(arguments);this.fields&&this.setFields(this.fields)},getConfig:function(){var a=
{tableId:this.tableId,fields:[]},b=this.fieldsTable.getRows();d.forEach(b,f.hitch(this,function(b){var c=this.fieldsTable.getRowData(b);c.visibility&&a.fields.push({name:c.name,alias:c.alias,type:b.fieldType,showInInfoWindow:!0})}));return a},setFields:function(a,b){a instanceof Array&&0<a.length&&(this._setFields(a,b),this.loading.hide())},setTitle:function(a){this.title=a;e.empty(this.titleLabel);e.create("div",{innerHTML:a},this.titleLabel)},clear:function(){this.fieldsTable.clear()},_setFields:function(a,
b){this.fields=d.filter(a,function(a){return"esriFieldTypeGeometry"!==a.type});0<this.fields.length&&d.forEach(this.fields,f.hitch(this,function(a){var c=!1;b instanceof Array&&0<=d.indexOf(b,a.name)&&(c=!0);this._addRow(a,c)}))},_addRow:function(a,b){b=this.fieldsTable.addRow({visibility:b,name:a.name,alias:a.alias||a.name});b.success&&(b.tr.fieldType=a.type)},_destroySelf:function(){this.destroy()}})});