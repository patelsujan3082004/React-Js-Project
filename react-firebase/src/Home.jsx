import { onValue, ref, remove } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import db from './firebase'
import { useNavigate } from 'react-router'

function Home() {

    const [mydata,setmydata]=useState([])
    useEffect(()=>{

      const myRef=ref(db,"userdata")

      onValue(myRef,(x)=>{
          // console.log("firebase data",x);
          // console.log("firebase data",x.val());
          const data=x.val();

          //converts in array from object
          const dataArray=Object.entries(data)
          // console.log("data Array",dataArray);
          const newarray=dataArray.map(([id,value])=>({
            id,
            ...value
          }))
          console.log("finalarray",newarray);
          setmydata(newarray)
          
      })
    },[])

    const handleDelete=(id)=>{
      if(confirm("do you want to delete") == true){
        remove(ref(db,`userdata/${id}`))
        
        console.log("data successfully removed!");
        
      }
      else{
        console.log("click on yes to delete");
        
      }
      
    }
    const navigate=useNavigate()
    const handleEdit=(id)=>{

      navigate(`/Edit/${id}`)

    }
  return (
    <div className='container'>

      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
            {
              mydata.map((cur)=>{
                const {id,name,mobile,email,address}=cur;
                return(
                  <tr key={id}>
                      <td>{id}</td>
                      <td>{name}</td>
                      <td>{mobile}</td>
                      <td>{email}</td>
                      <td>{address}</td>
                      <button onClick={()=>{handleEdit(id)}}>Edit</button>
                      <button onClick={()=>{handleDelete(id)}}>Delete</button>
                  </tr>
                )
              })
            }

        </tbody>
      </table>

    </div>
  )
}

export default Home