import { useEffect } from "react"
import { useState } from "react"
import "./Customer.css"
import { Link } from "react-router-dom"

export const Customers =({id,name,email})=>{
   return <section key={id} className="customersDiv">
    <div className="customerSpace">
        <Link to={`/customers/${id}`} className="customerLink">Name: {name}</Link>
    </div>
    <div className="customerSpace">Email: {email} </div>
   </section>
  
}

