import { useContext } from "react";
import { RootContext } from "../../store/context/RootContext";
import { requestLogin } from "../../store/actions/userAction";

//view model
const useHome = () => {
    const { state, dispatch } = useContext(RootContext);
    const { user } = state;
    const login = () => {
        requestLogin(dispatch,{name: "hihi"});
    }
    return { user,login };
};
export default useHome;