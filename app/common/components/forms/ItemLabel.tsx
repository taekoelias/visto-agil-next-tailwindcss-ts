import React, { ReactNode } from 'react'

export interface ItemLabelProps {
  label: string
  children: ReactNode
}

export const ItemLabel = ({label, children}: ItemLabelProps) => {
  return (
    <fieldset className="mb-4">
      <label className="inline-block text-sm mb-2 font-semibold">
        {label}
      </label>
      {children}
    </fieldset>
  )
}
