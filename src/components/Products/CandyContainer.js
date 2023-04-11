import { CandyList } from "./CandyList"
import { CandySearch } from "./CandySearch"
import { useState } from "react"

export const CandyContainer =()=>{
    const [searchTerms, setSearchTerms]=useState("")
    return <>
    <CandySearch setterFunction ={setSearchTerms}/>
    <CandyList searchTermState={searchTerms}/> 
</>
}
