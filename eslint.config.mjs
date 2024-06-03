import astroEslintParser from 'astro-eslint-parser';
import eslintPluginAstro from 'eslint-plugin-astro';
import globals from 'globals';
import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tsEslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';

export default [
    js.configs.recommended,
    ...eslintPluginAstro.configs['flat/recommended'],
    ...tsEslint.configs.recommended,
    {
        plugins: {
            'jsx-a11y': jsxA11y,
        },
        rules: jsxA11y.configs.recommended.rules,
    },
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
        rules: {
            'astro/no-set-html-directive': 'warn',
            'astro/no-set-text-directive': 'error',
            'astro/prefer-object-class-list': 'warn',
            'astro/prefer-split-class-list': 'warn',
            'astro/prefer-class-list-directive': 'warn',
            'astro/semi': 'error',
        },
    },
    {
        files: ['**/*.{js,jsx,astro}'],
        rules: {
            'no-fallthrough': [
                'error',
                {
                    allowEmptyCase: true,
                },
            ],
            'arrow-body-style': ['error', 'always'],
            camelcase: [
                'warn',
                {
                    properties: 'always',
                    ignoreDestructuring: true,
                    ignoreImports: true,
                    ignoreGlobals: true,
                },
            ],
            'capitalized-comments': [
                'warn',
                'always',
                {
                    ignoreConsecutiveComments: true,
                },
            ],
            curly: ['error', 'all'],
            'default-param-last': 'error',
            eqeqeq: ['error', 'always'],
            'func-names': ['error', 'as-needed'],
            'no-else-return': 'error',
            'no-labels': 'error',
            'no-lonely-if': 'error',
            'no-nested-ternary': 'error',
            'no-return-assign': 'error',
            'no-unneeded-ternary': 'error',
            'no-useless-concat': 'warn',
            'no-useless-return': 'warn',
            'no-var': 'error',
            'prefer-const': 'error',
            'prefer-template': 'error',
            'sort-imports': [
                'error',
                {
                    allowSeparatedGroups: true,
                },
            ],
            strict: ['warn', 'safe'],
            yoda: 'error',
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
