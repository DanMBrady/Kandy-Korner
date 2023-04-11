import { Outlet, Route, Routes } from "react-router-dom"
import { AllLocations } from "../locations/Locations"
import { ProductsDisplay } from "../Products/Products"
import { ProductForm } from "../Products/ProductsForm"
import { EmployeeViews } from "./EmployeeViews"
import { CustomerViews } from "./CustomerViews"

export const ApplicationViews = () => {
	const localKandyUser =localStorage.getItem("kandy_user")
    const kandyUserObject =JSON.parse(localKandyUser)

    if(kandyUserObject.staff){
        return <EmployeeViews />
    }
    else{
        return <CustomerViews />
    }
}

