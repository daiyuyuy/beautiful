import http from "src/utils/request";

export const sendCode = async (mobile: string) => {
  await http.get(`/sms/codes/${mobile}`);
};
