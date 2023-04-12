import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Employees =()=>{
    const [employees,setEmployees]=useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
           fetch("http://localhost:8088/employees?_expand=user&_expand=location")
           .then(response => response.json())
           .then((employeeArray) => {
            setEmployees(employeeArray)
           })
        },
        [] 
    )



    return <article className="employeeContainer">
        {
            employees.map(employee=>{
                return <article className="employeeDiv" key ={employee.id}>
                    <article>Name: {employee?.user?.fullName}</article>
                    <article>Email: {employee?.user?.email}</article>
                    <article>Pay Rate: {employee.rate}</article>
                    <article>Address: {employee?.location?.address}</article>
                    <article>Start Date: {employee.startDate}</article>
                    <button onClick ={ ()=>navigate(`/employees/${employee.id}`)}>Fire Employee</button>
                </article>
            })
        }

    </article>
}