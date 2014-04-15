define(function(require, exports, module) {
  var View      = require('famous/core/View');
  var Surface   = require('famous/core/Surface');
  var Modifier  = require('famous/core/Modifier');
  var Transform = require('famous/core/Transform');

  function _createBacking() {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var stripBackingSurf = new Surface({
      size: [0.925 * windowWidth, 40 * windowHeight/568],
      properties: {
        backgroundColor: 'white',
        border: '1px solid lightgrey'
      }
    });
    var stripMod = new Modifier({
      origin: [0, 0.5],
      transform: Transform.translate(-21, 0, 0)
    });
    this._add(stripMod).add(stripBackingSurf);
  }

  function _createTitle() {
    var windowWidth = window.innerWidth;
    this.stripTitleSurf = new Surface({
      size: [0.9 * windowWidth, true],
      content: this.options.content,
      properties: {
        color: 'black',
        fontSize: '14px',
        textAlign: 'right',
        fontWeight: 'bold'
      }
    });
    this.stripTitleMod = new Modifier({
      origin: [0, .5],
      transform: Transform.translate(-21, -10, 0) // in pixels
    });
    this._add(this.stripTitleMod).add(this.stripTitleSurf);
    this.stripTitleSurf.on('touchstart', function() {
      this.stripTitleMod.setOpacity(0.5);
    }.bind(this));
    this.stripTitleSurf.on('click', function() {
      this.stripTitleMod.setOpacity(1);
      this._eventOutput.emit('clicked', {city: this.stripTitleSurf.content });
    }.bind(this));
  }

  function _createX() {
    this.xSurf = new Surface({
      content: '<img width=35 src="content/images/x-icon.png"/>',
      size: [35, 35]
    });
    this.xMod = new Modifier({
      origin: [0, 0.5],
      transform: Transform.translate(-21, 0, 0)
    });
    this._add(this.xMod).add(this.xSurf);
    this.xSurf.on('click', function() {
      this.xMod.setOpacity(1);
      this._eventOutput.emit('clicked');
    }.bind(this));
  }

  function StripContainer() {
    View.apply(this, arguments);
    _createBacking.call(this);
    _createTitle.call(this);
    _createX.call(this);
  }

  StripContainer.prototype = Object.create(View.prototype);
  StripContainer.prototype.constructor = StripContainer;

  StripContainer.DEFAULT_OPTIONS = {};

  function StripView() {
    View.apply(this, arguments);
    this.stripContainer = new StripContainer(this.options);
    this.stripContainerMod = new Modifier({
      size: [undefined, undefined],
      transform:
        Transform.multiply(
          Transform.rotateZ(Math.PI),
          Transform.translate(21, 0, 0)
        ),
      origin: [0, 0.5]
    });
    this.isReset = true;
    this.stripContainer.pipe(this._eventOutput);
    this._add(this.stripContainerMod).add(this.stripContainer);
  }

  StripView.prototype = Object.create(View.prototype);
  StripView.prototype.constructor = StripView;

  StripView.DEFAULT_OPTIONS = {
    content: null,
    angle: 0,
    transition: null
  };

  StripView.prototype.rotate = function(angle, cb) {
    this.stripContainerMod.setTransform(
      Transform.rotateZ(angle),
      {duration: 500},
      cb
    );
    this.isReset = false;
  };

  StripView.prototype.reset = function() {
      this.stripContainerMod.setTransform(
      Transform.rotateZ(Math.PI)
    );
    this.isReset=true;
  };

  module.exports = StripView;
});
