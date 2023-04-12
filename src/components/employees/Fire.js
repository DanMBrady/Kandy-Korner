import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const Fire=()=>{
    const {employeeId} =useParams()
    const [employee,setEmployee]=useState([])
    const navigate =useNavigate()
    
    useEffect(
        () => {
           fetch(`http://localhost:8088/employees?_expand=user&_expand=location&id=${employeeId}`)
           .then(response => response.json())
            .then((data)=>{
                const singleEmployee =data[0]
                setEmployee(singleEmployee)
            })
        },
        [employeeId]
    )


    const fireEmployee=()=>{
        
        
        return <button onClick={()=>{
        (fetch(`http://localhost:8088/users/${employee.userId}`,{
            method: "DELETE"
        }))
        .then(()=>{
            navigate("/employees")
        })}}>Fire Employee</button>
    }
    return <article className="singleEmployeeContainer">
    {
       
             <article className="employeeDiv" key ={employee.id}>
                <article>Name: {employee?.user?.fullName}</article>
                <article>Email: {employee?.user?.email}</article>
                <article>Pay Rate: {employee.rate}</article>
                <article>Address: {employee?.location?.address}</article>
                <article>Start Date: {employee.startDate}</article>
              </article>
              
                
              
            }
            
              <article className="employeeDiv">  {fireEmployee()} </article>
            
</article>
}