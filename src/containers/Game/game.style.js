import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  width: 100%;
  align-items: center;
`

const Line = styled.p`
  font-size: 1.5rem;
  line-height: 1.75rem;
  margin: 0;
`

const Players = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 0;
  flex: 1;
  overflow: auto;
`

const Score = styled.strong`
  font-size: 2.5rem;
`

const ScoreInput = styled.input`
  outline: 0;
  flex: 1;
  min-height: 200px;
  font-size: 5rem;
  width: 100%;
  text-align: center;
  border: 0;
`

const WinMessage = styled.h1`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export { Container, Line, Players, Score, ScoreInput, WinMessage }
