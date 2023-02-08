import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Global, css } from '@emotion/react'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Global
      styles={css`
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
          background-color: #181F2D;
          color: #fff;
        }
      `}
    />
    <App />
  </React.StrictMode>,
)
