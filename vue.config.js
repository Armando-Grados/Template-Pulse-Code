module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require('postcss-import'),
            require('tailwindcss'),
            require('autoprefixer'),
          ],
        },
      },
    },
  },
};
