import { ItemType, UserType } from "../../../App"
import "./item.css"

type Prop ={
    item: ItemType
    currentUser: UserType | undefined
}

export default function Item({item, currentUser}:Prop){
    return(
        <li key={item.id} className="item">
            <div className="image">
                <img src={item.image} alt={item.title} />
            </div>
            <div className="title-price">
                <p>
                    {item.title}
                </p>
                    <span className="price">
                        {item.price}
                    </span>
            </div>
        </li>
    )
}