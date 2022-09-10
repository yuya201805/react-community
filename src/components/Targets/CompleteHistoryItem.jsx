import React, {useCallback} from 'react';
import Divider from "@material-ui/core/Divider";
import {TextDetail} from "../Ulkit";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/styles";
import {PrimaryButton} from "../Ulkit";
import {useDispatch} from "react-redux";
import {push} from "connected-react-router"
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
    list: {
        background: '#fff',
        height: 'auto',
				maxWidth: '500px'
    },
		listBox: {
			maxWidth: '500px',
			margin: '0 auto',
		},
    image: {
        objectFit: 'cover',
        margin: '8px 16px 8px 0',
        height: 96,
        width: 96
    },
    text: {
        width: '100%'
    }
}))

const CompleteHistoryItem = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const target = props.target;

    const goToTargetPage = useCallback((id) => {
        dispatch(push('/target/detail/'+id))
    }, [])

    const createdDatetime = props.target.created_at.toDate()

    return (
      <div className={classes.listBox}>
        <div className="module-spacer--small" />
        	<TextDetail label={"タイトル: " + target.target_name} />
          {Object.keys(target).length > 0 && (
            <>
							<List className={classes.list}>
								<ListItem>
									<ListItemAvatar>
										{/* <img className={classes.image} src={images[0].path} alt="目標のTOP画像" /> */}
									</ListItemAvatar>
									<div className={classes.text}>
									<ListItemText primary={"一言コメント"} />
										<ListItemText secondary={target.comment} />

									</div>
									<IconButton onClick={() => goToTargetPage(target.targetId)} >
										<EditIcon />
									</IconButton>
								</ListItem>
								<Divider />
							</List>
            </>
          )}
        <div className="module-spacer--extra-extra-small" />
        <Divider />
      </div>
    );
};
export default CompleteHistoryItem;