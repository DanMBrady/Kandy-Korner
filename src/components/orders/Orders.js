import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Orders.css"

export const Orders=()=>{
    const localKandyUser = localStorage.getItem("kandy_user")
    const KandyUserObject = JSON.parse(localKandyUser)
    const [customers,setCustomers]=useState([])
    const [orders,setOrders]=useState([])
    const [products,setProducts]=useState([])
    const userCustomer=customers.find(customer=> customer.userId=== KandyUserObject.id)
    const userOrders= orders.filter(order=> order.customerId === userCustomer.id)
    
    

    useEffect(
        () => {
           fetch("http://localhost:8088/customers")
           .then(response => response.json())
           .then((customerArray) => {
            setCustomers(customerArray)
            
           })
        },
        [] 
    )
    useEffect(
        () => {
           fetch(`http://localhost:8088/purchases?_expand=product`)
           .then(response => response.json())
           .then((orderArray) => {
            setOrders(orderArray)
            
           })
        },
        [] 
    )
    useEffect(
        () => {
           fetch(`http://localhost:8088/products`)
           .then(response => response.json())
           .then((productArray) => {
            setProducts(productArray)
            
           })
        },
        [] 
    )
    return <article>
        <h2>Order History</h2>
    <article className="orderContainer">
        {userOrders.map(order=>{
        return<article className="orderBox"key ={order.id}>{order.purchaseAmount} {order?.product?.name} for ${order?.product?.price} each</article>
    })}</article>
    </article>
}