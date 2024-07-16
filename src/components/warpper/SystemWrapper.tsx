import { CSSProperties, FC, Fragment, ReactNode, useContext, useEffect, useState } from "react";
import { TIME } from "../../constants/time";
import { RootContext } from "../../store/context/RootContext";
import { requestClearLoading } from "../../store/actions/systemAction";

interface SystemWrapperProps {
    children: ReactNode
}
const SystemWrapper: FC<SystemWrapperProps> = ({ children }) => {
    const { state,dispatch } = useContext(RootContext);
    const { loading } = state.system;
    const [loadingCloseTimer,setLoadingCloseTimer] = useState<number>(-1);

    useEffect(() => {
        if(loading){
            setLoadingCloseTimer(
                setTimeout(() => {
                    requestClearLoading(dispatch);
                }, TIME.SECOND * 10)
            );
        }
        if(!loading){
            clearTimeout(loadingCloseTimer);
            setLoadingCloseTimer(0);
        }
    }, [loading]);


    return <div>
            {loading && (
                <Fragment>
                    <div style={styles.wall_paper} />
                    <div style={styles.loading_wrapper}>
                        <img
                            src="/loading/loading.svg"
                            style={{ width: 100, height: 100 }}
                        />
                    </div>
                </Fragment>
            )}
            {children}
        </div>
};

const styles = {
    wall_paper: {
        zIndex: 99999,
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
        opacity: 0.8,
        transition: "opacity 4s ease",
    } as CSSProperties,
    loading_wrapper: {
        zIndex: 100000,
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    } as CSSProperties,
}

export default SystemWrapper;