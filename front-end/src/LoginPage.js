import React, { useState } from 'react'
import './LoginPage.css'

const LoginPage = () => {

    const [input,setInput] = useState(
        {
            'email':'',
            'password':''
        }
    )

    const [error,SetError] = useState('');

    const handleInput = (e)=>{
        
        const {name,value} = e.target;
        setInput({...input,[name]:value})
    }

    const formValid = ()=>{
        const error = {};
        if(!input.email && !input.password){
            error.email = "Pls enter email";
            error.password = "Pls enter password";
        }else if(!input.email){
            error.email = "Pls enter email";
        }else if(!input.password){
            error.password = "Pls enter password";
        }
        return error;
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();

        const validError = formValid();

        if(Object.keys(validError).length >0){
            SetError(validError)
        }else{
            console.log("sfsdf");
            const res = await fetch('http://localhost:8000/login/',{
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    'username': input.email,
                    'password': input.password
                })
            })
            const data = await res.json();
            console.log(data);
        }
        
        setInput({
            'email':'',
            'password':''
        })
    }


    return (
        <div className='main'>
            <div className='container'>
                <h1>Welcome</h1>
                <form method='post'onSubmit={handleSubmit} >
                    <input type='email' value={input.email} placeholder='email' onChange={(e)=>{handleInput(e)}} name='email'/>
                    <div >{error.email}</div>
                    <input type='password' value={input.password} placeholder='password' onChange={(e)=>{handleInput(e)}} name='password'/><br/>
                    <div >{error.password}</div>
                    
                    <button type='submit' >Login</button>
                </form>


            </div>
        </div>
    )
}

export default LoginPage