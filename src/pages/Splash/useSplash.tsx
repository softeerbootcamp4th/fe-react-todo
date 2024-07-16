import { useContext } from "react";
import { RootContext } from "../../store/context/RootContext";
import { requestClearLoading, requestSetLoading } from "../../store/actions/systemAction";
//view model
const useSplash = () => {
    const { state, dispatch } = useContext(RootContext);
    const { system } = state;
    const { loading } = system;

    const setLoading = () => {
        requestSetLoading(dispatch);
    }
    const clearLoading = () => {
        requestClearLoading(dispatch);
    }

    return { loading, setLoading, clearLoading };
};
export default useSplash;