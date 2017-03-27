(function (window) {

  var Muuri = window.Muuri;

  QUnit.module('Item methods');

  QUnit.test('item.isMigrating() should return true if the item is being sent to another grid', function (assert) {

    assert.expect(3);

    var done = assert.async();
    var containerA = utils.createGridElements().container;
    var containerB = utils.createGridElements().container;
    var gridA = new Muuri(containerA);
    var gridB = new Muuri(containerB);
    var item = gridA.getItems()[0];

    assert.strictEqual(item.isMigrating(), false, 'An item should not be in migrating state when it`s position is not being animated during send operation');
    gridA.send(item, gridB, 0, {
      layoutReceiver: function () {
        assert.strictEqual(item.isMigrating(), false, 'An item should not be in migrating state after the send operation is finished');
        gridA.destroy();
        gridB.destroy();
        containerA.parentNode.removeChild(containerA);
        containerB.parentNode.removeChild(containerB);
        done();
      }
    });
    assert.strictEqual(item.isMigrating(), true, 'An item should be in migrating state when it`s position is being animated during send operation');

  });

})(this);