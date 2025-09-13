import React, { useState } from 'react'
import db from "./firebase"
import { ref,push,set } from 'firebase/database'
import { useNavigate } from 'react-router'
function Add() {
   
    const [data,setdata]=useState({
        name:'',
        mobile:'',
        email:'',
        address:''
    })

    const Navigate=useNavigate();
    const handleInputChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;

        setdata((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
        
    }

     const handleFormSubmit=(e)=>{
            e.preventDefault();
            console.log(data);

            //ref(db,"userdata") it created node in your database
            //push() -> generates unique ID

            // https://react-firebase-fb9b7-default-rtdb.firebaseio.com/userdata/101
            // set()

            const myRef=ref(db,"userdata") //https://react-firebase-fb9b7-default-rtdb.firebaseio.com/userdata
            const myPush=push(myRef) // https://react-firebase-fb9b7-default-rtdb.firebaseio.com/userdata/101

            set(myPush,data)
            .then(()=>{
                console.log("data added succesfully");
                
                setdata({
                    name:'',
                    mobile:'',
                    email:'',
                    address:''
                })
                Navigate('/')

            })
            .catch((err)=>{
                if(err){
                    console.log(err);
                    
                }
            })
    }
  return (
    <div className='container'>
        <form action="" onSubmit={handleFormSubmit}>
            <div className="form-group m-2">
                <label htmlFor="">name</label>
                <input type="text" name="name" id="" value={data.name} onChange={handleInputChange}/>
            </div>
            <div className="form-group m-2">
                <label htmlFor="">mobile</label>
                <input type="tel" name="mobile" id="" value={data.mobile} onChange={handleInputChange}/>
            </div>
            <div className="form-group m-2">
                <label htmlFor="">email</label>
                <input type="email" name="email" id="" value={data.email} onChange={handleInputChange}/>
            </div>
            <div className="form-group m-2">
                <label htmlFor="">address</label>
                <input type="text" name="address" id="" value={data.address} onChange={handleInputChange}/>
            </div>
            <div className="form-group m-2">
                
                <input type="submit" value="ADD" className='btn btn-success'/>
            </div>

        </form>
    </div>
  )
}

export default Add