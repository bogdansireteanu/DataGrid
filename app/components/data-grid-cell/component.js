import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["data-grid-cell"],
  column: null,
  idEditing: false,
  onBindingPathChanged:Ember.observer("column.bindingPath", function(){
      var bindingFrom ="item." + this.get("column.bindingPath"),
      binding = Ember.Binding.from(bindingFrom).to("value");
      binding.connect(this);
      this.set("currentBinding", binding);
    }
  ).on("init"),
  value:null,
  componentName: Ember.computed("column", "isEditing", {
    get: function() {
      if (this.get("isEditing")) {
        return this.get("column.editComponent");
      }
      return this.get("column.viewComponent");
    }
  }),
  didInsertElement: function() {
    this.$().width(this.get("column.width"));
    this.$().height(this.get("row.height"));
  },
  click: function() {
    this.sendAction("cellSelected");
  },
  willDestroy:function(){
    this._super();
    var binding = this.get("binding");
    if (binding) {
      binding.disconnect();
      binding.destroy();
    }
  }
});
