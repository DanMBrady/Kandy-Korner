import { useEffect, useState } from "react"


export const CandyList=({ searchTermState })=>{
    const [products,setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    const localKandyUser = localStorage.getItem("kandy_user")
    const KandyUserObject = JSON.parse(localKandyUser)

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

   /* useEffect(
        ()=>{
    
            setFilteredProducts(products)
    
        },
        [products]
    
    )*/

    useEffect(
        ()=>{
            const searchedProducts = products.filter(product=> {

                return product.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            if(searchTermState !==""){
                setFilteredProducts(searchedProducts)
                }
                else{
                    setFilteredProducts([])
                }
        },
        [ searchTermState ]
    )

    return  <article className="candyContainer">
    {
        filteredProducts.map((product)=>{
         return <section key ={product.id} className="candy">
             <article className="displayProductsH">{product.name}</article>
             <article className="displayProducts">Cost: ${product.price}</article>
            
         </section>
 
        }
 
 
        )
         
        
     }
     </article>
}