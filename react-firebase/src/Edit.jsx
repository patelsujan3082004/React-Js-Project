import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ref,get } from 'firebase/database';
import db from './firebase';
function Edit() {

    const {id}=useParams();
     const [data,setdata]=useState({
        name:'',
        mobile:'',
        email:'',
        address:''
    })

    const navigate=useNavigate();

    useEffect(()=>{
        const myRef=ref(db,`userdata/${id}`)
        get(myRef)
        .then((x)=>{
            const y=x.val()
         
            setdata(y);
            console.log(data);
            
            
        })
        .catch((err)=>{
            console.log(err);
            
        })
    },[id,navigate])


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
         const myRef=ref(db,`userdata/${id}`)
        update(myRef,data)
        then(() => {
        alert("Record updated successfully!");
        navigate("/"); // back to list
      })
      .catch((err) => {
        console.error("Error updating record:", err);
      });
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
                
                <input type="submit" value="update" className='btn btn-success'/>
                <input type="button" value="cancel" className='btn btn-dark'/>
            </div>

        </form>
    </div>
  )
}

export default Edit