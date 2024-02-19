import { Decorator } from './decorator.type'

export type Identifier = {
  type: 'Identifier'
  decorators: Decorator[]
  name: string
  optional: boolean
}
