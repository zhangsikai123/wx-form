import * as echarts from '../../ec-canvas/echarts';
import http from '@chunpu/http';
const dateutils = require('../../utils/date.js');
const app = getApp();
let chart;

let option3 = {
      title: {
        text: '其他统计',
        left: 'center'
      },
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
          }
      }]
    };

let option2 = {
      title: {
        text: '效率统计',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    };
let option= {
      title: {
        text: '工作量统计',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 10,
        data: ['AAA', 'BBB', 'CCC', 'DDD', 'EEE']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
              show: false,
              position: 'center'
          },
          emphasis: {
              label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
              }
          },
          labelLine: {
              show: false
          },
          data: [
              {value: 335, name: 'AAA'},
              {value: 310, name: 'BBB'},
              {value: 234, name: 'CCC'},
              {value: 135, name: 'DDD'},
              {value: 1548, name: 'EEE'}
          ]
        }
      ]
};


function initChart(canvas, width, height, dpr) {
   chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // new
    });
   canvas.setChart(chart);
   chart.setOption(option2);
   return chart;
};

Page({

  /**
   * Page initial data
   */
  data: {
    ec: {
      onInit: initChart
    },
    userInfo: null,
    formList: [],
    chart: null,

  },
  load() {
     http.get(`/forms?phone=${this.data.userInfo.phoneNumber}`).then((response) => {
       const data = response.data;
      if (data && typeof data === 'object') {
        this.setData({formList: data});
        return data;
      }
      return Promise.reject(response);
     });
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

  },

  line() {
    chart.setOption(option2);
  },
  //切换柱状图
  bar(){
    chart.setOption(option3);
  },
});
