export const FETCH_TARGETS = "FETCH_TARGETS";
export const fetchTargetsAction = (targets) => {
    return {
        type: "FETCH_TARGETS",
        payload: targets
    }
};

export const DELETE_TARGET = "DELETE_TARGET";
export const deleteTargetAction = (targets) => {
    return {
        type: "DELETE_TARGET",
        payload: targets
    }
};