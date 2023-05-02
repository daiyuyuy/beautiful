import { Channel } from "src/types/data";

const CHANNEL_KEY = "channels";

export const setChannel = (channel: Channel[]) => {
  localStorage.setItem(CHANNEL_KEY, JSON.stringify(channel));
};

export const getChannel = (): Channel[] => {
  return JSON.parse(localStorage.getItem(CHANNEL_KEY) || "[]");
};

export const remveChannel = () => {
  localStorage.removeItem(CHANNEL_KEY);
};
