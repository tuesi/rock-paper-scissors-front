import React, {useState} from 'react'
import './user.scss'
import { useDispatch, useSelector } from 'react-redux'
import {usernameAdd} from "../redux/username"
import {Connect} from '../Backend/Backend'

function User() {

    const dispatch = useDispatch();
    const [userInput, setUserInput] = useState();
    const { mode } = useSelector((state) => state.mode);

    function handleSubmit(input){
        input.preventDefault();
        dispatch(usernameAdd(userInput));
        console.log(mode);
        Connect(userInput, mode, dispatch);
    }

  return (
    <>
        <form className='User' onSubmit={handleSubmit}>
            <input className='NameInput' onChange={e => setUserInput(e.target.value)} placeholder="Enter your username"/>
            <button className="InputButton"><span>Submit</span></button>
        </form>
    </>
  )
}

export default User