import { Dug } from './lib';

const config: RequestInit = {
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
}
const handleError = (response: Response): Response | PromiseLike<Response> => {
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      return response;
    }
  } 

export const dug = new Dug(config, handleError);