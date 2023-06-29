import ConceptLearningCard, { ConceptLearningCardProps } from '@/components/Card/ConceptLearning'
import HackathonCard, { HackathonCardProps } from '@/components/Card/Hackathon'
import LearningTracksCard from '@/components/Card/LearningTracks'
import SyntaxCard, { SyntaxCardProps } from '@/components/Card/Syntax'
import NavBar from '@/components/Navbar'
import Title from '@/components/Title'
import { CardType } from '@/constants'
import Cover from '@/public/assets/cover.svg'
import Image from 'next/image'

import { Inter } from 'next/font/google'
import { SliderContainer } from '@/components/SliderContainer'

const inter = Inter({ subsets: ['latin'] })

const defaultCards = [
  {
    type: CardType.SYNTAX,
    title: 'Introduction to programming',
    tags: ['Beginner'],
    description: 'This course covers the most basic concepts in programming using Solidity as an example.',
    totalTime: 129600,
    courseCount: 5,
    completed: 58320,
  },
  {
    type: CardType.HACKATHON,
    title: 'Moonshot 2023 Summer Hackathon',
    tags: ['All Tracks', 'Solidity', 'ZK'],
    signUpStart: Date.now(),
    signUpEnd: Date.now() * 60 * 60 * 60,
    eventStart: Date.now(),
    eventEnd: Date.now() * 60 * 60 * 60,
    grantSize: '200K',
  },
  {
    type: CardType.LEARNING_TRACKS,
    title: 'Web 3.0 Programming Advanced',
    tags: ['Advanced'],
    description: 'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
    totalTime: 129600,
    courseCount: 5,
    completed: 0,
  },
  {
    type: CardType.CONCEPT_LEARNING,
    title: 'What is Bitcoin',
    description: 'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
    totalTime: 129600,
    completed: 0,
    cover: '/assets/cover.svg',
  },
]

export default function Home() {
  const renderCard = (card: (typeof defaultCards)[number]) => {
    switch (card.type) {
      case CardType.CONCEPT_LEARNING:
        return (
          <ConceptLearningCard
            title={card.title}
            tags={card.tags || []}
            description={card.description || ''}
            totalTime={card.totalTime || 0}
            courseCount={card.courseCount || 0}
            completed={card.completed || 0}
            cover={card.cover || ''}
          ></ConceptLearningCard>
        )
      case CardType.HACKATHON:
        return <HackathonCard title={card.title} tags={card.tags || []}></HackathonCard>
      case CardType.SYNTAX:
        return (
          <SyntaxCard
            title={card.title}
            tags={card.tags || []}
            description={card.description || ''}
            totalTime={card.totalTime || 0}
            courseCount={card.courseCount || 0}
            completed={card.completed || 0}
          ></SyntaxCard>
        )
      case CardType.LEARNING_TRACKS:
        return (
          <LearningTracksCard
            title={card.title}
            tags={card.tags || []}
            description={card.description || ''}
            totalTime={card.totalTime || 0}
            courseCount={card.courseCount || 0}
            completed={card.completed || 0}
          ></LearningTracksCard>
        )
    }
  }
  return (
    <main className={`w-full min-h-screen bg-black ${inter.className}`}>
      <main className="container m-auto">
        <NavBar></NavBar>
        <Title>{'</Trending Now>'}</Title>
        <SliderContainer>
          <div className="flex w-[114rem] h-[17.625rem] gap-[3.25rem] items-end">
            {defaultCards.map((card, index) => {
              return <div key={index}>{renderCard(card)}</div>
            })}
          </div>
        </SliderContainer>
      </main>
    </main>
  )
}
