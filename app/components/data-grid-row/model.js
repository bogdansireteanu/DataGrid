import Ember from "ember";
export default Ember.Object.extend({
  isEditing: false,
  isSelected: false,
  index: null,
  selectedRowIndex: null,
  onSelectedRowIndexChanged: Ember.observer("index", "selectedRowIndex", function() {
    Ember.run.scheduleOnce("afterRender", this, function() {
      var isEditing = this.get("isEditing"),
        index = this.get("index"),
        selectedRowIndex = this.get("selectedRowIndex"),
        newValue = index === selectedRowIndex;
      if (isEditing !== newValue) {
        this.set("isEditing", newValue);
      }
    });
  }),
  data: null,
});
