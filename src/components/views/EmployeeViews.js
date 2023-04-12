import { Outlet, Route, Routes } from "react-router-dom"
import { CustomerDetails } from "../customers/CustomerDetails"
import { CustomerList } from "../customers/CustomerList"
import { Customers } from "../customers/Customers"
import { EmployeeForm } from "../employees/EmployeeForm"
import { Employees } from "../employees/Employees"
import { Fire } from "../employees/Fire"
import { AllLocations } from "../locations/Locations"
import { ProductsDisplay } from "../Products/Products"
import { ProductForm } from "../Products/ProductsForm"

export const EmployeeViews =()=>{
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
                <Route path="productForm" element={ <ProductForm /> } />
                <Route path="employeeForm" element={ <EmployeeForm /> } />
                <Route path="employees" element={ <Employees /> } />
                <Route path="customers" element={ <CustomerList /> } />
                <Route path="customers/:customerId" element={ <CustomerDetails />} />
                <Route path="employees/:employeeId" element={ <Fire/> } />
                
				
              
            </Route>
        </Routes>
    )
}