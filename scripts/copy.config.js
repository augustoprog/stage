// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string

module.exports = {
  //-----------DEFAULT------------//
  copyAssets: {
    src: ["{{SRC}}/assets/**/*"],
    dest: "{{WWW}}/assets/"
  },
  copyIndexContent: {
    src: [
      "{{SRC}}/index.html",
      "{{SRC}}/manifest.json",
      "{{SRC}}/service-worker.js"
    ],
    dest: "{{WWW}}"
  },
  copyFonts: {
    src: [
      "{{ROOT}}/node_modules/ionicons-npm/fonts/*",
      "{{ROOT}}/node_modules/roboto-fontface/fonts/roboto/*",
      "{{ROOT}}/node_modules/font-awesome/fonts/**/*"
    ],
    dest: "{{WWW}}/assets/fonts/"
  },
  copyPolyfills: {
    src: ["{{ROOT}}/node_modules/ionic-angular/polyfills/polyfills.js"],
    dest: "{{BUILD}}"
  },
  copySwToolbox: {
    src: ["{{ROOT}}/node_modules/sw-toolbox/sw-toolbox.js"],
    dest: "{{BUILD}}"
  },
  //END-----------DEFAULT------------//
  copyCss: {
    src: [
      "{{ROOT}}/node_modules/bootstrap/dist/css/bootstrap.min.css",
      "{{ROOT}}/node_modules/ionicons-npm/css/ionicons.min.css"
    ],
    dest: "{{WWW}}/assets/css/"
  }
  // copyRoboto: {
  //   src: [
  //     "{{ROOT}}/node_modules/roboto-fontface/css/roboto/roboto-fontface.css"
  //   ],
  //   dest: "{{WWW}}/assets/css/roboto/"
  // }
};
