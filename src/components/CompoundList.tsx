import styled from 'styled-components'

/* Components */
import CompoundCard from './CompoundCard'

/* Types */
import { ICompound } from '../types/Compound'

interface ICompoundListProps {
  compounds: ICompound[]
}

const CompoundList: React.FC<ICompoundListProps> = (props) => {
  const { compounds } = props

  return (
    <CompoundListWrapper>
      {compounds.map((compound, index) => (
        <CompoundCard key={index} compound={compound} />
      ))}
    </CompoundListWrapper>
  )
}

export default CompoundList

const CompoundListWrapper = styled.ul`
  align-self: stretch;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding-left: 0;
`
