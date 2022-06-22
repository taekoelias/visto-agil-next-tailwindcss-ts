import {useEffect, useState} from 'react'

type RedirectLinkProps = {
  link: string;
  text: string;
}

export const RedirectLink = ({link,text}: RedirectLinkProps) => {
  
  const redirect = () => {
    window.open(link, '_blank');
  }
  
  return(
    <a 
      className="block text-lg cursor-pointer underline"
      target='_blank'
      onClick={()=>{redirect()}}>
        {text}
    </a>
  )
}