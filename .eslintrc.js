// @ts-check

/**
 * @type {import('eslint').ESLint.ConfigData}
 **/
const eslintConfig = {
  extends: [
    "plugin:@trevorblades/react",
    "plugin:@trevorblades/typescript",
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      files: ["*.mdx"],
      extends: ["plugin:mdx/recommended"],
    },
  ],
};

module.exports = eslintConfig;
