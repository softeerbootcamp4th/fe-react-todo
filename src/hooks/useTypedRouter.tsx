import { NavigateFunction, NavigateOptions, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

export const useTypedNavigate = () => {
    const unTypedNavigate: NavigateFunction = useNavigate()
    const navigate = (path: ROUTES | number, options?: NavigateOptions) => {
        if (typeof path === 'number') {
            unTypedNavigate(path);
          } else {
            unTypedNavigate(path, options);
          }
    };
  return navigate;
};
