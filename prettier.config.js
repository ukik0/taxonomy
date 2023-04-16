/** @type {import('prettier').Config} */
module.exports = {
    trailingComma: 'none',
    tabWidth: 4,
    useTabs: false,
    arrowParens: 'always',
    semi: true,
    singleQuote: true,
    jsxSingleQuote: true,
    printWidth: 110,
    importOrder: [
        '^(react/(.*)$)|^(react$)',
        '^(next/(.*)$)|^(next$)',
        '<THIRD_PARTY_MODULES>',
        '',
        '^@types$',
        '^@local/(.*)$',
        '^@/config/(.*)$',
        '^@/utils/(.*)$',
        '^@/components/(.*)$',
        '^@/styles/(.*)$',
        '^[./]'
    ],
    importOrderSeparation: false,
    importOrderSortSpecifiers: true,
    importOrderBuiltinModulesToTop: true,
    importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
    importOrderMergeDuplicateImports: true,
    importOrderCombineTypeAndValueImports: true,
    plugins: [require('prettier-plugin-tailwindcss', '@ianvs/prettier-plugin-sort-imports')]
};
