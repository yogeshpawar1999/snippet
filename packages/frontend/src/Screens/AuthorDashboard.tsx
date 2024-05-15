import { useNavigate } from "react-router-dom/dist"
import "./AuthorDashboard.css"
import authorImg from "./Rectangle 4.png"
import logo from "./Snippet_News_Logo-removebg-preview 1.png"
import { AuthContext} from "./AuthContext"
import { useContext, useEffect, useState } from "react"


const Card = ({ title, content }) => {
  console.log()
  return (
    <div className="">
      <img src={authorImg} alt=""></img>
    </div>
  )
}


const AuthorDashboard = () => {

  const navigate = useNavigate()
  function handleSubmit() {
    navigate("/UploadContent")
  }
  return (
    <div className="auth">
      {/* <form className="Auth-form" onSubmit={handleSubmit}> */}

      <nav className="navbar">
        <img className="logo" src={logo} alt=""></img>
        <a className="reg" href="#about">
          Register
        </a>
        <a href="#contact">Sign In</a>
      </nav>

      <h1 className="header">My Post</h1>
      <div className="card-container">
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
      <button className="btn btn-danger" onClick={handleSubmit}>
        create
      </button>
      {/* </form> */}
    </div>
  )
}

export default AuthorDashboard
