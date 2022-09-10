import { push } from 'connected-react-router';
import React, {useCallback, useState} from 'react';
import { useDispatch } from 'react-redux';
import {PrimaryButton, TextInput} from '../components/Ulkit';
import {signIn} from '../reducks/users/operations'

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(""),
        [password, setPassword] = useState("");

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  },[setEmail])

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  },[setPassword])

  return (
    <div className="c-section-container">
      <h2 className="u-text_headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true} label={"email"} multiline={false} required={true} 
        rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <TextInput
        fullWidth={true} label={"パスワード"} multiline={false} required={true} 
        rows={1} value={password} type={"password"} onChange={inputPassword}
      />

      <div className="center">
        <PrimaryButton 
          label={"サインイン"}
          onClick={()=> dispatch(signIn(email, password) ) }
        />
        <div className="module-spacer--medium" />
        {/* dispatch(push)で遷移 */}
        <p onClick={()=> dispatch(push("/signup")) }>アカウントをお持ちでない方はこちら</p>
        <p onClick={()=> dispatch(push("/signin/reset")) }>パスワードを忘れた方はこちら</p>
      </div>
    </div>
  )
}
export default SignIn