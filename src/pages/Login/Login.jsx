
import React from 'react';
import axios from 'axios';
import "./Login.css"
import { useAuthContext } from '../../contextApi/contextHook';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = React.useState({});
  const { setLogin } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData);
      if (res.status === 200) {
        window.localStorage.setItem("userData", JSON.stringify(res.data.user));
        window.localStorage.setItem("token", res.data.token);
        setLogin(true);
        navigate("/home");
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("something bad happened please try again");
    }
  };

  return (
    <div>
      <form onChange={handleChange} onSubmit={handleSubmit} >
        <div className='login__form__container' >
          <div className='input_group' >
            <label>Email</label>
            <input name='email' type='email' />
          </div>
          <div className='input_group' >
            <label>Password</label>
            <input name='password' type='password' />
          </div>
          <div className='input_group_button' >
            <button>submit</button>
          </div>
        </div>
      </form>
      <div className='register__link'>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;

