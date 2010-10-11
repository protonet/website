/**
 * Generates a random number between min and max
 */
protonet.utils.getRandomNumberInRange = function(min, max) {
  return min + Math.round(Math.random() * (max - min));
};

/**
 * Cloud Animation
 * Creates and animates a number of clouds in a given container
 *
 * @param {Element} container jQuery reference to the container element
 * @param {Object} [config] See defaultConfig for detailed documentation
 *
 * @example
 *    new protonet.effects.Clouds($("body"), {
 *      amount: 10,
 *      minStartPosition: 0,
 *      maxStartPosition: 50
 *    });
 */
protonet.effects.Clouds = function(container, config) {
  this.container = container;
  this.containerSize = {
    width: container.width(),
    height: container.height()
  };
  this.config = $.extend({}, this.defaultConfig, config);
  this.clouds = $();

  this._preload(function() {
    var i = this.config.amount;
    while (i--) {
      this.clouds = this.clouds.add(this._createCloud());
    }
    this.clouds.appendTo(this.container);
    if (this.config.animated) {
      this._startAnimation();
    }
  }.bind(this));
};

protonet.effects.Clouds.prototype = {
  /**
   * This object will be merged with the config object passed into the constructor
   */
  defaultConfig: {
    amount:           10,                   // Number of how many clouds should be shown
    minSpeed:         1,                    // Min speed of clouds
    maxSpeed:         10,                   // Max speed of clouds
    minSize:          10,                   // Min size of clouds in percent (relative to the natural size)
    maxSize:          100,                  // Max size of clouds in percent (relative to the natural size)
    minStartPosition: 0,                    // Min start position of clouds in percent (relative to the container width)
    maxStartPosition: 100,                  // Max start position of clouds in percent (relative to the container width)
    image:            "/img/cloud.png",     // Url to the cloud image
    insertMethod:     "prepend",            // jQuery method for inserting the sky element into the given container
    animated:         true
  },

  _createCloud: function(fromStart) {
    var cloudElement = $("<img />", {
      src: this.config.image
    });

    var randomPosition = this._getRandomPosition(),
        randomSize = this._getRandomSize();

    if (fromStart) {
      randomPosition.left = Math.round(this.containerSize.width / 100 * this.config.minStartPosition);
    }

    if (randomSize.height + randomPosition.top > this.containerSize.height) {
      randomPosition.top -= randomSize.height;
    }

    cloudElement
      .attr(randomSize)
      .css({
        position: "absolute",
        top: randomPosition.top.px(),
        left: randomPosition.left.px()
      });

    cloudElement.data("speed", protonet.utils.getRandomNumberInRange(this.config.minSpeed, this.config.maxSpeed));

    return cloudElement;
  },

  /**
   * Preloads the cloud image to get the natural dimensions (width/height)
   * Takes a function as parameter which will be invoked as soon as the image has loaded
   */
  _preload: function(callback) {
    var preloadImage = new Image();
    preloadImage.onload = function() {
      this.config.imageSize = {
        width:  preloadImage.naturalWidth,
        height: preloadImage.naturalHeight
      };

      callback();
    }.bind(this);
    preloadImage.src = this.config.image;
  },

  /**
   * Calculates a random size for the cloud based on
   * this.config.minSize and this.config.maxSize
   * @return {Object} An object containing width/height properties
   */
  _getRandomSize: function() {
    var randomPercent = protonet.utils.getRandomNumberInRange(this.config.minSize, this.config.maxSize),
        width = this.config.imageSize.width / 100 * randomPercent,
        height = this.config.imageSize.height / 100 * randomPercent;

    return {
      width: width,
      height: height
    };
  },

  /**
   * Calculates a random position for the cloud based on
   * this.config.minStartPosition and this.config.maxStartPosition
   * @return {Object} An object containing top/left css properties
   */
  _getRandomPosition: function() {
    var randomPercentX = protonet.utils.getRandomNumberInRange(this.config.minStartPosition, this.config.maxStartPosition),
        randomPercentY = protonet.utils.getRandomNumberInRange(this.config.minStartPosition, this.config.maxStartPosition),
        left = this.containerSize.width / 100 * randomPercentX,
        top = this.containerSize.height / 100 * randomPercentY;

    return {
      left: left,
      top:  top
    };
  },

  _startAnimation: function() {
    this._interval = setInterval(this._moveClouds.bind(this), 150);
  },

  _moveClouds: function() {
    this.containerSize.width = this.container.width();

    this.clouds = this.clouds.map(function(i, cloud) {
      cloud = $(cloud);

      var speed = cloud.data("speed"),
          posLeft = parseFloat(cloud.css("left"), 10);

      if (posLeft > this.containerSize.width) {
        cloud.remove();
        return this._createCloud(true).appendTo(this.container);
      } else {
        return cloud.css("left", (posLeft + speed).px());
      }
    }.bind(this));
  }
};


$(document).ready(function() {
	alert('test');
    new protonet.effects.Clouds($("#cloud-container"), {
      minStartPosition: -10,
      maxStartPosition: 90,
      minSize:          10,
      maxSize:          50,
      amount:           25,
      animated:         false
    });
});
