import React from 'react'
import ReactDOM from 'react-dom/client'
// @ts-ignore
import App from './App'


import './index.css'

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
} else {
    console.error('Root element not found');
}