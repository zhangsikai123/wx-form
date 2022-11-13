export var behavior = Behavior({
  created: function created() {
    const _this = this;

    if (!this.$options) {
      return;
    }

    const cache = {};

    const _this$$options = this.$options();
    const computed = _this$$options.computed;

    const keys = Object.keys(computed);

    this.calcComputed = function() {
      const needUpdate = {};
      keys.forEach(function(key) {
        const value = computed[key].call(_this);

        if (cache[key] !== value) {
          cache[key] = needUpdate[key] = value;
        }
      });
      return needUpdate;
    };
  },
  attached: function attached() {
    this.set();
  },
  methods: {
    // set data and set computed data
    set: function set(data, callback) {
      if (data) {
        this.setData(data, callback);
      }

      if (this.calcComputed) {
        this.setData(this.calcComputed());
      }
    },
  },
});
