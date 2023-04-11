import "./Locations.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const AllLocations =() =>{
const [locations, setLocations] = useState([])

useEffect(
    () => {
       fetch("http://localhost:8088/locations")
       .then(response => response.json())
       .then((locationArray) => {
        setLocations(locationArray)
       })
    },
    [] 
)

    return <article>
        <h2>List of Locations</h2>
        <article className="locations">
            {
                locations.map(
                    (location)=>{
                        return <section key ={location.id}className="locationBox">
                        <article className="displayLocation">{location.address}</article>
                        <article className="displayLocation">{location.squareFootage} Square Footage</article>
                        </section>
                    }
            )}
        </article>
        </article>
}