(function () {
  angular.module("MenuApp")
  .controller("ItemsController", ItemsController);

  ItemsController.$inject = ['items'];
  function ItemsController (items) {
    var itemCtrl = this;
    itemCtrl.items = items.data.menu_items;
  }
})();
