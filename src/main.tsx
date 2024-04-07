import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthSessionProvider } from './auth/AuthSessionContext.tsx';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthSessionProvider>
                <App />
            </AuthSessionProvider>
        </BrowserRouter>
    </React.StrictMode>
);
