export default [{
    languageOptions: {
        ecmaVersion: 11,
        sourceType: "module",
    },
    rules: {
        "indent": ["error", "tab"],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "no-multiple-empty-lines": ["error", { max: 1 }],
        "no-trailing-spaces": [ "error", { skipBlankLines: false } ]
    }
}];