interface Action {
    type: string;
    actionName: string;
    payload?: object;
}

function setPayLoadToAction(action: Action, payLoad: object): Action {
    return { ...action, payload: { ...payLoad } }
}

export { setPayLoadToAction }
export default Action
