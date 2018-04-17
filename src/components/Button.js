import styled from 'styled-components'

const Button = styled.button`
  height: 44px;
  width: 160px;
  font-size: 1.25rem;
  border-radius: 25px;
  border: 5px solid black;
  font-weight: bold;
  cursor: pointer;
  padding: 0 20px;
  min-height: 44px;
  background: #ffffff;
  text-align: center;

  &[disabled] {
    border-color: lightgrey;
    color: lightgrey;
  }
`

export default Button
