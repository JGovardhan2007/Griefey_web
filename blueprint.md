
# Blueprint

## Overview

Griefey is a web-based grievance redressal platform that allows users to submit and track grievances. This document outlines the blueprint for the admin-facing side of the application, which will be used to manage and address user grievances.

## Features

*   **Authentication:** Secure login for administrators.
*   **Dashboard:** A central hub to view all submitted grievances.
*   **Grievance Details:** A detailed view of each grievance, including its history and status.
*   **Status Updates:** The ability to update the status of a grievance and add notes.
*   **Filtering:** The ability to filter grievances by category and status.
*   **Navigation:** A persistent back button for easy navigation between pages.

## Tech Stack

*   **Frontend:** React, Material-UI
*   **Backend:** Firebase (Firestore, Authentication)
*   **Routing:** React Router
*   **Notifications:** React Hot Toast

## Project Structure

```
src
├── components
│   ├── GrievanceHistory.jsx
│   ├── GrievanceTable.jsx
│   ├── Layout.jsx
│   └── ProtectedRoute.jsx
├── contexts
│   └── AuthContext.jsx
├── hooks
│   └── useAuth.js
├── pages
│   ├── Dashboard.jsx
│   ├── GrievanceDetails.jsx
│   └── Login.jsx
├── services
│   └── firebase.js
├── App.jsx
└── main.jsx
```

## Current Task

The current task is to build the admin-facing side of the Griefey application. This includes creating the following pages and components:

*   **Login Page:** A page for administrators to log in.
*   **Dashboard Page:** A page that displays a table of all grievances.
*   **Grievance Details Page:** A page that displays the details of a specific grievance.
*   **Layout Component:** A layout component that includes a header, a back button, and a logout button.
*   **ProtectedRoute Component:** A component that protects routes from unauthenticated users.
*   **AuthContext:** A context to manage authentication state.
*   **useAuth Hook:** A hook to access authentication state.

The application will use Firebase for authentication and Firestore for the database. Material-UI will be used for the UI components, and React Router will be used for routing.
