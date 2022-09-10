import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTargetsInJoin} from "../reducks/users/selectors";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core/styles";
import {JoinListItem} from "../components/Targets"
import {PrimaryButton, GreyButton} from "../components/Ulkit";
import {push} from "connected-react-router"


const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    maxWidth: 400,
    width: '100%'
  },
}));

const JoinList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const targetsInJoin = getTargetsInJoin(selector);

  const goToOrder = useCallback(() => {
    dispatch(push('/order/confirm'))
  }, []);

  const backToTop = useCallback(() => {
    dispatch(push('/'))
  }, []);

  const goToTarget = useCallback(() => {
    dispatch(push('/target'))
  }, []);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">参加済み目標一覧</h2>
      <List className={classes.root}>
        {targetsInJoin.length > 0 && (
          targetsInJoin.map(target => <JoinListItem target={target} key={target.cartId}/>)
        )}
      </List>
      <div className="module-spacer--medium"/>
      <div className="p-grid__column">
        <PrimaryButton label={"目標一覧へ戻る"} onClick={goToTarget}/>
      </div>
    </section>
  );
};
export default JoinList;
