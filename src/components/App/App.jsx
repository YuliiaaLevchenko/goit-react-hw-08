import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import css from "../App/App.module.css";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import { refreshUser } from "../../redux/auth/operations";
import { PrivateRoute } from "../PrivateRoute";
import { RestrictedRoute } from "../RestrictedRoute";
import { selectIsRefreshing } from "../../redux/auth/selectors";

const HomePage = lazy(() => import("../../pages/Home"));
const RegisterPage = lazy(() => import("../RegistrationForm/RegistrationForm"));
const ContactsPage = lazy(() => import("../../pages/Contacts"));
const LoginPage = lazy(() => import("../LoginForm/LoginForm"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Layout>
      <div className={css.container}>
        <h1>Phonebook</h1>

      {isRefreshing ? (
        <b>Refreshing user, please wait...</b>
      ) : (
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  component={<RegisterPage />}
                  redirectTo="/contacts"
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  component={<LoginPage />}
                  redirectTo="/contacts"
                />
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute component={<ContactsPage />} redirectTo="/login" />
              }
            />
          </Routes>
        </Suspense>
      )}
      <Toaster />
      </div>
      </Layout>
  );
}

export default App;



