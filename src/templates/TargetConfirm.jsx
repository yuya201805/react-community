import React, {useCallback, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProductsInCart} from "../reducks/users/selectors";
import {makeStyles} from "@material-ui/core/styles";
import {CartListItem} from "../components/Products";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import {PrimaryButton, TextDetail, TextInput} from "../components/Ulkit";
import {orderProduct} from "../reducks/products/operations";

const useStyles = makeStyles((theme) => ({
  detailBox: {
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: 320
    },
    [theme.breakpoints.up('md')]: {
      width: 512
    },
  },
  orderBox: {
    border: '1px solid rgba(0,0,0,0.2)',
    borderRadius: 4,
    boxShadow: '0 4px 2px 2px rgba(0,0,0,0.2)',
    height: 256,
    margin: '24px auto 16px auto',
    padding: 16,
    width: 288
  },
}));

const TargetConfirm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const productsInCart = getProductsInCart(selector);

  const [description, setDescription] = useState("")

  const inputDescrition = useCallback( (event) => {
        setDescription(event.target.value)
      },[setDescription])

  // const order = useCallback(() => {
  //   dispatch(orderProduct(productsInCart, total))
  // }, )

  return (
    <div></div>
  );
};
export default TargetConfirm