/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
	clearMocks: true,
	coverageProvider: 'v8',
	moduleNameMapper: {
		// simplest way to stub out CSS imports without failures
		// this avoids needing to set up webpack, style-loader, etc
		// see https://jestjs.io/docs/webpack#mocking-css-modules
		'\\.(css)$': 'identity-obj-proxy',
	},
	roots: ['<rootDir>/tests/jest', '<rootDir>/src'],
};
