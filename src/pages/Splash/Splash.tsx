import { FC } from "react";
import useSplash from "./useSplash";

//view
const Splash: FC = () => {
    const {setLoading,clearLoading,loading} = useSplash();
    return <div>
        {JSON.stringify(loading)}
        <div onClick={setLoading} >Loading On</div>
        <div onClick={clearLoading} >Loading Off</div>
    </div>
}
export default Splash;