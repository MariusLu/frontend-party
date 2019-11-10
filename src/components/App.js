import React from "react";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import ServersPage from "./courses/ServersPage";
import LoginPage from "./login/login"

function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route path="/servers" component={ServersPage} />
                <Route component={PageNotFound} />
            </Switch>
        </div>
    )
}

export default App;