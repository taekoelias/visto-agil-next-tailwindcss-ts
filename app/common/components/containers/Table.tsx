import React, { ReactNode } from 'react'

type TableContainerProps = {
  children: ReactNode
}

type TableHeaderProps = {
  children: ReactNode
}

type TableHeaderColumnProps = {
  children: ReactNode
}

type TableBodyProps = {
  children: ReactNode
}

type TableRowProps = {
  children: ReactNode
}

type TableColumnProps = {
  children: ReactNode
}

const Container = ({children}: TableContainerProps) => {
  return (
    <div className="relative overflow-x-auto shadow-md mt-4 mb-2 sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        {children}
      </table>
    </div>
  )
}

const Header = ({children}: TableHeaderProps) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-slate-200 dark:bg-gray-700 dark:text-gray-400">
      <tr className='px-6 py-3'>
        {children}
      </tr>
    </thead>
  )
}

const HeaderColumn = ({children}: TableHeaderColumnProps) => {
  return (
    <th className='px-6 py-3' scope="col">
        {children}
    </th>
  )
}

const Body = ({children}: TableBodyProps) => {
  return (
    <tbody>
      {children}
    </tbody>
  )
}

const Row = ({children}: TableRowProps) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      {children}
    </tr>
  )
}

const Column = ({children}: TableColumnProps) => {
  return (
    <td className="px-6 py-4 font-medium text-gray-900" scope="row">
      {children}
    </td>
  )
}

export const Table = {
  Container,
  Body,
  Row,
  Column,
  Header,
  HeaderColumn}