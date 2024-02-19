import { Identifier } from '../types/identifier.type'
import { Options } from '../types/plugin-options.type'

export const sortSingleParamsDecorators = (identifiersArray: Identifier[], options: Options): void => {
  const referenceSet: string[] = Array.from(new Set(options.paramsDecoratorSingleSortOrder || []))

  identifiersArray.sort((a, b) => {
    const indexA = referenceSet.indexOf(a.decorators[0].expression.callee.name)
    const indexB = referenceSet.indexOf(b.decorators[0].expression.callee.name)

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB
    }

    if (indexA !== -1) {
      return -1
    } else if (indexB !== -1) {
      return 1
    }

    if (options.paramsDecoratorSingleSortAlphabeticalUnlisted) {
      return a.decorators[0].expression.callee.name.localeCompare(b.decorators[0].expression.callee.name)
    }
  })
}
