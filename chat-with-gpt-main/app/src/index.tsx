import { MantineProvider } from '@mantine/core';
/*
Mantine: Mantine is a React component library that provides a set of high-quality components and hooks. 
It is used to style the application, providing a consistent look and feel. In this code snippet, the MantineProvider component is used to wrap the application,
 making the dark theme available to all child components.
*/
import { ModalsProvider } from '@mantine/modals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { IntlProvider } from 'react-intl';
/*
react-intl: react-intl is a library that provides internationalization (i18n) features for React applications. 
It enables developers to easily localize their applications by providing translations for different languages. In this code snippet, the IntlProvider component is used to wrap the application, making the locale data available to all child components.
*/
import { Provider } from 'react-redux';
/*
react-redux: react-redux is a library that allows React applications to use the Redux state management system.
 Redux is a popular state management library for JavaScript applications, and react-redux provides a set of React bindings to make it easier to use Redux with React.
  In this code snippet, the Provider component is used to wrap the application, making the Redux store available to all child components.
*/
import { createBrowserRouter, RouterProvider } from "react-router-dom";
/*
react-router-dom: react-router-dom is a popular routing library for React applications that provides an easy way to handle navigation and manage the application's URL history. 
In this code snippet, the createBrowserRouter function is used to define the routes for the application, and the RouterProvider component is used to wrap the application, 
making the router instance available to all child components.
*/
import { PersistGate } from 'redux-persist/integration/react';
/*
redux-persist: redux-persist is a library that allows the Redux store to be persisted across page reloads. 
This can be useful in cases where you want to maintain the application state even when the user refreshes the page or navigates away and comes back later. 
In this code snippet, the PersistGate component is used to wrap the application, enabling the persistence of the Redux store.
*/
import { AppContextProvider } from './context';
import store, { persistor } from './store';

import ChatPage from './components/pages/chat';
import LandingPage from './components/pages/landing';
/*
LandingPage and ChatPage: These are custom React components that represent the main pages of the application. 
The LandingPage likely serves as an entry point for users, while the ChatPage is where the chat functionality resides. 
There are also routes for shareable chat pages, which might allow users to invite others to join a chat session via a unique URL.
*/

import './backend';
import './index.scss';

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppContextProvider>
            <LandingPage landing={true} />
        </AppContextProvider>,
    },
    {
        path: "/chat/:id",
        element: <AppContextProvider>
            <ChatPage />
        </AppContextProvider>,
    },
    {
        path: "/s/:id",
        element: <AppContextProvider>
            <ChatPage share={true} />
        </AppContextProvider>,
    },
    {
        path: "/s/:id/*",
        element: <AppContextProvider>
            <ChatPage share={true} />
        </AppContextProvider>,
    },
]);
/*
AppContextProvider: This is a custom React context provider that likely provides additional application-specific state or functionality to its child components. 
While the specific implementation details are not available in the provided code snippet, it's common for context providers to be used for managing global state or providing utility functions 
that are shared across multiple components.
*/
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

async function loadLocaleData(locale: string) {
    const response = await fetch(`/lang/${locale}.json`);
    if (!response.ok) {
        throw new Error("Failed to load locale data");
    }
    const messages: any = await response.json();
    for (const key of Object.keys(messages)) {
        if (typeof messages[key] !== 'string') {
            messages[key] = messages[key].defaultMessage;
        }
    }
    return messages;
}

async function bootstrapApplication() {
    const locale = navigator.language;

    let messages: any;
    try {
        messages = await loadLocaleData(locale.toLocaleLowerCase());
    } catch (e) {
        console.warn("No locale data for", locale);
    }

    root.render(
        <React.StrictMode>
            <IntlProvider locale={navigator.language} defaultLocale="en-GB" messages={messages}>
                <MantineProvider theme={{ colorScheme: "dark" }}>
                    <Provider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <ModalsProvider>
                                <RouterProvider router={router} />
                            </ModalsProvider>
                        </PersistGate>
                    </Provider>
                </MantineProvider>
            </IntlProvider>
        </React.StrictMode>
    );
}

bootstrapApplication();