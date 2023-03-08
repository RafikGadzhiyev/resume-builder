import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Global, css } from '@emotion/react'
import ManropeFont from './assets/fonts/Manrope-VariableFont_wght.ttf';
import { store } from './state/store'


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

        *::-webkit-scrollbar {
          width: .25rem;
        }

        *::-webkit-scrollbar-thumb {
          border-radius: 5px;
          background-color: rgb(255 255 255 / .25)
        }
        *::-webkit-scrollbar-thumb:hover {
          border-radius: 5px;
          background-color: rgb(255 255 255 / .4)
        }
        *::-webkit-scrollbar-thumb:active {
          border-radius: 5px;
          background-color: rgb(255 255 255 / .75)
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
    <Provider
      store={store}
    >
      <App />
    </Provider>
  </React.StrictMode>,
)
