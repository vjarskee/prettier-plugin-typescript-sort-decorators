import { Options } from '../types/plugin-options.type'
import { Decorator } from '../types/decorator.type'

export const sortMultiParamsDecorators = (decoratorsArray: Decorator[], options: Options): void => {
  const referenceSet: string[] = Array.from(new Set(options.paramsDecoratorMultiSortOrder || []))

  decoratorsArray.sort((a, b) => {
    const indexA = referenceSet.indexOf(a.expression.callee.name)
    const indexB = referenceSet.indexOf(b.expression.callee.name)

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB
    }

    if (indexA !== -1) {
      return -1
    } else if (indexB !== -1) {
      return 1
    }

    if (options.paramsDecoratorMultiSortAlphabeticalUnlisted) {
      return a.expression.callee.name.localeCompare(b.expression.callee.name)
    }
  })
}
