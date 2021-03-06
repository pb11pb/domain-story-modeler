import '../../../app/domain-story-modeler/util/MathExtensions';

import { selectPartOfActivity, labelPositionX, labelPosition, labelPositionY, calculateTextWidth } from '../../../app/domain-story-modeler/features/labeling/DSLabelUtil';

describe('DSLabelUtil', function() {

  // will only be used for three or more waypoints
  it('selectActivity bothSlanted test', function() {
    var startPoint = {
      x: 10,
      y: 10
    };

    var endPoint = {
      x: 30,
      y: 30
    };

    var midPoint = {
      x: 30,
      y: 20
    };

    var waypoints = [startPoint, midPoint, endPoint];
    var angleActivity = [];

    for (var i = 0; i < 3 - 1; i++) { // calculate the angles of the activity
      angleActivity[i] = Math.angleBetween(waypoints[i], waypoints[i + 1]);
    }

    var res = selectPartOfActivity(waypoints, angleActivity);

    assert.equal(res, 0);
    assert.deepEqual(res, 0);

  });

  it('selectActivity secondStraight test', function() {
    var startPoint = {
      x: 10,
      y: 10
    };

    var endPoint = {
      x: 100,
      y: 30
    };

    var midPoint = {
      x: 20,
      y: 30
    };

    var waypoints = [startPoint, midPoint, endPoint];
    var angleActivity = new Array(2);

    for (var i = 0; i < 3 - 1; i++) { // calculate the angles of the activity
      angleActivity[i] = Math.angleBetween(waypoints[i], waypoints[i + 1]);
    }
    var res = selectPartOfActivity(waypoints, angleActivity);

    assert.equal(res, 1);
    assert.deepEqual(res, 1);

  });

  it('selectActivity firstStraight test', function() {
    var startPoint = {
      x: 10,
      y: 10
    };

    var endPoint = {
      x: 30,
      y: 30
    };

    var midPoint = {
      x: 30,
      y: 10
    };

    var waypoints = [startPoint, midPoint, endPoint];
    var angleActivity = new Array(2);

    for (var i = 0; i < 3 - 1; i++) { // calculate the angles of the activity
      angleActivity[i] = Math.angleBetween(waypoints[i], waypoints[i + 1]);
    }

    var res = selectPartOfActivity(waypoints, angleActivity);

    assert.equal(res, 0);
    assert.deepEqual(res, 0);
  });

  it('labelPosition test', function() {
    var startPoint = {
      x: 10,
      y: 10
    };

    var endPoint = {
      x: 30,
      y: 30
    };

    var midPoint = {
      x: 30,
      y: 20
    };

    var waypoints = [startPoint, midPoint, endPoint];

    var angleActivity = new Array(2);
    for (var i = 0; i < 3 - 1; i++) { // calculate the angles of the activity
      angleActivity[i] = Math.angleBetween(waypoints[i], waypoints[i + 1]);
    }
    var selectedActivity = selectPartOfActivity(waypoints, angleActivity);

    var xPos = labelPositionX(waypoints[selectedActivity], waypoints[selectedActivity + 1]);
    var yPos = labelPositionY(waypoints[selectedActivity], waypoints[selectedActivity + 1]);

    var supposed = {
      x: xPos,
      y: yPos,
      selected: selectedActivity
    };

    var res = labelPosition(waypoints);

    assert.equal(res.x, supposed.x);
    assert.deepEqual(res.x, supposed.x);
    assert.equal(res.y, supposed.y);
    assert.deepEqual(res.y, supposed.y);
    assert.equal(res.selected, supposed.selected);
    assert.deepEqual(res.selected, supposed.selected);
  });

  it('labelPosition test', function() {
    var startPoint = {
      x: 10,
      y: 10
    };

    var endPoint = {
      x: 30,
      y: 30
    };

    var midPoint = {
      x: 20,
      y: 30
    };

    var waypoints = [startPoint, midPoint, endPoint];

    var angleActivity = new Array(2);
    for (var i = 0; i < 3 - 1; i++) { // calculate the angles of the activity
      angleActivity[i] = Math.angleBetween(waypoints[i], waypoints[i + 1]);
    }
    var selectedActivity = selectPartOfActivity(waypoints, angleActivity);

    var xPos = labelPositionX(waypoints[selectedActivity], waypoints[selectedActivity + 1]);
    var yPos = labelPositionY(waypoints[selectedActivity], waypoints[selectedActivity + 1]);

    var supposed = {
      x: xPos,
      y: yPos,
      selected: selectedActivity
    };

    var res = labelPosition(waypoints);

    assert.equal(res.x, supposed.x);
    assert.deepEqual(res.x, supposed.x);
    assert.equal(res.y, supposed.y);
    assert.deepEqual(res.y, supposed.y);
    assert.equal(res.selected, supposed.selected);
    assert.deepEqual(res.selected, supposed.selected);
  });

  it('labelPosition test', function() {
    var startPoint = {
      x: 10,
      y: 10
    };

    var endPoint = {
      x: 30,
      y: 30
    };

    var midPoint = {
      x: 15,
      y: 15
    };

    var waypoints = [startPoint, midPoint, endPoint];

    var angleActivity = new Array(2);
    for (var i = 0; i < 3 - 1; i++) { // calculate the angles of the activity
      angleActivity[i] = Math.angleBetween(waypoints[i], waypoints[i + 1]);
    }
    var selectedActivity = selectPartOfActivity(waypoints, angleActivity);

    var xPos = labelPositionX(waypoints[selectedActivity], waypoints[selectedActivity + 1]);
    var yPos = labelPositionY(waypoints[selectedActivity], waypoints[selectedActivity + 1]);

    var supposed = {
      x: xPos,
      y: yPos,
      selected: selectedActivity
    };

    var res = labelPosition(waypoints);

    assert.equal(res.x, supposed.x);
    assert.deepEqual(res.x, supposed.x);
    assert.equal(res.y, supposed.y);
    assert.deepEqual(res.y, supposed.y);
    assert.equal(res.selected, supposed.selected);
    assert.deepEqual(res.selected, supposed.selected);
  });

  describe('calculateTextWidth', function() {
    it('returns 0 for empty text', function() {
      assert.equal(0, calculateTextWidth(''));
    });

    it('returns 0 for null', function() {
      assert.equal(0, calculateTextWidth(null));
    });

    it('returns 0 for undefined', function() {
      assert.equal(0, calculateTextWidth(undefined));
    });

    it('returns same value for same characters', function() {
      assert.equal(calculateTextWidth('AIW'), calculateTextWidth('AIW'));
      assert.equal(calculateTextWidth('AIW'), calculateTextWidth('IWA'));
    });

    it('distinguishes casing', function() {
      assert.equal(calculateTextWidth('abcdefghi'), calculateTextWidth('ABCDEFGHI'));
    });
  });

});
