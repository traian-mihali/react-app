import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";
import NavBar from "./components/navbar";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import CustomerForm from "./components/customerForm";
import ProtectedRoute from "./components/common/protectedRoute";
import Logout from "./components/logout";
import Profile from "./components/profile";
import RentalForm from "./components/rentalForm";
import ReturnForm from "./components/returnForm";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={props => <Movies {...props} user={user} />}
            />
            <ProtectedRoute path="/customers/:id" component={CustomerForm} />
            <Route
              path="/customers"
              render={props => <Customers {...props} user={user} />}
            />
            <ProtectedRoute path="/returns/:id" component={ReturnForm} />
            <ProtectedRoute path="/returns" component={ReturnForm} />
            <ProtectedRoute path="/rentals/new" component={RentalForm} />
            <Route
              path="/rentals"
              render={props => <Rentals {...props} user={user} />}
            />
            <ProtectedRoute
              path="/profile"
              render={props => <Profile {...props} user={user} />}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
