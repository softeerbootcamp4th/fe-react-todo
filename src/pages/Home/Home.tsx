import { FC } from "react";
import useHome from "./useHome";

//view
const Home: FC = () => {
    const { 
        user,
        login  
    } = useHome();

    return <div className="bg-pink-400 flex-row w-full" >
        <div onClick={login} >
            {JSON.stringify(user)}
            LOGIN
        </div>
        Home
    </div>
}
export default Home;