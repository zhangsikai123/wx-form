// pages/admin_management/index.js
import http from '@chunpu/http';
Component({

  /**
   * Page initial data
   */
  properties: {
    formList: Array,
  },
  lifetimes: {
    attached: function() {
    },
    moved: function() { },
    detached: function() { },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function() {
    },
    hide: function() { },
    resize: function() { },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    navigateDetail(e) {
      let url = '../detail/index';
      let id = e.currentTarget.dataset.id;
      console.log(e, id);
      wx.navigateTo({url: `${url}?id=${id}`});
  },
 }
});
