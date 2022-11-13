// pages/admin_management/index.js
import http from '@chunpu/http';
import {render} from '../../model/form.js';
Page({

  /**
   * Page initial data
   */
  data: {
    formList: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    return http.get('/forms').then((response) => {
      const data = response.data;
      if (data && typeof data === 'object') {
        this.setData({formList: render(data)});
        return data;
      }
      return Promise.reject(response);
    });
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
