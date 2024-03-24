import axios from "axios";

// Axios, which is a popular library is mainly used to send asynchronous HTTP 
// requests to REST (Representational State Transfer) endpoints. 
// This library is very useful to perform CRUD operations. 
// It is commonly utilized in web development, particularly in frontend applications, 
// to communicate with backend servers or APIs.

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
