import Ember from 'ember';
import DataGridModel from "./model";

export default Ember.Component.extend({
  initialize: function() {
    var model = DataGridModel.create();
    this.set("model", model);
    this.setRowsOnModel(model);
  }.on("init"),
  attributeBindings: ["height"],
  headerMode: {
    mode: "header"
  },
  setRowsOnModel: function(model) {
    var items = this.get("items");
    model.updateRows(items);
  },
  items: Ember.A(),
  onItemsChanged: Ember.observer("items", function() {
    this.setRowsOnModel(this.get("model"));
  }),
  rowHeight: 25,
  width: null,
  height: null,
  model: null,
  didInsertElement: function() {
    this.$().width(this.get("width"));
    this.$(".data-grid").height(this.get("height"));
  },
  actions: {
    setAsSelected: function(index) {
      this.set("model.selectedRowIndex", index);
    }
  }
});
