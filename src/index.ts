import { parse } from './parser'
import { Parser, SupportLanguage, SupportOptions } from 'prettier'

export const languages: SupportLanguage[] = [{ name: 'TypeScript', parsers: ['typescript'] }]

import { parsers as prettierParsers } from 'prettier/plugins/typescript.js'
import { AST } from '@typescript-eslint/typescript-estree'

export const parsers: Record<'typescript', Parser<AST<{ range: true; loc: true; comment: true }>>> = {
  typescript: {
    ...prettierParsers.typescript,
    parse
  }
}

export const options: SupportOptions = {
  functionDecoratorsSort: {
    type: 'boolean',
    category: 'Global',
    default: true,
    description: ''
  },

  functionDecoratorsSortOrder: {
    type: 'path',
    category: 'Global',
    default: [{ value: [] }],
    array: true,
    description: ''
  },

  functionDecoratorsSortAlphabeticalUnlisted: {
    type: 'boolean',
    category: 'Global',
    default: true,
    description: ''
  },

  paramsDecoratorSingleSort: {
    type: 'boolean',
    category: 'Global',
    default: true,
    description: ''
  },

  paramsDecoratorSingleSortOrder: {
    type: 'path',
    category: 'Global',
    default: [{ value: [] }],
    array: true,
    description: ''
  },

  paramsDecoratorSingleSortAlphabeticalUnlisted: {
    type: 'boolean',
    category: 'Global',
    default: true,
    description: ''
  },

  paramsDecoratorMultiSort: {
    type: 'boolean',
    category: 'Global',
    default: false,
    description: ''
  },

  paramsDecoratorMultiSortOrder: {
    type: 'path',
    category: 'Global',
    default: [{ value: [] }],
    array: true,
    description: ''
  },

  paramsDecoratorMultiSortAlphabeticalUnlisted: {
    type: 'boolean',
    category: 'Global',
    default: true,
    description: ''
  }
}
