import Action from "./Actions";
import State from "./State";

interface Reducer<PayLoad> {
    type: string;
    reducer: (state: State<PayLoad>, action: Action) => State<PayLoad>;
}

export default Reducer;
