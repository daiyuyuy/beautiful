import { Token } from "src/types/data";

const BEAUTIFUL_KEY = "beautiful-token";
export const setToken = (token: Token) => {
  localStorage.setItem(BEAUTIFUL_KEY, JSON.stringify(token));
};

export const getToken = ():Token => {
  return JSON.parse(localStorage.getItem(BEAUTIFUL_KEY) || "{}");
};

export const removeToken=()=>{
    localStorage.removeItem(BEAUTIFUL_KEY)
}
//判断localStorage中有没有token
export const hasToken=():boolean=>{
    return !!getToken().token
}
