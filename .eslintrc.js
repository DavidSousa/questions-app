module.exports = {
    "extends": "airbnb",
    "rules": {
        "linebreak-style": 0,
		"no-console": 0,
		"comma-dangle": 0,
		"import/no-named-as-default": 0,
		"import/no-named-as-default-member": 0,
		"no-underscore-dangle": 0,
		"prefer-destructuring": ["error", {"object": false, "array": false}],
		"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
		"jsx-a11y/href-no-hash": "off",
		"jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }]
	},
	"globals": {
		"document": true,
		"window": true
	},
	"parserOptions": {
		"ecmaVersion": 6,
		"ecmaFeatures": {
			"jsx": true,
			"modules": true
		}
	},
	"plugins": [
		"react"
	]
};