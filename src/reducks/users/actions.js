export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
    return {
        type: "SIGN_IN",
        payload: {
          isSignedIn: true,
          role: userState.role,
          uid: userState.uid,
          username: userState.username         
        }
    }
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
    return {
        type: "SIGN_OUT",
        payload: {
          isSignedIn: false,
          role: "",
          uid: "",
          username: ""
        }
    }
};

export const FETCH_PRODUCTS_IN_CART = "FETCH_PRODUCTS_IN_CART";
export const fetchProductsInCartAction = (products) => {
    return {
        type: "FETCH_PRODUCTS_IN_CART",
        payload: products
    }
};

export const FETCH_TARGETS_IN_JOIN = "FETCH_TARGETS_IN_JOIN";
export const fetchTargetsInJoinAction = (targets) => {
    return {
        type: "FETCH_TARGETS_IN_JOIN",
        payload: targets
    }
};

export const FETCH_ORDERS_HISTORY = "FETCH_ORDERS_HISTORY";
export const fetchOrdersHistoryAction = (orders) => {
    return {
        type: "FETCH_ORDERS_HISTORY",
        payload: orders
    }
}

export const FETCH_TARGETS_HISTORY = "FETCH_TARGETS_HISTORY";
export const fetchTargetsHistoryAction = (targets) => {
    return {
        type: "FETCH_TARGETS_HISTORY",
        payload: targets
    }
}
