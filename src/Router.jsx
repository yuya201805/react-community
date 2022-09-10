import React from 'react';
import {Switch, Route} from "react-router";
import {
  Home, SignUp, SignIn, Reset, ProductEdit, ProductList, ProductDetail,OrderConfirm, OrderHistory,
  TargetList, TargetEdit, TargetDetail, JoinList, CompleteHistory, CompleteConfirm
} from "./templates";

import Auth from './Auth'
import CartList from './templates/CartList';

const Router = () => {
    return (
        <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signin/reset" component={Reset} />
            
            <Auth>
                <Route exact path="(/)?" component={ProductList} />
                <Route exact path="/product/:id" component={ProductDetail} />
                <Route path="/product/edit(/:id)?" component={ProductEdit} />

                <Route exact path="/cart" component={CartList} />
                <Route exact path="/order/confirm" component={OrderConfirm} />
                <Route exact path="/order/history" component={OrderHistory} />

                <Route exact path="/target" component={TargetList} />
                <Route exact path="/complete/confirm/:id" component={CompleteConfirm} />
                <Route exact path="/target/detail/:id" component={TargetDetail} />
                <Route path="/target/edit(/:id)?" component={TargetEdit} />
                <Route exact path="/join" component={JoinList} />
                <Route exact path="/complete/history" component={CompleteHistory} />
            </Auth>
        </Switch>
    );
};

export default Router;