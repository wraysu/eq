// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
define(["dojo/_base/declare", "jimu/BaseWidget", 'jimu/dijit/Report', 'jimu/dijit/PageUtils', "jimu/LayerInfos/LayerInfos", "jimu/LayerInfos/LayerInfo"], function (a, b, Report, PageUtils, LayerInfos, LayerInfo) {
  return a([b],
    {
      startup: function () {
        this.inherited(arguments);
        this.mapIdNode.innerHTML = 'map id is:' + this.map.id;
        this.report = new Report({
          footNotes: "Report Generated by Artemis",
          printTaskUrl: "http://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
          reportLayout: {
            "pageSize": PageUtils.PageSizes.A4,
            "orientation": PageUtils.Orientation.Landscape
          }
        });
        LayerInfos.getInstance(map, map.itemInfo).then(lang.hitch(this, function (layerInfosObj) {
          this.own(layerInfosObj.on(
            'layerInfosChanged',
            lang.hitch(this, this.onLayerInfosChanged)));
        }));
        var layerInfo = this.layerInfosObj.getLayerInfoById(fLayer.id);
        this.publishData({
          'target': 'AttributeTable',
          'layer': layerInfoSelf
        });

        map.addLayer(fLayer);
        console.log('startup');
      },
      _onBtnPrintClicked: function () {
        var printData = [
          {
            addPageBreak: true,
            type: "map",
            map: this.map
          },
          {
            title: "List of parks",
            addPageBreak: false,
            type: "table",
            tableCols: 3,
            data: {
              showRowIndex: false,
              rows: [["Brookside Park", "1630 Brookside Avenue, Redlands, CA 92373", "34.045347, -117.209909"],
              ["Crafton Park", "Wabash Ave & Independence Ave, Redlands, CA 92374", "34.060946, -117.140118"],
              ["Ford Park", "Parkford Dr & Redlands Blvd, Redlands, CA 92374", "34.043828, -117.160692"],
              ["Prospect Park", "352 Prospect Dr., Redlands, CA 92373", "34.039145, -117.172582"],
              ["Sylvan Park", "601 N University St, Redlands, CA 92374", "34.059977, -117.168179"]],
              cols: ["Name", "Address", "Lat/Lon"]
            }
          },
          {
            title: "Photos",
            type: "html",
            data: '<div style="height: 450px;"><div style="width: 250px; margin-left: 10px; float: left;"><div><img style="width: 250px; height: 200px; float: left;" src="http://cityofredlands.org/sites/default/files/rda/Landmarks/brookside.jpg" /></div><div style="text-align:center; margin-bottom: 10px;">Brookside Park</div></div>' +
              '<div style="width: 250px; margin-left: 10px; float: left;"><div><img style="width: 250px; height: 200px; float: left;" src="http://cityofredlands.org/sites/default/files/rda/Landmarks/Crafton.jpg" /></div><div style="text-align:center; margin-bottom: 10px;">Crafton Park</div></div>' +
              '<div style="width: 250px; margin-left: 10px; float: left;"><div><img style="width: 250px; height: 200px; float: left;" src="http://cityofredlands.org/sites/default/files/rda/Landmarks/ford-park.jpg" /></div><div style="text-align:center; margin-bottom: 10px;">Ford Park</div></div>' +
              '<div style="width: 250px; margin-left: 10px; float: left; clear:left;"><div><img style="width: 250px; height: 200px; float: left;" src="http://cityofredlands.org/sites/default/files/rda/Landmarks/Prospect%20park.jpg" /></div><div style="text-align:center; margin-bottom: 10px;">Prospect Park</div></div>' +
              '<div style="width: 250px; margin-left: 10px; float: left;"><div><img style="width: 250px; height: 200px; float: left;" src="http://cityofredlands.org/sites/default/files/rda/Landmarks/Sylvan%20Park.jpg" /></div><div style="text-align:center; margin-bottom: 10px;">Sylvan Park</div></div></div>'
          }];
        this.report.print("Redlands Parks", printData);
      },
      baseClass: "jimu-widget-mywidget"
    })
});
