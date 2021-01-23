// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/on dojo/_base/lang dojo/_base/array jimu/utils jimu/DataSourceManager jimu/statisticsUtils".split(" "),function(k,g,l,h,n,p){return{getClientFeaturesFromMap:function(a,b,c,d){return h.getClientFeaturesFromMap(a,b,c,d)},listenClientFeaturesFromMap:function(a,b,c,d,e){var f=[];c&&(f.push(k(b,"selection-complete",g.hitch(this,function(){e(this.getClientFeaturesFromMap(a,b,c,d))}))),f.push(k(b,"selection-clear",g.hitch(this,function(){e(this.getClientFeaturesFromMap(a,b,c,d))}))));d&&f.push(k(a,
"extent-change",g.hitch(this,function(){0<b.graphics.length&&e(this.getClientFeaturesFromMap(a,b,c,d))})));f.push(k(b,"update-end",g.hitch(this,function(){e(this.getClientFeaturesFromMap(a,b,c,d))})));e(this.getClientFeaturesFromMap(a,b,c,d));return{remove:function(){f&&l.forEach(f,g.hitch(this,function(a){a.remove()}));f=null}}},getVaildIndicator:function(a,b,c){var d=[];b.map(g.hitch(this,function(b){(b=this._handleOperator(b,a,c))&&d.push(b)}));if(0<d.length)return d[d.length-1]},getSingleValueFromFeatures:function(a,
b,c){var d=n.getInstance(),e=0;if("Features"===a.type){if("DATA_SOURCE_FEATURE_LAYER_FROM_MAP"===b.dataSourceType||"Features"===d.getDataSourceConfig(b.frameWorkDsId).type)return c.length;e=0;l.forEach(c,function(a){var b=a.attributes.STAT_COUNT;"undefined"===typeof b&&(b=a.attributes.stat_count);e+=b});return e}if("DATA_SOURCE_FEATURE_LAYER_FROM_MAP"===b.dataSourceType||"Features"===d.getDataSourceConfig(b.frameWorkDsId).type)return this._getStatsFromFeatures(c,a.fieldName,a.statisticsType);var f=
0,m=0,e=0,g=h.upperCaseString(a.fieldName+"_"+a.statisticsType);l.forEach(c,function(b){var c=b.attributes[g];"undefined"===typeof c&&(g=h.lowerCaseString(a.fieldName+"_"+a.statisticsType),c=b.attributes[g]);switch(a.statisticsType){case "sum":f+=c;break;case "min":f=Math.min(f,c);break;case "max":f=Math.max(f,c);break;case "avg":b=this._getSumCountValue(a.fieldName,b.attributes),m+=b.sum,e+=b.count}}.bind(this));"avg"===a.statisticsType&&(f=0===e?0:m/e);return f},_getSumCountValue:function(a,b){var c;
c=h.upperCaseString(a+"_SUM");c=b[c];"undefined"===typeof c&&(c=h.lowerCaseString(a+"_SUM"),c=b[c]);a=b.STAT_COUNT;"undefined"===typeof a&&(a=h.lowerCaseString("STAT_COUNT"),a=b[a]);return{sum:c||0,count:a||0}},filterFeaturesByDataSourceSetting:function(a,b,c){if(0===a.length)return[];if(b.useSelection){var d=a[0].getLayer();if(d){var e=d.getSelectedFeatures();0<e.length&&(a=l.filter(a,function(a){return-1<e.indexOf(a)}))}}b.filterByExtent&&(a=h.filterFeaturesByExtent(c.extent,a));return a},_getStatsFromFeatures:function(a,
b,c){return p.getStatisticsResultFromClientSync({featureSet:{features:a},fieldName:b,statisticTypes:[c]})[c+"Field"]},_handleOperator:function(a,b,c){function d(a){e={};a.valueColor&&(e.valueColor=a.valueColor);a.gaugeColor&&(e.gaugeColor=a.gaugeColor);a.iconInfo&&(e.iconInfo=a.iconInfo)}var e,f=a.value.map(g.hitch(this,function(b){return a.isRatio?b/100*c:b}));"greater"===a.operator&&b>f[0]?d(a):"smaller"===a.operator&&b<f[0]?d(a):"between"===a.operator&&b>f[0]&&b<f[1]?d(a):"equal"===a.operator&&
b===f[0]?d(a):"notEqual"===a.operator&&b!==f[0]&&d(a);return e},isInteger:function(a){return"number"===typeof a&&0===a%1}}});