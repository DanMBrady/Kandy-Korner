import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const Cart =()=>{
    const {productId} =useParams()
    const [customers,setCustomers]=useState([])
    const [product,setProduct]=useState({})
    const [purchase,setPurchase]=useState({
        purchaseAmount:1,
    })
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const KandyUserObject = JSON.parse(localKandyUser)
    
    const userCustomer=customers.find(customer=> customer.userId=== KandyUserObject.id)
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
        ()=>{
            fetch(`http://localhost:8088/products?id=${productId}`)
            .then(response => response.json())
            .then((data)=>{
                const singleProduct =data[0]
                setProduct(singleProduct)
            })
        },
        [productId]
       )

       const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        
       
        const ticketToSendToAPI = {
            customerId:userCustomer.id,
            productId:parseInt(productId),
            purchaseAmount:purchase.purchaseAmount,
            

        }

        return fetch("http://localhost:8088/purchases", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(ticketToSendToAPI)
        })
        .then(response => response.json())
        .then(() =>{
            navigate("/products")
        })

       
    }
return <article className="cartContainer">
    <div className="cartBox">
   You are buying <label className="bold">{product.name} </label> 
which costs <label className="bold">${product.price}</label> each.<article> Enter below how many you would like to purchase.</article>
    <fieldset>
        <div className="form-group">
            
            <input
                required autoFocus
                type="number"
                className="cartSelect"
                placeholder="Enter quantity of product"
                value={purchase.purchaseAmount}
                onChange={
                    (evt)=>{
                        const copy = {...purchase}
                           copy.purchaseAmount = parseInt(evt.target.value)
                           setPurchase(copy)
                      
                    }
                } />
        </div>
    </fieldset>
    <button  onClick ={(clickEvent)=> handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
        Buy Product</button>
        </div>
</article>
}