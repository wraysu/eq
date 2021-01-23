// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/lang dojo/_base/array jimu/LayerInfos/LayerInfos dojo/Deferred dojo/promise/all exports dojo/store/Observable dojo/store/Cache dojo/store/Memory esri/lang ./table/FeatureLayerQueryStore jimu/utils".split(" "),function(e,k,q,n,p,c,u,y,r,v,z,l){function A(a,b){if(!a||!a.length)return b||[];if(!b||!b.length)return a;for(var c=[],d=0,t=a.length;d<t;d++)for(var g=a[d],e=0,m=b.length;e<m;e++){var h=b[e];if(h.name===g.name){h.alias!==g.alias&&(g.alias=h.alias);c.push(g);break}}return c}
c.readLayerInfosObj=function(a){return q.getInstance(a,a.itemInfo)};c.readLayerInfosFromMap=function(a,b,c){var d=new n;q.getInstance(a,a.itemInfo).then(e.hitch(this,function(a){var g=[];b?a.traversalLayerInfosOfWebmap(function(a){g.push(a)}):a.traversal(function(a){g.push(a)});if(c){var e=[],f=a.getMapNotesLayerInfoArray();k.forEach(f,function(a){e.push(a.id);a.traversal(function(a){e.push(a.id)})});g=k.filter(g,function(a){return-1===e.indexOf(a.id)})}a=a.getTableInfoArray();g=g.concat(a);d.resolve(g)}),
e.hitch(this,function(a){console.error(a);d.reject(a)}));return d.promise};c.generateColumnsFromFields=function(a,b,f,d,t,g,B){function m(a){if(b&&v.isDefined(b.fieldInfos))for(var d=0,g=b.fieldInfos.length;d<g;d++){var c=b.fieldInfos[d];if(c.fieldName===a)return c.format}return null}var h={selectionHandle:{label:"",className:"selection-handle-column",hidden:!1,unhidable:!0,filed:"selection-handle-column",sortable:!1,_cache:{sortable:!1,statistics:!1}}};k.forEach(f,e.hitch(c,function(b,f,l){f="field"+
f;var w=!!b.domain,n="esriFieldTypeDate"===b.type,p=d&&b.name===d,q="esriFieldTypeDouble"===b.type||"esriFieldTypeSingle"===b.type||"esriFieldTypeInteger"===b.type||"esriFieldTypeSmallInteger"===b.type,r="esriFieldTypeString"===b.type,u=b.alias||b.name,x;x=1===l.length?!1:a&&a[f]?a[f].hidden:b?!b.show&&v.isDefined(b.show):!1;h[f]={label:u,className:f,hidden:x,unhidable:1===l.length?!1:!b.show&&v.isDefined(b.show)&&b._pk,field:b.name,sortable:!1,_cache:{sortable:!!g,statistics:B&&!w&&q}};r?h[f].formatter=
e.hitch(c,c.urlFormatter):n?h[f].formatter=e.hitch(c,c.dateFormatter,m(b.name)):q&&(h[f].formatter=e.hitch(c,c.numberFormatter,m(b.name)));w?h[f].get=e.hitch(c,function(a,b){return this.getCodeValue(a.domain,b[a.name])},b):p?h[f].get=e.hitch(c,function(a,b,d){return this.getTypeName(d[a.name],b)},b,t):w||n||p||(h[f].get=e.hitch(c,function(a,b,d,g){var f=null;b&&d&&0<d.length&&(d=(d=k.filter(d,e.hitch(c,function(a){return a.id===g[b]})))&&d[0]||null)&&d.domains&&d.domains[a.name]&&d.domains[a.name].codedValues&&
(f=this.getCodeValue(d.domains[a.name],g[a.name]));return(a=null!==f?f:g[a.name])||isFinite(a)?a:""},b,d,t))}));return h};c.getTypeName=function(a,b){return l.fieldFormatter.getTypeName(a,b)};c.getCodeValue=function(a,b){return l.fieldFormatter.getCodedValue(a,b)};c.urlFormatter=function(a){return l.fieldFormatter.getFormattedUrl(a)};c.dateFormatter=function(a,b){return l.fieldFormatter.getFormattedDate(b,a)};c.numberFormatter=function(a,b){return l.fieldFormatter.getFormattedNumber(b,a)};c.readLayerObjectsFromMap=
function(a,b,f){var d=new n,c=[];this.readLayerInfosFromMap(a,b,f).then(e.hitch(this,function(a){k.forEach(a,e.hitch(this,function(a){c.push(a.getLayerObject())}));p(c).then(e.hitch(this,function(a){d.resolve(a)}),e.hitch(this,function(a){d.reject(a);console.error(a)}))}),e.hitch(this,function(a){d.reject(a)}));return d.promise};c.readSupportTableInfoFromLayerInfos=function(a){var b=new n,f=[];k.forEach(a,e.hitch(this,function(a){f.push(a.getSupportTableInfo())}));p(f).then(e.hitch(this,function(d){d=
e.clone(d);k.forEach(d,function(b,d){b.id=a[d].id});b.resolve(d)}),function(a){b.reject(a)});return b.promise};c.readConfigLayerInfosFromMap=function(a,b,f){var d=new n,c=[];this.readLayerInfosFromMap(a,b,f).then(e.hitch(this,function(a){var b=[];k.forEach(a,function(a){c.push(a.getSupportTableInfo())});p(c).then(e.hitch(this,function(c){k.forEach(c,e.hitch(this,function(d,c){d.isSupportedLayer&&(a[c].name=a[c].title,b.push(a[c]))}));d.resolve(b)}),e.hitch(this,function(a){d.reject(a)}))}),e.hitch(this,
function(a){d.reject(a)}));return d.promise};c.getConfigInfosFromLayerInfos=function(a){return k.map(a,function(a){return c.getConfigInfoFromLayerInfo(a)})};c.getConfigInfoFromLayerInfo=function(a){var b={};b.name=a.name||a.title;b.id=a.id;b.show=a.isShowInMap();b.layer={url:a.getUrl()};var c=a.getPopupInfo();c&&!c.description&&(b.layer.fields=k.map(c.fieldInfos,function(a){return{name:a.fieldName,alias:a.label,show:a.visible,format:a.format}}),a=e.getObject("layerObject.fields",!1,a),b.layer.fields=
A(b.layer.fields,a),k.some(b.layer.fields,function(a){return a.show})||(b.layer.fields&&0<b.layer.fields.length?b.layer.fields[0].show=!0:console.warn("We do not get fields info.")));return b};c.generateCacheStore=function(a,b,c,d,e){a=new z({layer:a,objectIds:a._objectIds||null,totalCount:b,batchCount:c,where:d||"1\x3d1",spatialFilter:e});b=new r;return new y(a,b,{})};c.generateMemoryStore=function(a,b){return new u(new r({data:a||[],idProperty:b}))};c.merge=function(a,b,c,d){for(var e=k.map(b,function(a){return a[c]}),
f=0,l=a.length;f<l;f++){var m=e.indexOf(a[f][c]);-1<m&&d(a[f],b[m])}};c.syncOrderWith=function(a,b,c){function d(a,b){return k.map(a,function(a){return a[b]})}if(!e.isArray(b)||!c)return a;for(var f=d(a,c),g=[],l=0,m=b.length;l<m;l++){var h=f.indexOf(b[l][c]);-1<h&&(g=g.concat(a.splice(h,1)),f=d(a,c))}return g.concat(a)}});