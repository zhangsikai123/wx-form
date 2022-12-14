import {VantComponent} from '../common/component';
import {isImageFile} from './utils';

VantComponent({
  props: {
    disabled: Boolean,
    multiple: Boolean,
    uploadText: String,
    useBeforeRead: Boolean,
    previewSize: {
      type: null,
      value: 90,
    },
    name: {
      type: [Number, String],
      value: '',
    },
    accept: {
      type: String,
      value: 'image',
    },
    sizeType: {
      type: Array,
      value: ['original', 'compressed'],
    },
    capture: {
      type: Array,
      value: ['album', 'camera'],
    },
    fileList: {
      type: Array,
      value: [],
      observer: 'formatFileList',
    },
    maxSize: {
      type: Number,
      value: Number.MAX_VALUE,
    },
    maxCount: {
      type: Number,
      value: 100,
    },
    deletable: {
      type: Boolean,
      value: true,
    },
    previewImage: {
      type: Boolean,
      value: true,
    },
    previewFullImage: {
      type: Boolean,
      value: true,
    },
    imageFit: {
      type: String,
      value: 'scaleToFill',
    },
  },
  data: {
    lists: [],
    computedPreviewSize: '',
    isInCount: true,
  },
  methods: {
    formatFileList() {
      const {fileList = [], maxCount} = this.data;
      const lists = fileList.map((item) => (Object.assign(Object.assign({}, item), {isImage: typeof item.isImage === 'undefined' ? isImageFile(item) : item.isImage})));
      this.setData({lists, isInCount: lists.length < maxCount});
    },
    startUpload() {
      if (this.data.disabled) {
        return;
      }
      const {name = '', capture, maxCount, multiple, maxSize, accept, sizeType, videoCfg={}, lists, useBeforeRead = false, // 是否定义了 beforeRead
      } = this.data;
      let chooseFile = null;
      const newMaxCount = maxCount - lists.length;
      // 设置为只选择图片的时候使用 chooseImage 来实现
      if (accept === 'image') {
        chooseFile = new Promise((resolve, reject) => {
          wx.chooseImage({
            count: multiple ? (newMaxCount > 9 ? 9 : newMaxCount) : 1,
            sourceType: capture,
            sizeType,
            success: resolve,
            fail: reject,
          });
        });
      } else if (accept === 'video') {
        chooseFile = new Promise((resolve, reject) => {
          wx.chooseMedia({
            count: videoCfg.count || 9,
            mediaType: ['video'],
            sourceType: videoCfg.sourceType || ['album', 'camera'],
            maxDuration: videoCfg.maxDuration || 10,
            camera: videoCfg.camera || 'back',
            success: (res)=>{
              res.isVideo = true;
              resolve(res);
            },
            fail: reject,
          });
        });
      } else {
        chooseFile = new Promise((resolve, reject) => {
          wx.chooseMessageFile({
            count: multiple ? newMaxCount : 1,
            type: 'file',
            success: resolve,
            fail: reject,
          });
        });
      }
      chooseFile
          .then((res) => {
            const file = multiple ? res.tempFiles : res.tempFiles[0];
            // 检查文件大小
            if (file instanceof Array) {
              const sizeEnable = file.every((item) => item.size <= maxSize);
              if (!sizeEnable) {
                this.$emit('oversize', {name});
                return;
              }
            } else if (file.size > maxSize) {
              this.$emit('oversize', {name});
              return;
            }
            const upData = {file, name};
            if (res.isVideo) {
              file.map((val)=>{
                val.isVideo = true;
                return val;
              });
            }
            // 触发上传之前的钩子函数
            if (useBeforeRead) {
              this.$emit('before-read', {
                file,
                name,
                callback: (result) => {
                  if (result) {
                    // 开始上传
                    this.$emit('after-read', upData);
                  }
                },
              });
            } else {
              this.$emit('after-read', upData);
            }
          })
          .catch((error) => {
            this.$emit('error', error);
          });
    },
    deleteItem(event) {
      const {index} = event.currentTarget.dataset;
      this.$emit('delete', {index, name: this.data.name});
    },
    doPreviewImage(event) {
      if (!this.data.previewFullImage) {
        return;
      }
      const curUrl = event.currentTarget.dataset.url;
      const images = this.data.lists
          .filter((item) => item.isImage)
          .map((item) => item.url || item.path);
      this.$emit('click-preview', {url: curUrl, name: this.data.name});
      wx.previewImage({
        urls: images,
        current: curUrl,
        fail() {
          wx.showToast({title: '预览图片失败', icon: 'none'});
        },
      });
    },
  },
});
