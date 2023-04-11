import { useEffect } from "react"
import { useState } from "react"
import { Customers } from "./Customers"
import "./Customer.css"


export const CustomerList =()=>{
    const [customers,setCustomers] = useState([])

    useEffect(
        () => {
           fetch("http://localhost:8088/users?isStaff=false")
           .then(response => response.json())
           .then((customerArray) => {
            setCustomers(customerArray)
           })
        },
        [] 
    )
    return <article className="customerContainer">
       
        {
            customers.map(customer=> <Customers key ={customer.id}
            id={customer.id}
            name={customer.fullName}
            email={customer.email}
            
            />
            )
}   
        
       </article>
   
}

