import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";

export const MainLayout: FC = () => {
    return (
        <div className="wrapper">
            <Header />

            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};
