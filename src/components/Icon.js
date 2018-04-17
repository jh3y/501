import styled from 'styled-components'
const Icon = styled.svg.attrs({role: 'img', viewBox: '0 0 24 24'})`
  align-self: flex-end;
  cursor: pointer;
  height: 44px;
  width: 44px;

  ${p => !p.disabled && `
    &:hover {
      path {
        fill: red;
      }
    }
  `}

  path {
    fill: ${p => p.disabled ? 'lightgrey' : 'grey'};
  }

`
export default Icon