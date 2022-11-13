// app.js
import util from './utils/util';
import http from '@chunpu/http';
import Ready from 'min-ready';

const ready = Ready();

App({
  onLaunch: function() {
    util.promisify(wx.checkSession)().then(() => {
      console.log('session 生效');
      return this.getUserInfo();
    }).then((userInfo) => {
      console.log('获取session成功', userInfo);
    }).catch((err) => {
      console.log(`获取sessiobn失败, 重新获取`, err);
      return this.login();
    }).catch((err) => {
      console.log(`手动获取失败`, err);
    });
  },
  login() {
    return util.promisify(wx.login)().then(({code}) => {
      console.log(`code: ${code}`);
      return http.post('/oauth/login', {
        code,
        type: 'wxapp',
      });
    }).then(() => {
      return this.getUserInfo();
    });
  },
  getUserInfo() {
    return http.get('/user/info').then((response) => {
      const data = response.data;
      if (data && typeof data === 'object') {
        this.globalData.userInfo = data;
        ready.open();
        return data;
      }
      return Promise.reject(response);
    });
  },
  ready(func) {
    ready.queue(func);
  },
  globalData: {
    userInfo: null,
  },
});
