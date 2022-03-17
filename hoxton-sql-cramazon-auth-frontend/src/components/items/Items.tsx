import { useEffect, useState } from "react"
import { ItemType, UserType } from "../../App"
import Item from "./item/item"
import "./items.css"

type Prop={
  currentUser: UserType | undefined
}

export default function Items({currentUser}:Prop){
    const [storeItems, setStoreItems] = useState<ItemType[]>()
    useEffect(()=>{
      fetch('http://localhost:4000/items')
      .then(resp => resp.json())
      .then(items => setStoreItems(items))
    },[])

    if(!storeItems) return <h2>Loading items...</h2>
    return(
      <ul className="items">
        {storeItems?.map( item => {
          return <Item item={item} currentUser = {currentUser } />
        })}
      </ul>
    )
}