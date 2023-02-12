import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Global, css } from '@emotion/react'
import ManropeFont from './assets/Manrope-VariableFont_wght.ttf';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Global
      styles={css`
      @font-face {
        font-family: "Manrope"  ;
        src: url(${ManropeFont});
      }
        *, 
        *::before,
        *::after {
          margin: 0;
          padding: 0;
          box-sizing: inherit;
        }

        html,
        body {
          width: 100%;
          min-height: 100vh;
          font-size: 20px;
          box-sizing: border-box;
          background-color: #1C1C1E;
          font-family: Manrope;
          color: #fff;
        }
      `}
    />
    <App />
  </React.StrictMode>,
)
