import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'react-bootstrap/Button'

import Users from './components/Users.jsx'
import NavMenu from './components/NavMenu.jsx'
import LoginForm from './components/LoginForm.jsx'
import Notification from './components/Notification'
import BlogListAndForm from './components/BlogList.jsx'

import { initializeBlogs } from './reducers/blogsReducer.js'
import { getUsers } from './reducers/usersReducer.js'
import { initializeLogin, userLogout } from './reducers/loginReducer.js'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

  //useEffect
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeLogin())
    dispatch(getUsers())
  }, [dispatch])

  //eventHandlers
  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(userLogout())
  }

  //return
  if (user === null) {
    return (
      <LoginForm>
        <h2>Log in to application</h2>
        <Notification />
      </LoginForm>
    )
  }

  return (
    <div className="container">
      <NavMenu>
        {user.name} logged in{' '}
        <Button variant="outline-danger" type="logout" onClick={handleLogout}>
          Logout
        </Button>
      </NavMenu>
      <Notification />
      <h1>Blog App</h1>
      <Routes>
        <Route path="/users/*" element={<Users />} />
        <Route path="*" element={<BlogListAndForm />} />
      </Routes>
    </div>
  )
}

export default App
