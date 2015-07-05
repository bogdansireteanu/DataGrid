import Ember from 'ember';

export default Ember.Component.extend({
  tagName:"",
  registerWithParent:function(){
    var parent = this.get("registerWith");
    parent.registerColumn(this);
  }.on("init"),
});
