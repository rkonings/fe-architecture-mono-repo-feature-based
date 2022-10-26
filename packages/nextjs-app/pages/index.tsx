import {  getCookies, setCookie  } from "cookies-next";
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from "next";
import { useEffect } from "react";
import { wrapper } from "../src/store";
import styles from "../styles/Home.module.css";
import axios, { AxiosInstance, AxiosStatic } from 'axios'
import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

import {serialize, parse} from 'cookie'

export default function Home({data}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {


  useEffect( () => {
    console.log(window.document.cookie)
  },[] )
  

  return (
    <div className={styles.container}>
      <div><pre>{JSON.stringify(data, null, 2)}</pre></div>
    </div>
  );
}

async function apiClient (request: Request, req: IncomingMessage & {
  cookies: NextApiRequestCookies;
}, res: ServerResponse) {
  
  request.headers.append('cookie', `acc-gamma-nl-CART-UID=${req.cookies['acc-gamma-nl-CART-UID']};`)
  const response = await fetch(request)
  // console.log(response.headers.get('set-cookie'))

  const cookies = parse(response.headers.get('set-cookie'))
  if(cookies['acc-gamma-nl-CART-UID']) {
    setCookie('acc-gamma-nl-CART-UID', cookies['acc-gamma-nl-CART-UID'], {res, req})
  }
  return response
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ params, req, res }) => {
//       const url = "https://kassa.acceptatie.gamma.nl/api/v2/cart"
//       const response: Response = await fetch(url, {
//         credentials: 'include',
//         headers: {Cookie: req.headers['cookie']}
//       });
//       const data = await response.json();
//       const responseCookies = response.headers.get('set-cookie')
//       res.setHeader('set-cookie', responseCookies)

//       return {
        
//         props: {
//           data: {...data, responseCookies, requestCookies: req.headers['cookie']}
//         },
//       };
//     }
// );


export const getServerSideProps = withSessionSsr(wrapper.getServerSideProps(
  (store) =>
    async ({ params, req, res }) => {


      // console.log(request.headers.get('cookie'))

      // setCookie('test', 'value', { req, res, maxAge: 60 * 6 * 24 });
      // getCookie('test', { req, res });
      const cookies = getCookies({ req, res,domain: 'gamma.nl' });

      
      
      // const request = new Request('http://kassa.local.acceptatie.gamma.nl:9000/', {
      //   method: 'GET',
      //   credentials: 'same-origin',
      //   mode: 'cors',
      //   headers
      // });


      // const response: Response = await fetch(request)
      // const data = await response.json();
      // const responseCookies = response.headers.get('set-cookie')

      // res.setHeader('set-cookie', responseCookies)

      const response = await apiClient(new Request('http://kassa.local.acceptatie.gamma.nl:9000/'), req, res)
      const data = await response.json()

      // const {data, headers} = await axios.get('http://kassa.local.acceptatie.gamma.nl:9000/');
      // res.setHeader('set-cookie', headers["set-cookie"])
      
      return {
        
        props: {
          data: {...data, cookies}
        },
      };
    }
));


export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
  handler: (
    context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>) {
  return async function nextGetServerSidePropsHandlerWrapped(
    context: GetServerSidePropsContext,
  ) {
    // const { req, res  } = context
    // axios.interceptors.request.use(function (config) {
    //   config.headers = {'Cookie': req.headers.cookie}
    //   return config;
    // }, function (error) {
    //   // Do something with request error
    //   return Promise.reject(error);
    // });

    return handler(context);
  };
}
