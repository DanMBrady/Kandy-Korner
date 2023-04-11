export const CandySearch =({ setterFunction })=>{
    return (
        <div>
            <input className="candySearch"
            onChange={
                (changeEvent)=>{
                    setterFunction(changeEvent.target.value)
                }
            }
            type="text" placeholder="Find Candy" />

        </div>
    )
        }