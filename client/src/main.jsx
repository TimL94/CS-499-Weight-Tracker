import React from "react";

import ReactDOM from "react-dom/client";

// Imports Apollo Client and related modules for GraphQL API communication.
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

import {
  ApolloProvider,
} from "@apollo/client/react";

import {
  SetContextLink,
} from "@apollo/client/link/context";

import {
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// Imports the main application component and all page components.
import App from "./App.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import CreateAccount from "./pages/CreateAccount.jsx";
import WeightLog from "./pages/WeightLog.jsx";
import AddWeight from "./pages/AddWeight.jsx";
import Goal from "./pages/Goal.jsx";
import CalorieLog from "./pages/CalorieLog.jsx";

import Auth from "./utils/auth.js";
import theme from "./utils/theme.js";


// Connects Apollo Client to the GraphQL API.
const httpLink =
  new HttpLink({
    uri:
      import.meta.env
        .VITE_GRAPHQL_URI ||
      "http://localhost:4000/graphql",
  });

// Adds the authentication token to the request headers for authenticated API requests.
const authLink =
  new SetContextLink(
    (prevContext) => {
      const token =
        localStorage.getItem(
          "id_token"
        );

      return {
        headers: {
          ...prevContext.headers,

          authorization:
            token
              ? `Bearer ${token}`
              : "",
        },
      };
    }
  );

// Creates the Apollo Client instance with the HTTP link and authentication link.
const client =
  new ApolloClient({
    link:
      authLink.concat(
        httpLink
      ),

    cache:
      new InMemoryCache(),
  });

// Redirects the user to the appropriate page based on their authentication status.
function HomeRedirect() {
  if (
    Auth.loggedIn()
  ) {
    return (
      <Navigate
        to="/weight-log"
        replace
      />
    );
  }

  return (
    <Navigate
      to="/login"
      replace
    />
  );
}


// Creates the router for the application, defining the routes and their corresponding components.
const router =
  createBrowserRouter([
    {
      path: "/",
      element: <App />,

      children: [
        {
          index: true,

          element: (
            <HomeRedirect />
          ),
        },

        {
          path: "login",

          element: (
            <Login />
          ),
        },

        {
          path:
            "create-account",

          element: (
            <CreateAccount />
          ),
        },

        {
          path:
            "weight-log",

          element: (
            <ProtectedRoute>
              <WeightLog />
            </ProtectedRoute>
          ),
        },

        {
          path:
            "add-weight",

          element: (
            <ProtectedRoute>
              <AddWeight />
            </ProtectedRoute>
          ),
        },

        {
          path: "goal",

          element: (
            <ProtectedRoute>
              <Goal />
            </ProtectedRoute>
          ),
        },

        {
          path:
            "calories",

          element: (
            <ProtectedRoute>
              <CalorieLog />
            </ProtectedRoute>
          ),
        },

        {
          path: "*",

          element: (
            <HomeRedirect />
          ),
        },
      ],
    },
  ]);

  // Renders the application, wrapping it with ApolloProvider for GraphQL support and ThemeProvider for Material-UI theming.
ReactDOM
  .createRoot(
    document.getElementById(
      "root"
    )
  )
  .render(
    <React.StrictMode>
      <ApolloProvider
        client={client}
      >
        <ThemeProvider
          theme={theme}
        >
          <CssBaseline />

          <RouterProvider
            router={router}
          />
        </ThemeProvider>
      </ApolloProvider>
    </React.StrictMode>
  );