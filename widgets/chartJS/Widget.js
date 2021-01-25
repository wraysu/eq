define(['dojo/_base/declare',
  'jimu/BaseWidget',
  'dojo/on',
  'dojo/_base/lang',
  'dojo/Deferred',
  'dojo/dom',
  'dijit/form/Select',
  'dijit/form/Button',
  'dijit/layout/TabContainer',
  'dijit/layout/ContentPane',
  './chartJS',
  './webMapLayersIds',
  'esri/tasks/query',
  'esri/tasks/QueryTask',
  'jimu/dijit/TabContainer3',
  'dojo/domReady!'],
  function (declare, BaseWidget, on, lang, Deferred, dom,
    Select, Button, TabContainer, ContentPane,
    chartJS, webMapLayersIds,
    Query, QueryTask,
    TabContainer3) {

    return declare([BaseWidget], {

      layer: null,
      fieldX: null,
      fieldY: null,
      url: null,
      type: null,
      lineChart: null,
      barChart: null,
      extensionFilter: null,
      extensionEvent: null,
      eq: null,
      eqID: [],
      eqoID:[],

      startup: function () {
        this.inherited(arguments)
        this.initgetEQ()
        this.initTabs()
        this.initLayerChooser()
        this.initCharts()
      },
      initgetEQ: function () {
        var eqURL = "https://dataapi.ncdr.nat.gov.tw/NCDRAPI/Opendata/NCDR/EQ";
        fetch("https://cors-anywhere.herokuapp.com/" + eqURL)
          .then(res => {
            return res.json();
          }).then(result => {
            result[0].Data.forEach(item => {
              item.ID = item.WGS84_Lon + '_' + item.WGS84_Lan;
              this.eqID.push(item.WGS84_Lon + '_' + item.WGS84_Lan)
            });
            this.eq = result[0];
            this.eqName.innerHTML = this.eq.EventName;
            this.eqTime.innerHTML = this.eq.EventDateTime.replace("T", " ");
            this.eqMagnitude.innerHTML = this.eq.Magnitude;
            debugger;
            this.filterLayer();
          });
      },
      initCharts: function () {
        this.lineChart = new chartJS({
          node: this.canvas,
          type: 'line',
          labels: null,
          label: this.fieldY,
          data: null
        })

        this.barChart = new chartJS({
          node: this.barCanvas,
          type: 'bar',
          labels: null,
          label: this.fieldY,
          data: null
        })
      },

      initTabs: function () {
        var lineTab = {
          title: this.nls.lineTitleTab,
          content: this.lineTabNode
        };

        var barTab = {
          title: this.nls.barTitleTab,
          content: this.barTabNode
        };

        var tab = new TabContainer3({
          tabs: [lineTab, barTab]
        }, this.tabNode);
      },

      onOpen: function () {
        this.extensionEvent = this.map.on('extent-change', lang.hitch(this, function (evt) {
          this.extensionFilter = evt.extent
          this.gettingLayer()
        }));
      },

      initLayerChooser: function () {
        var idForChangeEvent = "layerChooserNodeEvent";

        new webMapLayersIds({
          idForChangeEvent: idForChangeEvent,
          layerNode: "layerChooserNode",
          map: this.map,
          geometry: "*"
        });

        this.initSelects(dijit.byId(idForChangeEvent).value);

        dijit.byId(idForChangeEvent).on("change", lang.hitch(this, function (evt) {
          this.options(evt)
        }))
      },

      initSelects: function (layerId) {
        new Select({
          name: "selectFieldX",
          id: "selectFieldX"
        }, this.selectXContainer).startup()

        new Select({
          name: "selectFieldY",
          id: "selectFieldY"
        }, this.selectYContainer).startup()

        var fieldXid = dijit.byId('selectFieldX')
        this.fieldX = fieldXid.value;
        this.own(on(fieldXid, 'change', lang.hitch(this, function (evt) {
          this.fieldX = evt
        })));

        var fieldYid = dijit.byId('selectFieldY')
        this.fieldY = fieldYid.value;
        this.own(on(fieldYid, 'change', lang.hitch(this, function (evt) {
          this.fieldY = evt
        })));

        this.options(layerId)
      },

      options: function (layerId) {
        this.layer = this.map.getLayer(layerId)
        this.url = this.layer.url
        var fields = this.layer.fields

        var map = fields.map(function (record) {
          return dojo.create("option", {
            label: record.name,
            value: record.name
          })
        })

        var selectX = dijit.byId('selectFieldX')
        var selectY = dijit.byId('selectFieldY')

        if (selectX.getOptions()) {
          selectX.options.length = 0
          selectY.options.length = 0
          selectX.addOption(map)
          selectY.addOption(map)
        }
      },

      gettingLayer: function (oID) {
        var query = new Query()
        query.where = "1=1"
        if (!this.extensionFilter) this.extensionFilter = this.map.extent;
        query.geometry = this.extensionFilter
        query.returnGeometry = false;
        query.outFields = ['nid', this.fieldX, this.fieldY]
        //     query.outFields = '*';
        new QueryTask(this.url).execute(query, lang.hitch(this, function (results) {
          this.render(results)
        }))
      },

      filterLayer: function () {
        this.layer = this.map.getLayer(dijit.byId("layerChooserNodeEvent").value)
        this.url = this.layer.url
        var fields = this.layer.fields      
        var query = new Query()
        query.where = "1=1"
        query.returnGeometry = false;
        query.outFields = ["*"]
        new QueryTask(this.url).execute(query, lang.hitch(this, function (results) {
          console.log(results.features); 
          results.features.forEach(item=>{
            if (this.eqID.indexOf(item.attributes.nid) > -1) this.eqoID.phsh(item.attributes.objectID)
          }) 
        }))       
        debugger;
      },

      render: function (results) {
        var map = []
        var labels = []

        var def = new Deferred()
        def.resolve(':)');
        def.then(lang.hitch(this, function () {
          for (i in results.features) {
            map.push({
              x: results.features[i].attributes[this.fieldX],
              y: results.features[i].attributes[this.fieldY]
            })
          }
        })).then(lang.hitch(this, function () {
          for (i in map) {
            labels.push(map[i].x)
          }
        })).then(lang.hitch(this, function () {
          this.lineChart.updateChart(labels, map)
          this.barChart.updateChart(labels, map)
        }))
      },

      onClose: function () {
        this.extensionEvent.remove()
      }
    });
  });
