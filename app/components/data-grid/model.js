import Ember from "ember";
import RowModel from "data-grid/components/data-grid-row/model";
export default Ember.Object.extend({
  initialize: function() {
    this.set("columns", []);
  }.on("init"),
  columns: null,
  selectedRowIndex: null,
  registerColumn: function(column) {
    this.get("columns").push(column);
  },
  unregisterColumn: function(column) {
    var index = this.get("columns").indexOf(column);
    this.get("columns").splice(index, 1);
  },
  onSelectedRowIndexChanged:function(){
    var newValue = this.get("selectedRowIndex"), rows =this.get("rows");
    (rows || []).forEach(function(item){
      item.set("selectedRowIndex", newValue);
    });
  }.observes("selectedRowIndex").on("init"),
  updateRows: function(items) {
    var selectedRowIndex = this.get("selectedRowIndex"), rows = [];
    items.forEach(function(item, index) {
      var newRow = RowModel.create({
        data: item,
        index: index
      });
      if (selectedRowIndex !== null && selectedRowIndex !== undefined) {
        newRow.set("isEditing", selectedRowIndex === index);
      }
      rows.push(newRow);
    });
    this.set("rows", rows);
  }
});
