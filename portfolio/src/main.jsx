import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import App from './App.jsx';
import SelfAssessment from './components/SelfAssessment.jsx';
import OriginalArtifact from './components/OriginalArtifact.jsx';
import SoftwareDesign from './components/SoftwareDesign.jsx';
import Algorithms from './components/Algorithms.jsx';
import Databases from './components/Databases.jsx';

import './index.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <SelfAssessment />,
        },
        {
          path: 'original-artifact',
          element: <OriginalArtifact />,
        },
        {
          path: 'software-design',
          element: <SoftwareDesign />,
        },
        {
          path: 'algorithms',
          element: <Algorithms />,
        },
        {
          path: 'databases',
          element: <Databases />,
        },
        {
          path: '*',
          element: <Navigate to="/" replace />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);