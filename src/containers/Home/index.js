import React, { Component } from 'react'
import ActionsContainer from '../../components/ActionsContainer'
import LinkButton from '../../components/LinkButton'
import { Container, LogoWrap } from './home.style'
import Logo from '../../logo'
class Home extends Component {
  render = () => {
    return (
      <Container>
        <LogoWrap>
          <Logo />
        </LogoWrap>
        <ActionsContainer>
          <LinkButton to="/setup">New Game</LinkButton>
        </ActionsContainer>
      </Container>
    )
  }
}

export default Home
