import http from '@chunpu/http';
import {formSchema} from '../../model/form.js';
const app = getApp();

Page({
  data: {
    userInfo: null,
    formData: formSchema,
    toSubmit: Math.random(),
  },
  onFormSubmit(e) {
    http.post('/form', e.detail).then(() => {
      wx.showToast({title:'提交成功'});
      let pages= getCurrentPages();
      let beforePage=pages[pages.length-2];
      beforePage.load();
      wx.navigateBack();
    });
  },
  onFormChange(e) {
    console.log('表单变化: ', e);
  },
  // 变更数值, 触发表单提交事件
  toSubmitChange() {
    this.setData({
      toSubmit: Math.random(),
    });
  },
  onLoad: function() {
    app.ready(() => {
      this.setData({
        userInfo: app.globalData.userInfo,
      });
    });
  },
});
