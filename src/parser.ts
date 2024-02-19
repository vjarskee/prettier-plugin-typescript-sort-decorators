import { sortFunctionDecorators } from './sorters/function-decorators.sorter'
import { sortSingleParamsDecorators } from './sorters/params-decorators-single.sorter'
import { sortMultiParamsDecorators } from './sorters/params-decorator-multi.sorter'
import { Options } from './types/plugin-options.type'
import { parse as tsToAST, AST } from '@typescript-eslint/typescript-estree'
import { AST as PrettierAST } from 'prettier'

function traverse(node: AST<{ range: true; loc: true; comment: true }>, parent: any, options: Options): void {
  if (options.functionDecoratorsSort) {
    if (
      Array.isArray(node) &&
      parent?.type !== 'Identifier' &&
      node.every(item => item.type === 'Decorator') &&
      node.length > 1
    ) {
      sortFunctionDecorators(node, options)
    }
  }

  if (options.paramsDecoratorSingleSort && !options.paramsDecoratorMultiSort) {
    if (
      Array.isArray(node) &&
      parent?.type === 'FunctionExpression' &&
      node.every(item => item.type === 'Identifier' && item.decorators?.length === 1) &&
      node.length > 1
    ) {
      sortSingleParamsDecorators(node, options)
    }
  }

  if (!options.paramsDecoratorSingleSort && options.paramsDecoratorMultiSort) {
    if (
      Array.isArray(node) &&
      parent?.type === 'Identifier' &&
      node.every(item => item.type === 'Decorator') &&
      node.length > 1
    ) {
      sortMultiParamsDecorators(node, options)
    }
  }

  for (const key in node) {
    const childNode = node[key]
    if (childNode && typeof childNode === 'object') {
      traverse(childNode, node, options)
    }
  }
}

export const parse = (text: string, options: Options): AST<{ range: true; loc: true; comment: true }> => {
  const parsedNode: AST<{ range: true; loc: true; comment: true }> = tsToAST(text, {
    range: true,
    loc: true,
    comment: true
  })

  traverse(parsedNode, null, options)
  return parsedNode
}
