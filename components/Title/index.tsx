import React from 'react'

interface TitleProps {
  children: React.ReactNode
}

const Title: React.FC<TitleProps> = props => {
  return <h2 className="text-[#F1F1F1] font-next-poster text-lg mt-[2.88rem] mb-[2.5rem]">{props.children}</h2>
}

export default Title
