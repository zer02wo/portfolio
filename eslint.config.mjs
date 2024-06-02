import astroEslintParser from 'astro-eslint-parser';
import eslintPluginAstro from 'eslint-plugin-astro';
import globals from 'globals';
import js from '@eslint/js';
import tsEslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';

export default [
    js.configs.recommended,
    ...eslintPluginAstro.configs['flat/recommended'],
    ...tsEslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    {
        files: ['**/*.astro'],
        languageOptions: {
            parser: astroEslintParser,
            parserOptions: {
                parser: tsParser,
                extraFileExtensions: ['.astro'],
            },
        },
    },
    {
        files: ['**/*.{js,jsx,astro}'],
        rules: {
            'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
        },
    },
    {
        // Define the configuration for `<script>` tag.
        // Script in `<script>` is assigned a virtual file name with the `.js` extension.
        files: ['**/*.{ts,tsx}', '**/*.astro/*.js'],
        languageOptions: {
            parser: tsParser,
        },
        rules: {
            // Note: you must disable the base rule as it can report incorrect errors
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-non-null-assertion': 'off',
        },
    },
    {
        ignores: ['dist', 'node_modules', '.github', 'types.generated.d.ts', '.astro'],
    },
];
