import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
  const {history} = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const onChangeUserName = event => {
    setUsername(event.target.value)
  }

  const onChangeUserPassword = event => {
    setPassword(event.target.value)
  }

  const successfulLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  const failureLogin = error => {
    setErrorMsg(error)
  }

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      successfulLogin(data.jwt_token)
    } else {
      failureLogin(data.error_msg)
    }
  }

  const renderUserName = () => (
    <>
      <label htmlFor="username" className="input-label">
        Username
      </label>
      <input
        type="text"
        placeholder="Enter the name"
        id="username"
        value={username}
        className="input-field"
        onChange={onChangeUserName}
      />
    </>
  )

  const renderUserPassword = () => (
    <>
      <label htmlFor="password" className="input-label">
        Password
      </label>
      <input
        type="password"
        id="password"
        placeholder="Enter the password"
        value={password}
        className="input-field"
        onChange={onChangeUserPassword}
      />
    </>
  )

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-form-container">
      <form className="form-container" onSubmit={submitForm}>
        <h1 className="form-heading">Restaurant Login</h1>
        <div className="input-container">{renderUserName()}</div>
        <div className="input-container">{renderUserPassword()}</div>
        <button type="submit" className="login-btn">
          Login
        </button>
        {errorMsg !== '' && <p className="error-msg">{errorMsg}</p>}
      </form>
    </div>
  )
}

export default Login
