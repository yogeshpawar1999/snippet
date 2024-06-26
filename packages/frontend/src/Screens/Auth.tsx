import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./AuthorDashboard"
import "../App.css"
import { AuthContext } from "./AuthContext"
import { UserData } from "./UserData.json"

const Auth = () => {
  const user = useContext(AuthContext)
  const { login } = useContext(AuthContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [author, setAuthor] = useState(false)
  const [errors, setErrors] = useState({ username: "", password: "" })
  const navigate = useNavigate()

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
    validateUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    validatePassword(e.target.value)
  }

  const validateUsername = (value) => {
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username is required",
      }))
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, username: "" }))
    }
  }

  const validatePassword = (value) => {
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }))
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }))
    }
  }

  const CheckCred = () => {
    UserData.forEach((ele) => {
      if (ele.userName === username) {
        login(ele)
      }
    })

    // login(username);

    const data = JSON.stringify(user)
    console.log(data + " heloo from user data ")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    validateUsername(username)
    validatePassword(password)
    if (!errors.username && !errors.password) {
      CheckCred()
      if (author) {
        localStorage.setItem("AUTHOR", "true")
        navigate("/")
      } else {
        localStorage.setItem("EDITOR", "true")
        navigate("/")
      }
    }
  }
  const handleAuthorChange = (e) => {
    setAuthor(e.target.checked)
  }

  return (
    <div className="sb-background">
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={username}
                onChange={handleUsernameChange}
              />
              {errors.username && (
                <div className="text-danger">{errors.username}</div>
              )}
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
              />
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </div>
            {/* <div className="form-group mt-3">
              <label>
                <input
                  type="checkbox"
                  checked={author}
                  onChange={handleAuthorChange}
                />
                Author
              </label>
            </div> */}
            <div>
              <button type="submit" className="button-11">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Auth
