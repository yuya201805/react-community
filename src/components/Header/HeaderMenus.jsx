import React, {useEffect} from 'react';
import IconButton from "@material-ui/core/IconButton";
import {Badge} from "@material-ui/core";
import {fetchProductsInCart, fetchTargetsInJoin} from "../../reducks/users/operations";
import {useDispatch, useSelector} from "react-redux";
import {getProductsInCart, getUserId, getTargetsInJoin} from "../../reducks/users/selectors";
import {push} from "connected-react-router"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import {db} from '../../firebase/index'
import MenuIcon from "@material-ui/icons/Menu";
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';

const HeaderMenu = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector)
    const targetsInJoin = getTargetsInJoin(selector);
    const productsInCart = getProductsInCart(selector)
    

    useEffect(() => {
        const unsubscribe = db.collection('users').doc(uid).collection('cart')
            .onSnapshot(snapshots => {

                snapshots.docChanges().forEach(change => {
                    const product = change.doc.data();
                    const changeType = change.type

                    switch (changeType) {
                        case 'added':
                            productsInCart.push(product);
                            break;
                        case 'modified':
                            const index = productsInCart.findIndex(product => product.cartId === change.doc.id)
                            productsInCart[index] = product;
                            break;
                        case 'removed':
                            productsInCart = productsInCart.filter(product => product.cartId !== change.doc.id);
                            break;
                        default:
                            break;
                    }
                });

                dispatch(fetchProductsInCart(productsInCart))
            });

        return () => unsubscribe()
    },[]);

    useEffect(() => {
        const unsubscribe = db.collection('users').doc(uid).collection('target')
            .onSnapshot(snapshots => {

                snapshots.docChanges().forEach(change => {
                    const target = change.doc.data();
                    const changeType = change.type

                    switch (changeType) {
                        case 'added':
                            targetsInJoin.push(target);
                            break;
                        case 'modified':
                            const index = targetsInJoin.findIndex(target => target.cartId === change.doc.id)
                            targetsInJoin[index] = target;
                            break;
                        case 'removed':
                            targetsInJoin = targetsInJoin.filter(target => target.cartId !== change.doc.id);
                            break;
                        default:
                            break;
                    }
                });

                dispatch(fetchTargetsInJoin(targetsInJoin))
            });

        return () => unsubscribe()
    },[]);

    return (
        <>
            <IconButton onClick={ () => dispatch(push('/cart')) }>
                <Badge badgeContent={productsInCart.length} color="secondary">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            <IconButton onClick={ () => dispatch(push('/join')) }>
                <Badge badgeContent={targetsInJoin.length} color="secondary">
                    <LibraryAddCheckIcon />
                </Badge>
            </IconButton>
            <IconButton>
                <FavoriteBorderIcon />
            </IconButton>
            <IconButton
             onClick={ (event)=> props.handleDrawerToggle(event) }
            >
                <MenuIcon />
            </IconButton>
        </>
    );
};

export default HeaderMenu;