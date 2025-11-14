//importing the global css
import '../styles/global.css';


//this component is the only way to import global css because it might cause other unwanted affects
//exporting to nextjs to compile and display
export default function App({ Component, pageProps }) {
    //sending to nextjs
  return <Component {...pageProps} />;
}