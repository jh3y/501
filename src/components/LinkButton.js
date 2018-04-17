import styled from 'styled-components'
import { Link } from 'react-router-dom'

const LinkButton = styled(Link)`
  color: black;
  text-decoration: none;
  height: 44px;
  width: 160px;
  font-size: 1.25rem;
  border-radius: 25px;
  border: 5px solid black;
  font-weight: bold;
  cursor: pointer;
  padding: 0 20px;
  line-height: 2.25rem;
  text-align: center;
`

export default LinkButton
