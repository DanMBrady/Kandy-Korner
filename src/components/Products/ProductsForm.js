import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"


export const ProductForm =() =>{

    const [productTypes, setProductTypes] = useState([])

    useEffect(
        () => {
           fetch("http://localhost:8088/productTypes")
           .then(response => response.json())
           .then((productTypeArray) => {
            setProductTypes(productTypeArray)
           })
        },
        [] 
    )

    const navigate = useNavigate()

    const [product, update] =useState({
        name:'',
        price:'',
        type:'',
    })

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        

       
        const ticketToSendToAPI = {
            userId :kandyUserObject.id,
            name: product.name,
            price:product.price,
            typeId:product.type,

        }

        return fetch("http://localhost:8088/products", {
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
    return  ( <form className="ticketForm">
    <h2 className="ticketForm__title">Add Product</h2>
    <fieldset>
        <div className="form-group">
            <label htmlFor="name">Product Name:</label>
            <input
                required autoFocus
                type="text"
                className="form-control"
                placeholder="Enter name of product"
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
            <label htmlFor="price">Price:</label>
            <input
                required autoFocus
                type="number"
                className="form-control"
                placeholder="Enter price of product"
                value={product.price}
                onChange={
                    (evt)=>{
                        const copy = {...product}
                        copy.price = parseFloat(evt.target.value,2)
                        update(copy)
                    }
                } />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="type">Product Type:</label>
           { productTypes.map(
            (productT) =>{
               return <article key ={productT.id}>{productT.type} 
                <input type="radio"
                    value={parseInt(productT.id)}
                    name ="types"
                    onChange={
                        (evt)=>{
                           const copy = {...product}
                           copy.type = parseInt(evt.target.value)
                           update(copy)
                           
                        }
                    } />
                     </article>
            })
                }
        </div>
    </fieldset>
    <button 
   
         onClick ={(clickEvent)=> handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
        Submit Product
    </button>
</form>
)}