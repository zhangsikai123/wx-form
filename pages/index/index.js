// pages/index/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    routes: [
      {name:'我是职员', id:'form', url:'../worker/index'},
      {name:'我是管理', id:'admin', url:'../admin/index'}
    ]
  },

  navigate(e) {
    let url = e.currentTarget.dataset.url;
    let id = e.currentTarget.dataset.id;
    console.log(e, id);
    wx.navigateTo({url: url});
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
});
