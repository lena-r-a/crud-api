import { IncomingMessage, ServerResponse } from "http";
import * as crypto from "crypto";
import { Stream } from 'stream';

interface iUser {
    id: string,
    name: string,
    age: number,
    hobby: string[],
  }


export const getReqData =(req: IncomingMessage):Promise<string> => {
  return new Promise((resolve, reject) => {
      try {
          let body = "";
          req.on("data", (chunk) => {
              body += chunk.toString();
          });
          req.on("end", () => {
              resolve(body);
          });
      } catch (error) {
          reject(error);
      }
  });
}

export const getUUID = () =>
(String(1e7) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
  (Number(c) ^ (crypto.randomBytes(1)[0] & (15 >> (Number(c) / 4)))).toString(16),
); 

export const validateFields = (body: object, object: object)=> {
    let arrayFields = Object.keys(object);
    for(let key of arrayFields) { 
        if(!body.hasOwnProperty(key)) 
            return false;
    }
    return true
}