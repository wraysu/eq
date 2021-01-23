// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

require({cache:{"url:widgets/Infographic/_ChartSetting.html":'\x3cdiv\x3e\r\n  \x3cdiv class\x3d"flex section" data-dojo-attach-point\x3d"legendSection"\x3e\r\n    \x3cdiv class\x3d"label textOverFlow" title\x3d"${nls.legend}"\x3e${nls.legend}\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"legendToggle" data-dojo-attach-event\x3d"onclick:_onToggleClick" class\x3d"jimu-leading-margin10 toggle toggle-off" data-id\x3d"legend"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n\r\n  \x3cdiv class\x3d"flex section" data-dojo-attach-point\x3d"dataLabelsSection"\x3e\r\n    \x3cdiv class\x3d"label textOverFlow" title\x3d"${nls.dataLabels}"\x3e${nls.dataLabels}\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"dataLabelsToggle" data-dojo-attach-event\x3d"onclick:_onToggleClick" class\x3d"jimu-leading-margin10 toggle toggle-off" data-id\x3d"dataLabels"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n\r\n  \x3cdiv class\x3d"flex section" data-dojo-attach-point\x3d"horizontalAxisSection"\x3e\r\n    \x3cdiv class\x3d"label textOverFlow" title\x3d"${nls.horizontalAxis}"\x3e${nls.horizontalAxis}\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"horizontalAxisToggle" data-dojo-attach-event\x3d"onclick:_onToggleClick" class\x3d"jimu-leading-margin10 toggle toggle-off" data-id\x3d"horizontalAxis"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n\r\n  \x3cdiv class\x3d"flex section" data-dojo-attach-point\x3d"verticalAxisSection"\x3e\r\n    \x3cdiv class\x3d"label textOverFlow" title\x3d"${nls.verticalAxis}"\x3e${nls.verticalAxis}\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"verticalAxisToggle" data-dojo-attach-event\x3d"onclick:_onToggleClick" class\x3d"jimu-leading-margin10 toggle toggle-off" data-id\x3d"verticalAxis"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n\r\n   \x3cdiv class\x3d"flex section" data-dojo-attach-point\x3d"withoutRecordsSection"\x3e\r\n    \x3cdiv class\x3d"label textOverFlow" title\x3d"${nls.showPeriodsWithoutRecords}"\x3e${nls.showPeriodsWithoutRecords}\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"withoutRecordsToggle" data-dojo-attach-event\x3d"onclick:_onToggleClick" class\x3d"jimu-leading-margin10 toggle toggle-off" data-id\x3d"withoutRecords"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n\r\n\x3c/div\x3e'}});
define(["dojo/_base/declare","dojo/_base/html","dijit/_WidgetBase","dijit/_TemplatedMixin","dojo/text!./_ChartSetting.html"],function(d,b,e,f,g){return d([e,f],{templateString:g,baseClass:"ig-chart-setting-dlg",postCreate:function(){var a=this.chartJson.config,c=a.type;"pie"===c?(b.setStyle(this.verticalAxisSection,"display","none"),b.setStyle(this.horizontalAxisSection,"display","none"),b.setStyle(this.withoutRecordsSection,"display","none")):b.setStyle(this.dataLabelsSection,"display","none");this.chartJson.config.dateConfig||
b.setStyle(this.withoutRecordsSection,"display","none");this._calcuteLegendDisplay(a)||b.setStyle(this.legendSection,"display","none");"count"!==this.chartJson.config.mode&&"field"!==this.chartJson.config.mode||"pie"===c||b.setStyle(this.legendSection,"display","none");this.chartJson.config.showLegend&&this._toggle(this.legendToggle);this.chartJson.config.showDataLabel&&this._toggle(this.dataLabelsToggle);this.chartJson.config.showHorizontalAxis&&this._toggle(this.horizontalAxisToggle);this.chartJson.config.showVerticalAxis&&
this._toggle(this.verticalAxisToggle);this.chartJson.config.dateConfig&&this.chartJson.config.dateConfig.isNeedFilled&&this._toggle(this.withoutRecordsToggle)},_calcuteLegendDisplay:function(a){var c=a.mode,b;"pie"===a.type?b=!0:(b=!0,"count"===c||"field"===c?b=!1:a.seriesStyle&&(b="layerSymbol"!==a.seriesStyle.type));return b},_toggle:function(a){b.hasClass(a,"toggle-on")?(b.removeClass(a,"toggle-on"),b.addClass(a,"toggle-off")):(b.removeClass(a,"toggle-off"),b.addClass(a,"toggle-on"))},_onToggleClick:function(a){var c=
a.target;this._toggle(c);a=b.hasClass(c,"toggle-on")?!0:!1;c=b.attr(c,"data-id");"legend"===c?this.chartJson.config.showLegend=a:"dataLabels"===c?this.chartJson.config.showDataLabel=a:"horizontalAxis"===c?this.chartJson.config.showHorizontalAxis=a:"verticalAxis"===c?this.chartJson.config.showVerticalAxis=a:"withoutRecords"===c&&this.chartJson.config.dateConfig&&(this.chartJson.config.dateConfig.isNeedFilled=a);this.chartDijit.setConfig(this.chartJson.config)}})});