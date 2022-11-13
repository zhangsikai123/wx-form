import http from '@chunpu/http';
import {formSchema} from '../../model/form';
const app = getApp();
let now = new Date();

Page({
  data: {
    userInfo: null,
    toSubmit: Math.random(),
  },
  onLoad: function(e) {
    return http.get(`/form?id=${e.id}`).then((response) => {
      const data = response.data;
      if (data && typeof data === 'object') {
        let formData = [];
        formSchema.forEach((val) => {
          switch(val.type){
          case 'file':
            val['fileList'] = data[val.id];
            break;
          case 'timePicker':
            val['config']['initStartTime'] = data[val.id]['start'];
            val['config']['initEndTime'] = data[val.id]['end'];
            break;
          case 'user':
            val['type'] = 'input';
            val['defaultValue'] = data[val.id];
          default:
            val['defaultValue'] = data[val.id];
            break;
          }
          val['disabled'] = true;
          formData.push(val);
        });
        this.setData({formData: formData});
        console.log(data);
        return data;
      }
      return Promise.reject(response);
    });
    app.ready(() => {
      this.setData({
        userInfo: app.globalData.userInfo,
      });
    });
  },
});
