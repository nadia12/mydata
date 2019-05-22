export const selectedByType = selecteds => (
  [...Object.values(selecteds).flatMap(select => select)][0] || {}
)
