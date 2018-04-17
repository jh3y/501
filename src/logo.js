import styled from 'styled-components'
import React from 'react'

const Badge = styled.div`
  height: 128px;
  width: 128px;
  border-radius: 64px;
  background: red;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Text = styled.span`
  font-family: sans-serif;
  font-weight: bold;
  color: #fff;
  font-size: 60px;
`

const Logo = () => (
  <Badge>
    <Text>501</Text>
  </Badge>
)

export default Logo
