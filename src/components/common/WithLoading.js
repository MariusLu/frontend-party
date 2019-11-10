import React from "react";
import "../assets/spinner.css";

export default function WithLoading(Component) {
    return function WithLoadingComponent({ ...props }) {
        const { isLoading, ...rest } = props;
        if (!isLoading) {
            return <Component {...rest}>{props.children}</Component>;
        }
        return <div className="loader">Loading...</div>;
    };
}