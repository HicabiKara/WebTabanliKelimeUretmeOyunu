import React from 'react'
import ScoreBoard from '../components/ScoreBoard'

const LeaderBoard = () => {
  return (
    <div className='container mx-auto h-screen bg-violet my-3 flex justify-center items-center'> 
      <div className='w-full px-4 sm:px-6 lg:px-8'>
        <ScoreBoard/>
      </div>
    </div>
  )
}
export default LeaderBoard