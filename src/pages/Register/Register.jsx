import React, { useState } from 'react'
import "./Register.css"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(formData)
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, formData)
      if (res.status === 200) {
        window.localStorage.setItem("userData", JSON.stringify(res.data.user))
        window.localStorage.setItem("token", res.data.token)
        console.log(res)
        navigate("/home")
      } else {
        alert(res.message)
      }
    } catch (error) {
      console.log(error)
      alert("something bad happened please try again")
    }
  }

  return (
    <form onChange={handleChange} onSubmit={handleSubmit} >
      <h1>Register</h1>
      <div className='register__form__container' >
        <div className='input-group' >
          <label>Name</label>
          <input type="text" name="name" />
        </div>
        <div className='input-group' >
          <label>Email</label>
          <input type="email" name="email" />
        </div>
        <div className='input-group' >
          <label>D.O.B.</label>
          <input type="date" name="dateOfBirth" />
        </div>
        <div className='input-group' >
          <label>Password</label>
          <input type="password" name="password" />
        </div>
        <div>
          <button type='submit' >submit</button>
        </div>
        <div>Already have an account <Link to="/login">login? </Link></div>
      </div>
    </form>
  )
}

export default Register
