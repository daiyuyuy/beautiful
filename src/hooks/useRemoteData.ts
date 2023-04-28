import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserBasicInfo } from "src/types/data";



//自定义Hook函数
import { RootState, RootThunkAction } from "src/types/store";

export function useRemoteData(func:()=>RootThunkAction){
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(func())
    },[dispatch])

    const state=useSelector<RootState>((state)=>{
        return state
    })
    return state
}