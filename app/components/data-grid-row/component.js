import Ember from 'ember';
import RowModel from "./model";

function isElementVisible(el) {
  var rect = el.getBoundingClientRect(),
    vWidth = window.innerWidth || el.documentElement.clientWidth,
    vHeight = window.innerHeight || el.documentElement.clientHeight,
    efp = function(x, y) {
      return document.elementFromPoint(x, y);
    };

  // Return false if it"s not in the viewport
  if (rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || rect.top > vHeight) {
    return false;
  }

  // Return true if any of its four corners are visible
  return (
    el.contains(efp(rect.left, rect.top)) || el.contains(efp(rect.right, rect.top)) || el.contains(efp(rect.right, rect.bottom)) || el.contains(efp(rect.left, rect.bottom))
  );
}

export default Ember.Component.extend({
  isOnScreen: false,
  model:RowModel.create(),
  classNames: ["data-grid-row"],
  item: Ember.computed.alias("model.data"),
  selectedRowIndex: Ember.computed.alias("model.selectedRowIndex"),
  index: Ember.computed.alias("model.index"),
  height: null,
  updateIsOnScreen: function() {
    var el = this.element,
      isVisible = isElementVisible(el);
    this.set("isOnScreen", isVisible);
    console.log("->>>>>>>>>>>>>>>>>>>>>> " + isVisible);
  },
  isScrolledIntoView: function(elem) {
    var $elem = Ember.$(elem);
    var $window = Ember.$(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  },
  didInsertElement: function() {
    this.$().height(this.get("height"));
    this.updateIsOnScreen();
    var self = this;
    var onScroll = function() {
      Ember.run.debounce(self, this.updateIsOnScreen, 200);
    };
    Ember.$(document).on("scrolling.scrollableDiv", onScroll.bind(this));
  },
  willDestroyElement: function() {
    Ember.$(document).off("scrolling.scrollableDiv");
  },
  click: function() {
    this.sendAction("setAsSelected", this.get("index"));
  },
  didEnterViewport: function() {
    if (this.get("isOnScreen")) {
      console.log("in=>" + this.get("item.title"));
    } else {
      console.log("out =>" + this.get("item.title"));
    }
  }.observes("isOnScreen")
});
