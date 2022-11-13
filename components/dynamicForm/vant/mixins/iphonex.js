let isIPhoneX = null;

function getIsIPhoneX() {
  return new Promise(function(resolve, reject) {
    if (isIPhoneX !== null) {
      resolve(isIPhoneX);
    } else {
      wx.getSystemInfo({
        success: function success(_ref) {
          const model = _ref.model;
          const screenHeight = _ref.screenHeight;
          const iphoneX = /iphone x/i.test(model);
          const iphoneNew = /iPhone11/i.test(model) && screenHeight === 812;
          isIPhoneX = iphoneX || iphoneNew;
          resolve(isIPhoneX);
        },
        fail: reject,
      });
    }
  });
}

export var iphonex = Behavior({
  properties: {
    safeAreaInsetBottom: {
      type: Boolean,
      value: true,
    },
  },
  created: function created() {
    const _this = this;

    getIsIPhoneX().then(function(isIPhoneX) {
      _this.set({
        isIPhoneX: isIPhoneX,
      });
    });
  },
});
