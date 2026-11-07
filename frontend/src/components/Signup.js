import { useState } from 'react';
import React from 'react'
import { useHistory } from 'react-router-dom';
import API_BASE_URL from '../api';


function Signup(props) {
  const[credentials, setCredentials]= useState({name:"",email:" ",password:"",cpassword:""})
  const history =useHistory();
  const handelSubmit=async (e)=>{
        e.preventDefault();
        const {name ,email,password,cpassword} = credentials;
         const response =await fetch(`${API_BASE_URL}/api/auth/createuser`,{
          
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body:JSON.stringify({name ,email,password})
      });
      const json = await response.json();
      console.log(json);
     
        // save the authtoken and redirect
        if(json.success){
        localStorage.setItem('token',json.authtoken);
      history.push("/login")
       props.showAlert("Account Created Successfuly","success")
        }else{
          props.showAlert("invalid credentials","danger")
        }
    }

 const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    
    <div>
      <h1 style={{textAlign:"center"}}>Signup To Create Account</h1>
   <form className='container' onSubmit={handelSubmit} >
    <div className="mb-3">
    <label htmlFor="name" className="form-label" >Name</label>
    <input type="text" value={credentials.name} onChange={handleChange} minLength={5} required name='name' className="form-control" id="name"/>
  </div>
      <div className="mb-3">
        <label htmlFor="Email" className="form-label">Email address</label>
        <input type="email" className="form-control" value={credentials.email} name='email' onChange={handleChange} minLength={5} required id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label" >Password</label>
    <input type="password" value={credentials.password} onChange={handleChange} minLength={5} required name='password' className="form-control" id="Password"/>
  </div>
   <div className="mb-3">
    <label htmlFor="cpassword" className="form-label" >comfirm Password</label>
    <input type="password" value={credentials.cpassword} onChange={handleChange} minLength={5} required name='cpassword' className="form-control" id="cpassword"/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Signup</button>
</form>
    </div>
  )
}

export default Signup
