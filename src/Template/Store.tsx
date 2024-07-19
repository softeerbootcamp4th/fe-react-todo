import Action from "./Actions";
import State from "./State";
import Reducer from "./Reducer";
import removeFirst from "./RemoveFirst";
import replaceFirst from "./ReplaceFirst";

const store: {
    states: State<unknown>[],
    reducers: Reducer<unknown>[],
    subscribe: <PayLoad>(initState: State<PayLoad>, reducer: Reducer<PayLoad>, cb: (state: State<PayLoad>) => void) => void,
    dispatch: (action: Action) => void,
    publish: <PayLoad>(state: State<PayLoad>) => void
    subscribeList: Map<string, <PayLoad>(state: State<PayLoad>) => void>
} = {
    states: [],
    reducers: [],
    subscribeList: new Map(),
    dispatch: function (action) {
        const reducer = this.reducers.filter(reducer => reducer.type == action.type)[0].reducer
        const { removed, newArray } = removeFirst(this.states, (state) => state.type == action.type)
        const newState = reducer(removed, action);
        this.states = [...newArray, newState];
        this.publish(newState);
    },
    publish: function (state) {
        const announceCallBack = this.subscribeList.get(state.type);
        if (announceCallBack !== undefined) {
            announceCallBack(state);
        }
    },
    subscribe: function <PayLoad>(state: State<PayLoad>, reducer: Reducer<PayLoad>, cb: (state: State<PayLoad>) => void) {
        this.states = replaceFirst(this.states, state, (element) => element.type == state.type)
        this.reducers = replaceFirst(this.reducers, reducer as Reducer<unknown>, (element) => element.type == state.type)
        this.subscribeList.set(state.type, cb as (state: State<unknown>) => void);
    }
}

export default store
