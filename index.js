/* eslint-disable prettier/prettier */
'use strict';
const Funnel = require('broccoli-funnel');
const path = require('path');
const staticPostcssAddonTree = require('static-postcss-addon-tree');

module.exports = {
  name: require('./package').name,

  options: {},

  treeForAddon() {
    var tree = this._super(...arguments);

    return staticPostcssAddonTree(tree, {
      addonName: 'ember-styleguide',
      addonFolder: __dirname,
      project: this.project || this.app.project
    });
  },

  treeForPublic: function() {
    return new Funnel(path.join(this.root, 'public'));
  },

  contentFor: function(type) {
    if (type === 'head') {
      // preload the most common fonts for modern browsers
      return `<link rel="preload" as="font" type="font/woff2" href="/fonts/Inter-roman.var.woff2?v=3.15" crossorigin>`;
    }

    return '';
  },
};
