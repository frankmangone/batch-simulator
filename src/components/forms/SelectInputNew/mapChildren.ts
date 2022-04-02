/**
 * Maps `SelectOption` children for the `Select` component
 */
const mapChildren = <T extends unknown>(
  children: JSX.Element | JSX.Element[]
): SelectOptionProps<T>[] => {
  if (Array.isArray(children)) {
    return children.map((child) => {
      const { type, props } = child

      if (type.name !== "SelectOption")
        throw new Error("Select may only have SelectOption as children")

      return props
    })
  }

  const { type, props } = children

  if (type.name !== "SelectOption")
    throw new Error("Select may only have SelectOption as children")

  return props
}

export default mapChildren
