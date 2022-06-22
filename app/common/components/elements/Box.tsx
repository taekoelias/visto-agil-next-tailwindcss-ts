import React, { HTMLAttributes } from 'react'

export interface BoxProps extends HTMLAttributes<HTMLDivElement>{
}

export const Box = ({children}: BoxProps) => {
  return (
    <div>
      {children}
    </div>
  )
}