import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Home.css"

const Home = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    dateOfBirth: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  useEffect(() => {
    const storedUserData = JSON.parse(window.localStorage.getItem('userData'));
    if (storedUserData) {
      storedUserData.dateOfBirth = formatDateForInput(storedUserData.dateOfBirth); // Format date for input
      setUserData(storedUserData);
      setFormData(storedUserData);
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/auth/edit/${userData._id}`, formData, { headers: { Authorization: token } });
      if (res.status === 200) {
        setUserData(formData);
        window.localStorage.setItem('userData', JSON.stringify(formData));
        alert('User details updated successfully');
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
      alert('Failed to update user details');
    }
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  // Helper function to format date for input fields (yyyy-mm-dd)
  const formatDateForInput = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="home-card">
      <h2>User Profile</h2>
      <div className="user-detail">
        <label>Name:</label>
        {isEditing ? (
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        ) : (
          <p>{userData.name}</p>
        )}
      </div>

      <div className="user-detail">
        <label>Email:</label>
        {isEditing ? (
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        ) : (
          <p>{userData.email}</p>
        )}
      </div>

      <div className="user-detail">
        <label>Date of Birth:</label>
        {isEditing ? (
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
        ) : (
          <p>{userData.dateOfBirth}</p>
        )}
      </div>

      <div className="actions">
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default Home;

