import { UserType } from "../../App"
import AccButton from "../buttons/AccButton"
import "./header.css"

type Prop={
    currentUser?: UserType,
    setCurrentUser: Function,
}
export default function Header({currentUser, setCurrentUser}:Prop){

    const logOut = ()=>{
        setCurrentUser(null)
    }

    return (
        <header>
            <div className="logo">
                <h1>CRAMAZAON</h1>
            </div>
            <div className="searchBar">
                <form
                    onSubmit={(e)=>{
                        e.preventDefault()
                    }}
                >
                    <input type="text" name="search" id="search" />
                    <button type="submit">🔎</button>
                </form>
            </div>
            <div className="account">
                <h3>
                    {
                        currentUser? `Welcome ${currentUser.name}` : "Hello there"
                    }
                </h3>
                {
                    currentUser
                    ? <AccButton buttonClass={"logout"} buttonName={"Log Out"} logOut={logOut} />
                    : <div className="two-buttons">
                        <AccButton buttonClass={"log-in"} buttonName={"Log In"} navigateLoc={'login'} />
                        <AccButton buttonClass={"sign-up"} buttonName={"SignUp"} navigateLoc={'signup'} />
                        </div>
                    
                      
                }
            </div>
        </header>
    )
}