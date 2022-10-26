import { Provider } from "react-redux";
import { store, wrapper } from "../src/store";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
