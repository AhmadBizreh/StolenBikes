import axios from "axios";

export const BASEURL = import.meta.env.VITE_BASEURL;

export const getRequestWithParams = async (url: string, params: any) => {
  return await axios.get(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    params: params,
  });
};
