import React from "react";
import { RouterProvider } from "react-router-dom";
import { userRouter } from "./Routes/user.router.jsx";

const App = () => {
    return (
        <>
            <RouterProvider router={userRouter} />
        </>
    );
};

export default App;
