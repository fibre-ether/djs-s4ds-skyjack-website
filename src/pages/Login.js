import React, { useEffect, useState } from 'react'
import './Login.css'
import Cookies from 'js-cookie'
import db from '../firebase/firebase'
import { collection, getDocs, where, query } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import { Encrypt } from '../auth/Encrypt'
import { Decrypt } from '../auth/Decrypt'

function Login() {
    const history = useNavigate() 

    useEffect(() => {
      const checkUserInfo = Decrypt(Cookies.get('user'))
      if (checkUserInfo !== undefined) {
          history('/play')
      }
      // eslint-disable-next-line
    }, [])
    

    const [uName, setUName] = useState("")
    const [pWord, setPWord] = useState("")
    const [wrongPwBool, setWrongPwBool] = useState(false)
    

    function Auth(userName, passWord) {
        const fireBaseCollection = collection(db, "dbcooper_teams")
        //TODO: check how bad the following line is for security
        const fireBaseQuery = query(query(fireBaseCollection, where('name', '==', userName)), where('pwd', '==', passWord))
        getDocs(fireBaseQuery).then((value) => {
            if (value.size === 1) {

                value.forEach((item)=>{
                    let {pwd, ...newItem} = item.data()
                    newItem = Encrypt(newItem)
                    Cookies.set("user", newItem)
                })
                setWrongPwBool(false)
                history("/play")
            } else {
                setWrongPwBool(true)
            }
            //TODO : implement cases for < 1 and > 1
        })
    }
    

  return (
    <div className='login-wrapper flex-full-center'>
        <div className='login-box flex-col-full-center'>
            <div className='login-text-wrapper'>
                <p className='login-text'>Login</p> 
                <p className='login-subtext'>Enter your credentials below</p>
            </div>
                <form action="submit" onSubmit={(e) => {e.preventDefault(); Auth(uName, pWord)}}>
            <div className='flex-col-full-center'>
                    <div className='login-input-wrapper'>
                        Team Name:
                        <input type="text" onChange={(e) => {setUName(e.target.value)}} value={uName} placeholder='Username' className='username-input'/>
                        Password:
                        <input type="password" onChange={(e) => {setPWord(e.target.value)}} value={pWord} placeholder='Password' className='password-input'/>
                    </div>
                    {wrongPwBool?<p className='wrong-pw-text'>Wrong Credentials</p>:null}
                    <input type="submit" /* onClick={()=>{console.log("started via button press"); Auth(uName, pWord)}} */ value="Submit" className='submit-button btn-container'/>
            </div>
                </form>
        </div>
    </div>
  )
}

export default Login
