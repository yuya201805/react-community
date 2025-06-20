import React from 'react';
import TextField from "@material-ui/core/TextField"

const TextInput = (props) => {
  return(
    <TextField 
      fullWidth={props.fullwidth}
      label={props.label}
      margin="dense"
      multiline={props.multiline}
      required={props.required}
      minrows={props.rows}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
      />
  )
}

export default TextInput