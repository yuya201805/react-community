import { push } from 'connected-react-router';
import React, {useCallback, useState} from 'react';
import { useDispatch } from 'react-redux';
import {PrimaryButton, TextInput} from '../components/Ulkit';
import {signUp} from '../reducks/users/operations'

const SignUp = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(""),
        [email, setEmail] = useState(""),
        [password, setPassword] = useState(""),
        [confirmPassword, setConfirmPassword] = useState("");

  // 値を変更する。
  const inputUsername = useCallback((event) => {
    setUsername(event.target.value)
  },[setUsername])

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  },[setEmail])

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  },[setPassword])

  const inputConfirmPassword = useCallback((event) => {
    setConfirmPassword(event.target.value)
  },[setConfirmPassword])

  return (
    <div className="c-section-container">
      <h2 className="u-text_headline u-text-center">アカウント登録</h2>
      <div className="module-spacer--medium" />
      {/* onChangeで変更と同時に、stateに値を反映。 */}
      <TextInput
        fullWidth={true} label={"ユーザ名"} multiline={false} required={true} rows={1} value={username} type={"text"} onChange={inputUsername}
      />
      <TextInput
        fullWidth={true} label={"email"} multiline={false} required={true} rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <TextInput
        fullWidth={true} label={"パスワード"} multiline={false} required={true} rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <TextInput
        fullWidth={true} label={"確認パスワード"} multiline={false} required={true} rows={1} value={confirmPassword} type={"confirm"} onChange={inputConfirmPassword}
      />

      <div className="center">
        <PrimaryButton 
          label={"アカウントを登録する。"}
          onClick={ ()=> dispatch(signUp(username, email, password, confirmPassword)) }
        />
        <p onClick={()=> dispatch(push("/signin")) }>アカウントをお持ちの方はこちら</p>
      </div>
    </div>
  )
}
export default SignUp