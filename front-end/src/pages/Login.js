import React from 'react'
import LoginForm from  '../components/LoginForm'

const Login = ({setLoggedInUser}) => {
  return (
    <div className='container mx-auto'> 
      <div className='my-4 bg-violet h-[100vh] flex items-center justify-center'>
      <LoginForm setLoggedInUser={setLoggedInUser}/>
      </div>
    </div>
  )
}

export default Login