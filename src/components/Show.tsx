import React from "react"

interface ShowProps<T> {
  when: T | undefined | null | false
  children: JSX.Element | JSX.Element[]
  fallback?: JSX.Element
}

/**
 * Show component
 * Utility component that only shows the children when `when` is truthy.
 * Also takes a fallback component in case `when` is falsy.
 *
 * @param when: Condition to evaluate, shows children when true/truthy.
 * @param children: Content to be shown if `when` is true/truthy.
 * @param fallback?: Content to be shown if `when` is false/falsy.
 * */

export default function Show<T>({ when, children, fallback }: ShowProps<T>) {
  return (
    <>
      {!!when && children}
      {!when && fallback}
    </>
  )
}
