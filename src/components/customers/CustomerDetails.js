import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const CustomerDetails =()=>{
    const {customerId} =useParams()
    const [customer,updateCustomer] = useState({
        loyaltyNumber:0
    })
    const navigate = useNavigate()
    useEffect(
        ()=>{
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
            .then(response => response.json())
            .then((data)=>{
                const singleCustomer =data[0]
                updateCustomer(singleCustomer)
            })
        },
        [customerId]
       )


       const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const loyalty ={
            id:customer.id,
            address:customer.address,
            phoneNumber:customer.phoneNumber,
            loyaltyNumber:customer.loyaltyNumber,
            userId:customer.userId,
        }
        

        return fetch(`http://localhost:8088/customers/${customer.id}`,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(loyalty)
        })
        .then(response=>response.json())
        .then(() =>{
            navigate("/customers")
        })
    
    }

       return <article className="customerDetails">
         <article className="loyalty">
       <form className="profile">
          
       
       
            <fieldset>
                <div className="form-group">
                    <label htmlFor="loyaltyNumber"></label>
                    <input
                        required autoFocus
                        type="text"
                        className="loyaltyForm"
                        value={customer.loyaltyNumber}
                        onChange={
                            (evt) => {
                                const copy ={...customer}
                                copy.loyaltyNumber =evt.target.value
                                updateCustomer(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
            onClick ={(clickEvent)=> handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
                Submit Loyalty Number
            </button>
            </form>
       </article>
        <article className="customersDiv">
            <article className="customerName">{customer?.user?.fullName}</article>
            <article>Phone Number: {customer.phoneNumber}</article>
            <article>Email: {customer?.user?.email}</article>
            <article>Address: {customer.address}</article>
            <article>Loyalty Number: {customer.loyaltyNumber}</article>
        </article>
      
       </article>
}