import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listenauthState } from './reducks/users/operations';
import { getIsSignedIn } from './reducks/users/selectors';

const Auth = ({children}) => {
  const dispatch = useDispatch()
  // 現在の state
  const selector = useSelector((state) => state );
  // ログインしているどうかのフラグ
  const isSignedIn = getIsSignedIn(selector)

  useEffect(()=> {
    if(!isSignedIn){
      // ログインしていなければ、listenauthStateでログイン判定
      dispatch(listenauthState())
    }
  },[]);

  if(!isSignedIn){
    return <></>
  }else{
    return children
  }
}
export default Auth;