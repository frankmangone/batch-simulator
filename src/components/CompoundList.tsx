import styled from "styled-components"

/* Components */
import CompoundCard from "./CompoundCard"

/* Hooks */
import { useData } from "../context/DataContext"

/* Types */
import { ICompound } from "../types/Compound"

interface ICompoundListProps {
  compounds: ICompound[]
}

const CompoundList: React.FC<ICompoundListProps> = (props) => {
  const { compounds } = props
  const { updateCompound } = useData()

  return (
    <CompoundListWrapper>
      {compounds.map((compound, index) => (
        <CompoundCard
          key={index}
          compound={compound}
          updateCompound={(compound: ICompound): void => {
            updateCompound(index, compound)
          }}
          validateUnicity={(field: string, value: any): boolean => {
            for (var i = 0; i < compounds.length; i++) {
              // @ts-ignore
              if (i !== index && compounds[i][field] === value) {
                return false
              }
            }
            return true
          }}
        />
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
