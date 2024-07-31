import React from 'react'
import GameBoard from '../components/GameBoard'


const Game = () => {
  return (
    <div className='container mx-auto'>
    <div className='flex flex-col items-center justify-center  bg-violet h-screen rounded-lg my-3 min-w-[600px]' >
    <GameBoard/>
    </div>
    </div>
  )
}

export default Game