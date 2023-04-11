import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Products.css"

export const ProductsDisplay =() =>{
const [productTypes, setProductTypes] = useState([])
const [products,setProducts] = useState([])
const [filteredProducts,setFilteredProducts] =useState([])
const [topPriced, setTopPriced] =useState(false)
const navigate = useNavigate()

const localKandyUser = localStorage.getItem("kandy_user")
const KandyUserObject = JSON.parse(localKandyUser)

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

useEffect(
    () => {
       fetch("http://localhost:8088/products")
       .then(response => response.json())
       .then((productArray) => {
        setProducts(productArray)
        
       })
    },
    [] 
)

useEffect(
    ()=>{

        setFilteredProducts(products)

    },
    [products]

)

useEffect(
    ()=>{
        if(topPriced ){
            const topProducts = products.filter(product => product.price > 5)
            setFilteredProducts(topProducts)
        }
        else{
            setFilteredProducts(products)
        }
    },
    [topPriced]
)


return <>
    {
        KandyUserObject.staff
        ? <>
    <button className ="button" onClick ={ ()=>setTopPriced(true)}  >Top Priced</button>
    <button className ="button" onClick ={ ()=>setTopPriced(false)}  >Show All</button>
    <button className ="button" onClick ={ ()=>navigate("/productForm")}  >Create Candy</button>
    </>
    :""
    }

    <h2>Products</h2>
    <div className="prodContainer">
    {
       filteredProducts.map((product)=>{
        return <section key ={product.id} className="products">
            <div className="prod">
            <article className="displayProductsH">{product.name}</article>
            <article className="displayProducts">Cost: ${product.price}</article>
            <article className="displayProducts">Type: {productTypes.find(productType => productType.id === product.typeId)?.type}</article>
            </div>
            {
                 KandyUserObject.staff
                 ? "":
            <div className="prodButton">
            <article><button onClick ={ ()=>navigate(`/product/${product.id}`)} className="cartButton">Add to Cart</button></article>
            </div>

            }
        </section>
       

       }

      
       )
        
       
    }
</div>


</>
}