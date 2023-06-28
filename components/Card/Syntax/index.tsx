import Tag from '@/components/Tag'
import React from 'react'

export interface SyntaxCardProps {
  title: string
  tags: string[]
  description: string
  totalTime: number
  courseCount: number
  completed: number
}

const SyntaxCard: React.FC<SyntaxCardProps> = props => {
  const { title, tags = [], description } = props
  return (
    <div className={`h-[17.375rem] w-[26rem] bg-[url('/assets/card/Syntax/color-bg.svg')] relative flex-shrink-0`}>
      <div className={`w-full h-full bg-[url('/assets/card/Syntax/bg.svg')] scale-[1.01] absolute top-0 left-0 hover:-top-1 hover:left-1`}>
        <div className="px-10 pt-9">
          <div className="w-[2.875rem] h-1 rounded-xl bg-gradient-to-t from-[#0891D5] to-[#38C1A5]"></div>
          <h2 className="title mt-7">{title}</h2>
          <div className="mt-4">
            {tags.map(tag => {
              return <Tag key={tag}>{tag}</Tag>
            })}
          </div>
          <div>{description}</div>
        </div>
      </div>
    </div>
  )
}

export default SyntaxCard
