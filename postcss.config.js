module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    cssnano: {
      preset: [
        "default",
        {
          discardComments: {
            removeAll: true, // Remove all comments
          },
          normalizeWhitespace: true, // Collapse whitespace
          colormin: false, // Disable color minification
          convertValues: {
            // Adjust unit values
            precision: 2, // Round to 2 decimal places
          },
          discardUnused: true, // Remove unused styles
          mergeRules: true, // Merge duplicate rules
          zindex: false, // Don't adjust z-index values
        },
      ],
    },
  },
};
