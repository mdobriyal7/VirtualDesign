const CracoPurgecssPlugin = require('craco-purgecss');
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        CracoPurgecssPlugin,
      ],
    },
  },
};
