const CracoAlias = require("craco-alias")

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: "./src",
        // tsConfigPath should point to the file where "baseUrl" and "paths" are specified
        tsConfigPath: "./tsconfig.extend.json",
      },
    },
  ],
  babel: {
    plugins: [
      [
        "babel-plugin-styled-components",
        {
          topLevelImportPaths: [
            "@xstyled/styled-components",
            "@xstyled/styled-components/no-tags",
            "@xstyled/styled-components/native",
            "@xstyled/styled-components/primitives",
          ],
        },
      ],
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./src",
          },
        },
      ],
      [
        "inline-react-svg",
        {
          svgo: {
            plugins: [
              "removeTitle",
              "removeDimensions",
              "cleanupIDs",
              "removeTitle",
              {
                name: "removeAttrs",
                params: {
                  attrs: "(data-name)",
                },
              },
              {
                name: "removeViewBox",
                active: false,
              },
              {
                name: "convertColors",
                params: {
                  shorthex: false,
                  currentColor: true,
                },
              },
              {
                name: "addAttributesToSVGElement",
                params: {
                  attributes: ['preserveAspectRatio="xMidYMid"'],
                },
              },
            ],
          },
        },
      ],
    ],
  },
}
