import React, { useState  } from 'react'
import { useHistory} from 'react-router-dom';
import API_BASE_URL from '../api';



const Login= (props)=> {

const[credentials, setCredentials]= useState({email:" ",password:""})

    const history = useHistory();
    const handelSubmit=async (e)=>{
        e.preventDefault();
        
         const response =await fetch(`${API_BASE_URL}/api/auth/login`,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body:JSON.stringify({email:credentials.email,password:credentials.password})
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
        // save the authtoken and redirect
        // localStorage.setItem('token',json.authtoken);
        localStorage.setItem('token',json.authtoken)
        console.log(json.authtoken);
      history.push("/")
       props.showAlert("Login successfuly","success")
      }else{
         props.showAlert("invalid credentials","danger")
      }
    }

     const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div >
      <h1 style={{textAlign:"center"}}>Login To Access Your Notes</h1>
     <form className='container' onSubmit={handelSubmit} >
  <div className="mb-3">
    <label htmlFor="Email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} name='email' onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="Password" className="form-label" >Password</label>
    <input type="password" value={credentials.password} onChange={handleChange} name='password' className="form-control" id="Password"/>
  </div>

  <button type="submit" className="btn btn-primary" >Login</button>
</form>
    </div>
  )
}

export default Login
