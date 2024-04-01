import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm/LoginForm";
import PageTitle from "../components/PageTitle/PageTitle";

const Login = () => {
  return (
    <div>
      <PageTitle>Please log in</PageTitle>
      <LoginForm />

      <p>
        or <Link to="/register">register</Link>
      </p>
    </div>
  );
}

export default Login;