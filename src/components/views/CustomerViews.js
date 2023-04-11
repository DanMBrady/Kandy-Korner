import { Outlet, Route, Routes } from "react-router-dom"
import { AllLocations } from "../locations/Locations"
import { Orders } from "../orders/Orders"
import { CandyContainer } from "../Products/CandyContainer"
import { Cart } from "../Products/Cart"
import { ProductsDisplay } from "../Products/Products"
import { ProductForm } from "../Products/ProductsForm"

export const CustomerViews =()=>{
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner</h1>
                    <div>The best place to get all your candy needs</div>

                    <Outlet />
                </>
            }>

				<Route path="locations" element={ <AllLocations /> } />
                <Route path="products" element={ <ProductsDisplay /> } />
                <Route path="product/:productId" element={ <Cart/> } />
                <Route path="candy" element={ <CandyContainer /> } />
                <Route path="orders" element={ <Orders /> } />
                
                
				
              
            </Route>
        </Routes>
    )
}