export type Decorator = {
  type: 'Decorator'
  expression: {
    type: string
    callee: {
      type: string
      name: string
    }
  }
}
