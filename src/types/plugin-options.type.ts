import { AST } from '@typescript-eslint/typescript-estree'
import { ParserOptions } from 'prettier'

export interface Options extends ParserOptions<AST<{ range: true; loc: true; comment: true }>> {
  functionDecoratorsSort: boolean
  functionDecoratorsSortOrder: string[]
  functionDecoratorsSortAlphabeticalUnlisted: boolean

  paramsDecoratorSingleSort: boolean
  paramsDecoratorSingleSortOrder: string[]
  paramsDecoratorSingleSortAlphabeticalUnlisted: boolean

  paramsDecoratorMultiSort: boolean
  paramsDecoratorMultiSortOrder: string[]
  paramsDecoratorMultiSortAlphabeticalUnlisted: boolean
}
