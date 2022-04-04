import React, { useEffect, useState } from "react";
import move from "lodash-move";
import Page from "../components/Page";
import Cookies from 'js-cookie'
import './Papers.css'
import { Link, useNavigate } from "react-router-dom";
import QStep from "../components/QStep";
import { Decrypt } from "../auth/Decrypt";
import { doc, onSnapshot } from "firebase/firestore";
import db from '../firebase/firebase'


const CARD_COLORS = [[0,"#d6d6d6"], [1,"#cccccc"], [2,"#bababa"], [3,"#d6d6d6"], [4,"#cccccc"], [5,"#bababa"], [6,"#d6d6d6"], [7,"#cccccc"], [8,"#bababa"], [9,"#d6d6d6"], [10,"#cccccc"]];


const Papers = () => {

  const history = useNavigate()
  const [userInfo, setUserInfo] = useState()
  
  
  useEffect(() => {
    const localUser = Decrypt(Cookies.get('user'))
    if (
      localUser !== undefined
    ) {    
      const userId = localUser.id
      const user = doc(db, `dbcooper_teams/${userId}`)
      //TODO: make security changes
      if (userId === undefined) {
        history('/login')
      } else {
        const unsub = onSnapshot(user, (snapshot) => {
          setUserInfo(snapshot.data())
        })
        return () => {
          unsub()
        }
      }
    } else {
      //TODO:add alert saying pls login (because creds are not valid)
      history("/login")
    }
    // eslint-disable-next-line
  }, [])

  

  const [cards, setCards] = useState(CARD_COLORS);

  const moveToEnd = (from, direction) => {
    if (direction==='next') {
    setCards(move(cards, from, cards.length - 1));
  } else if(direction==='prev') {
    setCards(move(cards, cards.length - 1, from));
    }
  };

  const handleSignOut = () => {
    Cookies.remove('user')
    history('/login')
  }
  

  return (
    /* covers full screen */
     
    <div className="wrapperStyle">
    {/* mui stepper */}
    {/* //TODO: remove this false and make it userinfo */}
    <div className="stepper-style">
      {userInfo && <QStep progress={userInfo.checkpoints} /> }
    </div>
       {/* covers the cards */}
       {userInfo && <div className="outerWrapperStyle">
         {/* navbar wrapper */}
         <div className="navDiv">
           <div><Link to={'/home'} className="buzz" data-content='SkyJack'>SkyJack</Link></div>
           <div>Hello {userInfo.name}</div>
           <div onClick={() => handleSignOut()}><div className="buzz" data-content='SignOut'>SignOut</div></div>
         </div>
         {/* body wrapper */}
         <ul className="cardWrapStyle">
           {/* <Page canDrag={true} userProgress={user.info.checkpoints} color={[-1,"#d6d6d6"]} index /> */}
           {cards.map((color, index) => {
             const canDrag = index === 0;
             return (
               /* Page is one card */
               <Page  canDrag={canDrag} userProgress={userInfo.checkpoints} color={color} index={index} CARD_COLORS={CARD_COLORS} moveToEnd={moveToEnd} key={index}/>
             );
           })}
         </ul>
       </div>}
    </div>
    
  );
};

export default Papers;



