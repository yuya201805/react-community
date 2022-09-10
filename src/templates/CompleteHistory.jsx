import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import List from "@material-ui/core/List";
import {getTargetsHistory} from "../reducks/users/selectors";
import {CompleteHistoryItem} from "../components/Targets";
import {fetchTargetsHistory} from "../reducks/users/operations";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    orderList: {
        background: theme.palette.grey["100"],
        margin: '0 auto',
        padding: 32,
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        [theme.breakpoints.up('md')]: {
            width: 768
        }
    },
}))

const CompleteHistory = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state  => state)
    const targets = getTargetsHistory(selector);

    useEffect(() => {
        dispatch(fetchTargetsHistory())
    },[])

    return (
        <section className="c-section-wrapin">
           <List className={classes.orderList}>
              {targets.length > 0 && (
                targets.map(target => <CompleteHistoryItem target={target} key={target.id} />)
              )}
            </List>
        </section>
    );
};

export default CompleteHistory;