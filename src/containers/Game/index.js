import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from '../../components/Button'
import * as GameActions from '../../actions/game.actions'

import ActionsContainer from '../../components/ActionsContainer'
import Header from '../../components/Header'
import HeaderItem from '../../components/HeaderItem'
import Icon from '../../components/Icon'

import {
  Container,
  Line,
  Players,
  Score,
  ScoreInput,
  WinMessage,
} from './game.style'

class Game extends Component {
  state = {
    score: '',
    validScore: false,
  }
  static propTypes = {
    players: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
      })
    ),
    game: PropTypes.object,
  }
  start = playerId => {
    const id = playerId
      ? playerId
      : this.props.players[
          Math.floor(Math.random() * this.props.players.length)
        ].id
    this.setState(
      {
        gameComplete: false,
        winner: undefined,
        score: '',
      },
      () => {
        this.props.startGame(this.props.players, id)
      }
    )
  }
  static getDerivedStateFromProps = ({ gameComplete, winner }) => {
    if (gameComplete) {
      return {
        gameComplete,
        winner,
      }
    }
    return null
  }
  addScore = () => {
    const { game, updateScore } = this.props
    const { score } = this.state
    const newScore = game[game.thrower].score - score
    this.setState(
      {
        score: '',
        gameComplete: newScore === 0,
        winner: newScore === 0 ? game[game.thrower] : undefined,
      },
      () => {
        updateScore(
          Object.assign({}, game[game.thrower], {
            score: newScore,
          })
        )
      }
    )
  }
  handleScoreUpdate = e => {
    const game = this.props.game
    const score = e.target.value
    let validScore = false
    if (score <= 180 && score > -1 && score <= game[game.thrower].score)
      validScore = true
    this.setState({
      validScore,
      score,
    })
  }
  undo = () => {
    if (this.state.gameComplete) {
      this.setState(
        {
          gameComplete: false,
          winner: undefined,
          score: '',
        },
        this.props.undo
      )
    } else {
      this.props.undo()
    }
  }
  redo = () => {
    this.props.redo()
  }
  end = () => {
    const end = window.confirm(
      'Are you sure you want to quit the current game?'
    )
    if (end) this.props.endGame().then(() => this.props.history.goBack())
  }
  componentDidMount = () => {
    if (this.props.players.length === 1)
      this.props.startGame(this.props.players, this.props.players[0].id)
  }
  componentDidUpdate = () => {
    if (this.props.game.thrower && this.SCORE_INPUT) this.SCORE_INPUT.focus()
  }
  render = () => {
    const { gameComplete, score, validScore, winner } = this.state
    const { players, game } = this.props
    const currentThrower = game[game.thrower]

    if (gameComplete) {
      return (
        <Fragment>
          <WinMessage>
            {players.length === 1
              ? `Nice! 🎉`
              : `We have a winner! ${winner.name} 🎉 `}
          </WinMessage>
          <ActionsContainer>
            <Button style={{ marginBottom: 10 }} onClick={() => this.start()}>
              New Leg?
            </Button>
            <Button style={{ marginBottom: 10 }} onClick={this.undo}>
              Mistake?
            </Button>
            <Button onClick={this.end}>End Game</Button>
          </ActionsContainer>
        </Fragment>
      )
    }
    if (players.length > 1 && !currentThrower) {
      return (
        <Fragment>
          <Header>
            <HeaderItem onClick={this.props.history.goBack}>
              <Icon alt="Set up">
                <title>Go back to set up</title>
                <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
              </Icon>
            </HeaderItem>
          </Header>
          <Container>
            <h1>Who will throw first?</h1>
            <Players>
              {players.map((p, k) => (
                <Button
                  key={`thrower--${k}`}
                  onClick={() => this.start(p.id)}
                  style={{ width: 200, marginBottom: 10 }}>
                  {p.name}
                </Button>
              ))}
              <Button onClick={() => this.start()} style={{ width: 200 }}>
                Pick for me
              </Button>
            </Players>
          </Container>
        </Fragment>
      )
    }
    if (currentThrower) {
      return (
        <Fragment>
          <Header style={{ justifyContent: 'flex-end' }}>
            <HeaderItem
              disabled={
                !game.snapshots || (game.snapshots && !game.snapshots.length)
              }
              onClick={this.undo}>
              <Icon
                alt="Undo"
                disabled={
                  !game.snapshots || (game.snapshots && !game.snapshots.length)
                }>
                <title>Undo</title>
                <path d="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z" />
              </Icon>
            </HeaderItem>
            <HeaderItem
              onClick={this.redo}
              disabled={!game.redos || (game.redos && !game.redos.length)}>
              <Icon
                alt="Redo"
                disabled={!game.redos || (game.redos && !game.redos.length)}>
                <title>Redo</title>
                <path d="M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z" />
              </Icon>
            </HeaderItem>
            <HeaderItem onClick={this.end}>
              <Icon alt="End Game">
                <title>End Game</title>
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
              </Icon>
            </HeaderItem>
          </Header>
          <Container>
            <Line>{`${currentThrower.name} to throw`}</Line>
            <Line>
              {`Currently on `}
              <Score>{currentThrower.score}</Score>
            </Line>
            <ScoreInput
              innerRef={i => (this.SCORE_INPUT = i)}
              type="number"
              placeholder="Score"
              value={score}
              onChange={this.handleScoreUpdate}
            />
            <Button disabled={!validScore} onClick={this.addScore}>
              Add Score
            </Button>
          </Container>
        </Fragment>
      )
    }
    return null
  }
}
const mapStateToProps = ({ game, players }) => {
  let gameComplete = false
  let winner = false
  if (game.players) {
    for (const player of players) {
      if (game[player.id].score === 0) {
        gameComplete = true
        winner = player
      }
    }
  }
  return {
    players,
    game,
    gameComplete,
    winner,
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...GameActions }, dispatch)
const GameContainer = connect(mapStateToProps, mapDispatchToProps)(Game)
export default GameContainer
