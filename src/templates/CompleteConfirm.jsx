import React, {useCallback, useMemo, useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProductsInCart} from "../reducks/users/selectors";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import {PrimaryButton, TextDetail, TextInput} from "../components/Ulkit";
import {completeTarget} from "../reducks/products/operations";
import {db, FirebaseTimestamp, auth } from "../firebase";
import Chip from '@material-ui/core/Chip';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Typography from '@material-ui/core/Typography';

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
    height: 150,
    margin: '24px auto 16px auto',
    padding: 16,
    width: 288
  },
}));

const CompleteConfirm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const productsInCart = getProductsInCart(selector);
  const path = selector.router.location.pathname
  const id = path.split('/complete/confirm/')[1];
  const [target, setTarget] = useState(null)
  console.log("iddddd", id)

  useEffect(()=>{
    db.collection('targets').doc(id).get().then(
      doc => {
        const data = doc.data();
        setTarget(data)
    })
  }, [])

  const [comment, setComment] = useState("")

  const inputComment= useCallback( (event) => {
    setComment(event.target.value)
  },[setComment])
      

  const complete = useCallback((target, comment) => {
    dispatch(completeTarget(target, comment))
  }, )

  return (
    <section className="c-section-wrapin">
      <Typography variant="h6" gutterBottom>
       達成おめでとう〜！
      </Typography>
      <div className="p-grid__row">
        <div className={classes.orderBox}>
          <TextInput 
            fullwidth={true} label={"他の方へ励ましのコメント"} multiline={false} required={true} onChange={inputComment} rows={1} value={comment} type={"text"}
          />
          <Divider/>
          <div className="module-spacer--extra-extra-small"/>
          {/* <PrimaryButton label={"達成コメントを残す"} onClick={ ()=>{complete(target, comment)} } /> */}
          <Chip
            size="large"
            color="secondary"
            onClick={ ()=>{complete(target, comment)} }
            className={classes.chip}
            icon={<ThumbUpAltIcon />}
            label="達成コメントを残す。"
          />

        </div>
      </div>
    </section>
  );
};
export default CompleteConfirm