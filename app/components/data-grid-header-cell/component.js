import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["data-grid-cell"],
  didInsertElement: function() {
    this.$().width(this.get("column.width"));
    this.$().height(this.get("row.height"));
  }
});
