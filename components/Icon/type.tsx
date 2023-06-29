import { tuple } from '../../helper/utils'

const IconKeys = tuple('Clock', 'Completed', 'Course', 'LeftArrow', 'RightArrow')

export type IconKey = (typeof IconKeys)[number]

export type IconsType = {
  [key in IconKey]: React.ReactNode
}
