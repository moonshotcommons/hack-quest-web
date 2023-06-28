import ConceptLearningCard from '@/components/Card/ConceptLearning'
import HackathonCard, { HackathonCardProps } from '@/components/Card/Hackathon'
import LearningTracksCard from '@/components/Card/LearningTracks'
import SyntaxCard, { SyntaxCardProps } from '@/components/Card/Syntax'
import NavBar from '@/components/Navbar'
import Title from '@/components/Title'
import { CardType } from '@/constants'
import Cover from '@/public/assets/cover.svg'
import Image from 'next/image'

type Cards = { type: CardType } & (HackathonCardProps | SyntaxCardProps)

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
    title: 'What is Bitcoin',
    totalTime: 129600,
    cover: import.meta.url,
  },
]

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black">
      <main className="container m-auto">
        <NavBar></NavBar>
        <Title>{'</Trending Now>'}</Title>
        <div className="flex gap-[3.25rem] w-full h-auto">
          {/* <SyntaxCard title="Introduction to programming" tags={['Beginner']} description="This course covers the most basic concepts in programming using Solidity as an example."></SyntaxCard> */}
          <HackathonCard title="Moonshot 2023 Summer Hackathon" tags={['All Tracks', 'Solidity', 'ZK']}></HackathonCard>
          <LearningTracksCard></LearningTracksCard>
          <ConceptLearningCard></ConceptLearningCard>
        </div>
        <svg width="382" height="240" viewBox="0 0 382 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="-48" y="-31.9995" width="524" height="399" fill="#B6E1D8" />
        </svg>
        <Image src={Cover} alt="cover"></Image>
      </main>
    </main>
  )
}
