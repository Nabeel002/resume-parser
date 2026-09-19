// app/providers.jsx

"use client";

import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";
import store from "@/store/store";
import {setCredentials, clearCredentials} from "@/store/features/auth/authSlice";
import { apiFetch } from "../app/lib/api";
function AuthHydrator(){
  const dispatch = useDispatch();
  useEffect(() => {
    (
      async ()=>{
        try{
          const res = await apiFetch('/api/user/profile');
          const data = await res.json();
          dispatch(setCredentials({user:data.user}));
        }
        catch(err){
          dispatch(clearCredentials());
        }
       }
    )();
  }, [dispatch])

  return null;
}

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <AuthHydrator />
      {children}
    </Provider>
  );
}