import {styled, css} from "styled-components"

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;

  ${({borderBottom}) =>
    borderBottom &&
    css`
      border-bottom: 1px solid grey;
    `}
`

export default FlexDiv