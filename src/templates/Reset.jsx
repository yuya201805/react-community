import { push } from 'connected-react-router';
import React, {useCallback, useState} from 'react';
import { useDispatch } from 'react-redux';
import {PrimaryButton, TextInput} from '../components/Ulkit';
import {resetPassword} from '../reducks/users/operations'

const Reset = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("")

  const inputEmail = useCallback( (event) => {
    setEmail(event.target.value)
  }, [setEmail])

  return (
    <div className="c-section-container">
      <h2 className="u-text_headline u-text-center">パスワードのリセット</h2>
      <div className="module-spacer--medium" />

      <TextInput
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true} rows={1} value={email} type={"email"} onChange={inputEmail}
      />

      <div className="center">
        <PrimaryButton 
          label={"リセットパスワード"}
          onClick={()=> dispatch(resetPassword(email)) }
        />

        <p onClick={()=> dispatch(push("/signin")) }>ログインに戻る。</p>
      </div>
    </div>
  )
}

export default Reset