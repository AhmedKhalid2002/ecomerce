import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css';
import App from './App';
import UserTokenProvider from './contex/userTokenContext';
import {QueryClient,QueryClientProvider} from "react-query";
import { CartContextProvider } from './contex/cartContext';
import { WishlistContextProvider } from './contex/wishlist';
const root = ReactDOM.createRoot(document.getElementById('root'));
let queryClient= new QueryClient();
root.render(
    <QueryClientProvider client={queryClient}>
        <WishlistContextProvider>
            <CartContextProvider>
                <UserTokenProvider>
                    <App />
                </UserTokenProvider>
            </CartContextProvider>
        </WishlistContextProvider>
    </QueryClientProvider>
    
);


