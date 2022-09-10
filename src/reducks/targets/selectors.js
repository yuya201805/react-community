import { createSelector } from "reselect";

const targetsSelector = (state) => state.targets;

export const getTargets = createSelector(
    [targetsSelector],
    state => state.list
);