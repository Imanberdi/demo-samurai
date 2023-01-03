import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../../features/auth/authSlice";

const LoginPage = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  if (isAuth) return <Navigate to={"/profile"} replace />;
  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(login(data));
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
          placeholder="email"
        />
        {errors.email && <SpanError>{errors.email.message}</SpanError>}
      </div>
      <div>
        <input
          type="password"
          {...register("password", {
            required: "This field is required",
            validate: (value) => {
              return [/[0-9]/].every((pattern) => pattern.test(value)) || "";
            },
            minLength: {
              value: 6,
              message: "Min 6 symbol",
            },
          })}
          placeholder="password"
        />
        {errors.password && <SpanError>{errors.password.message}</SpanError>}
      </div>
      <div>
        <input
          type="checkbox"
          {...register("rememberMe", { required: "This field is required" })}
        />
        <span>remember me</span> <br />
        {errors.rememberMe && (
          <SpanError>{errors.rememberMe.message}</SpanError>
        )}
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export const SpanError = styled.span`
  color: red;
`;
