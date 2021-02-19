import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from "react-redux"
import { setCurrentUser } from "./UserReducer"

export default function UseAuth() {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const [isLogged,setisLogged] = useState(false)

  const setLoggedIn = (user) => {
    window.sessionStorage.setItem("userIn",JSON.stringify(user))
    dispatch(setCurrentUser(user))
    setisLogged(true)
  }

  const setLoggedOut = () => {
    window.sessionStorage.clear()
    dispatch(setCurrentUser(null))
    setisLogged(false)
  }

  useEffect(() => {
    const usr = window.sessionStorage.getItem("userIn") || false
    if(usr){
      const user = JSON.parse(window.sessionStorage.getItem("userIn")) || null
      setisLogged(!!user)
    } 
    
  },[])

  useEffect(() => {
    console.log("changed  currentUser",currentUser);
    const usr = window.sessionStorage.getItem("userIn") || false
    if (usr) {
      const user = JSON.parse(usr)
      if (!isLogged && !!user) {
        dispatch(setCurrentUser(user))
      }
    }
  },[currentUser, dispatch, isLogged])

  return { isLogged,setLoggedIn,setLoggedOut,currentUser }
}