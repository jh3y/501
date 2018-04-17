import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from '../../components/Button'
import * as PlayerActions from '../../actions/player.actions'

import ActionsContainer from '../../components/ActionsContainer'
import Header from '../../components/Header'
import HeaderItem from '../../components/HeaderItem'
import Icon from '../../components/Icon'
import LinkButton from '../../components/LinkButton'

import { Instruction, Player, Players } from './setup.style'

class SetUp extends Component {
  static propTypes = {
    history: PropTypes.object,
    players: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
      })
    ),
    removePlayer: PropTypes.func,
  }
  addPlayer = () => {
    const playerName = prompt('Enter player name')
    if (playerName) this.props.addPlayer(playerName)
  }
  render = () => {
    const { players, removePlayer, history } = this.props
    return (
      <Fragment>
        <Header>
          <HeaderItem onClick={history.goBack}>
            <Icon>
              <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
            </Icon>
          </HeaderItem>
        </Header>
        {!players.length && <Instruction>Add player to start</Instruction>}
        {players.length > 0 && (
          <Players>
            {players.map((p, k) => (
              <Player
                key={`player--${k}`}
                name={p.name}
                onRemove={() => removePlayer(p.id)}
              />
            ))}
          </Players>
        )}
        <ActionsContainer>
          <Button
            onClick={this.addPlayer}
            style={players.length ? { marginBottom: '10px' } : {}}>
            Add Player
          </Button>
          {players.length > 0 && (
            <LinkButton to={'/game'}>Start Game</LinkButton>
          )}
        </ActionsContainer>
      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    players: state.players,
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...PlayerActions }, dispatch)
const SetUpContainer = connect(mapStateToProps, mapDispatchToProps)(SetUp)
export default SetUpContainer
