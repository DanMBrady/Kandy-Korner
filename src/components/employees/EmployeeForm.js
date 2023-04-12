import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Employee.css"


export const EmployeeForm =()=>{

    const [locations,setLocations] = useState([])
   
    const navigate = useNavigate()

    const [product, update] =useState({
        name:'',
        location:'',
        startDate:'',
        payRate:'',
        email:'',
    })

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    

    useEffect(
        () => {
           fetch("http://localhost:8088/locations")
           .then(response => response.json())
           .then((LocationArray) => {
            setLocations(LocationArray)
           })
        },
        [] 
    )

   

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        

       
        const ticketToSendToAPIUser = {
            fullName: product.name,
            email:product.email,
            isStaff:true,

        }

        const ticketToSendToAPIEmployee ={
            startDate: product.startDate,
            locationId:product.location,
            rate:parseInt(product.payRate),
            
        }
        
        return fetch("http://localhost:8088/users", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(ticketToSendToAPIUser)
        })
        .then(response => response.json())
        .then((user)=>{
            ticketToSendToAPIEmployee.userId=user.id
            return fetch("http://localhost:8088/employees", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(ticketToSendToAPIEmployee)
        })
        })
        .then(() =>{
            navigate("/employees")
        })
      

       
    }

    return ( <div className="createEmployee">
    
    <form className="ticketForm">
    <h2 className="ticketForm__title">New Employee</h2>
    <fieldset>
        <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
                required autoFocus
                type="text"
                className="form-control"
                placeholder="Enter name of new employee"
                value={product.id}
                onChange={
                    (evt)=>{
                        const copy = {...product}
                        copy.name = evt.target.value
                        update(copy)
                      
                    }
                } />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="name">Email:</label>
            <input
                required autoFocus
                type="text"
                className="form-control"
                placeholder="Enter email of new employee"
                value={product.id}
                onChange={
                    (evt)=>{
                        const copy = {...product}
                        copy.email = evt.target.value
                        update(copy)
                      
                    }
                } />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="type">Location:</label>
           { locations.map(
            (location) =>{
               return <article key ={location.id}>{location.address} 
                <input type="radio"
                    value={parseInt(location.id)}
                    name ="types"
                    onChange={
                        (evt)=>{
                           const copy = {...product}
                           copy.location = parseInt(evt.target.value)
                           update(copy)
                           
                        }
                    } />
                     </article>
            })
                }
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="name">Start Date:</label>
            <input
                required autoFocus
                type="date"
                className="form-control"
                placeholder="Enter start date"
                value={product.id}
                onChange={
                    (evt)=>{
                        const copy = {...product}
                        copy.startDate = evt.target.value
                        update(copy)
                      
                    }
                } />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="price">Pay Rate:</label>
            <input
                required autoFocus
                type="number"
                className="form-control"
                placeholder="Enter pay rate"
                value={product.id}
                onChange={
                    (evt)=>{
                        const copy = {...product}
                        copy.payRate = evt.target.value
                        update(copy)
                    }
                } />
        </div>
    </fieldset>
   
    <button 
   
   onClick ={(clickEvent)=> handleSaveButtonClick(clickEvent)}
      className="buttonEmployee">
  Submit New Employee
</button>
</form>
</div>
)
}