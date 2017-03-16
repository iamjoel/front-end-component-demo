'use strict'
// 不知道是什么原因，用 require 不行，就把源码拿过来，改成import的方式
// https://github.com/simplesmiler/vue-focus/blob/master/dist/vue-focus.common.js

import Vue from 'vue'
// Vue = 'default' in Vue ? Vue['default'] : Vue

var version = '2.1.0'

var compatible = (/^2\./).test(Vue.version)
if (!compatible) {
  Vue.util.warn('VueFocus ' + version + ' only supports Vue 2.x, and does not support Vue ' + Vue.version)
}

var focus = {
  inserted: function(el, binding) {
    if (binding.value) el.focus()
    else el.blur()
  },

  componentUpdated: function(el, binding) {
    if (binding.modifiers.lazy) {
      if (Boolean(binding.value) === Boolean(binding.oldValue)) {
        return
      }
    }

    if (binding.value) el.focus()
    else el.blur()
  },
}

var mixin = {
  directives: {
    focus: focus,
  },
}

export var focus = focus
export var mixin = mixin
