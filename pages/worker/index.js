// pages/worker/index.js
import http from '@chunpu/http';
import {render} from '../../model/form.js';
const dateutils = require('../../utils/date.js');
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: null,
    formList: []
  },
  Navigate(e) {
    if (!this.data.userInfo || !this.data.userInfo.phoneNumber){
      wx.showToast({title:'请先登录', icon:'none'});
      return;
    }
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({url:url});
  },
  NavigateDetail(e) {
    let url = '../detail/index';
    let id = e.currentTarget.dataset.id;
    console.log(e, id);
    wx.navigateTo({url: `${url}?id=${id}`});
  },
  load() {
     http.get(`/forms?phone=${this.data.userInfo.phoneNumber}`).then((response) => {
       const data = response.data;
       if (data && typeof data === 'object') {
         this.setData({formList: render(data)});
         return data;
      }
      return Promise.reject(response);
     });
  },
  bindPhoneNumber(e) {
      const detail = e.detail;
      console.log({detail});
      if (detail.iv) {
        http.post('/user/bindphone', {
          encryptedData: detail.encryptedData,
          iv: detail.iv,
        }).then(() => {
          return app.getUserInfo().then((userInfo) => {
            this.setData({
              userInfo: userInfo,
            });
            this.load();
          });
        });
      }
    },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    console.log('onLoad');
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {
    app.ready(() => {
      this.setData({
        userInfo: app.globalData.userInfo,
      });
    });
    if (this.data.userInfo.phoneNumber) {
      this.load();
    }
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
