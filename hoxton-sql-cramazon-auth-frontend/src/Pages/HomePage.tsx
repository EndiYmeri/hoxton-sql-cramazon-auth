import { UserType } from "../App";
import Header from "../components/header/Header";
import Items from "../components/items/Items";

type Prop={
    currentUser?: UserType
    setCurrentUser: Function,
}
export default function HomePage({currentUser, setCurrentUser}:Prop){
    return (
        <>
           <Header currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            <div className="main">
                <Items currentUser={currentUser}/>
            </div>
        </>
    )
}