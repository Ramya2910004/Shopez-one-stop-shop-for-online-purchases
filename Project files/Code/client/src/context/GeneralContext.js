import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const GeneralContext = createContext();

const GeneralContextProvider = ({children}) => {


  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');


  const [productSearch, setProductSearch] = useState('');

  const [cartCount, setCartCount] = useState(0);


  useEffect(()=>{
    fetchCartCount();
  }, [])

  const fetchCartCount = async() =>{
    const userId = localStorage.getItem('userId');
    console.log('fetchCartCount userId:', userId);
    if(userId && userId !== 'undefined' && userId !== 'null'){
      await axios.get(`http://localhost:6001/cart/${userId}`).then(
        (response)=>{
          setCartCount(response.data.length);
        }
      ).catch((err) => {
        console.error('fetchCartCount error:', err);
        setCartCount(0);
      });
    } else {
      setCartCount(0);
    }
  }

  const handleSearch = () =>{
    navigate('#products-body')
  }


  
  
  
  const login = async () =>{
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    try{
      const loginInputs = {email, password}
        await axios.post('http://localhost:6001/login', loginInputs)
        .then( async (res)=>{

          localStorage.setItem('userId', res.data._id);
            localStorage.setItem('userType', res.data.usertype);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('email', res.data.email);
            await fetchCartCount();
            if(res.data.usertype === 'user'){
                navigate('/');
            } else if(res.data.usertype === 'admin'){
                navigate('/admin');
            }
          }).catch((err) =>{
            alert("login failed!!\n" + (err.response?.data?.message || err.message));
            console.log(err);
          });
          
        }catch(err){
          alert("login failed!!\n" + err.message);
          console.log(err);
        }
      }
      
  const inputs = {username, email, usertype, password};

  const register = async () =>{
    if (!username || !email || !password || !usertype) {
      alert('Please fill all fields (username, email, password, usertype).');
      return;
    }
    console.log('Registration inputs:', {username, email, usertype, password});
    try{
        await axios.post('http://localhost:6001/register', inputs)
        .then( async (res)=>{
            localStorage.setItem('userId', res.data._id);
            localStorage.setItem('userType', res.data.usertype);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('email', res.data.email);
            await fetchCartCount();
            if(res.data.usertype === 'user'){
                navigate('/');
            } else if(res.data.usertype === 'admin'){
                navigate('/admin');
            }

        }).catch((err) =>{
            alert("registration failed!!\n" + (err.response?.data?.message || err.message));
            console.log(err);
        });
    }catch(err){
        alert("registration failed!!\n" + err.message);
        console.log(err);
    }
  }



  const logout = async () =>{
    
    localStorage.clear();
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        localStorage.removeItem(key);
      }
    }
    
    navigate('/');
  }



  return (
    <GeneralContext.Provider value={{login, register, logout, username, setUsername, email, setEmail, password, setPassword, usertype, setUsertype, productSearch, setProductSearch, handleSearch, cartCount}} >{children}</GeneralContext.Provider>
  )
}

export default GeneralContextProvider