"use client";

import useUser from "@/hooks/useUser";
import useUserMustBeLogged from "@/hooks/useUserMustBeLogged";
import { useRouter } from "next/navigation";
import { useReducer } from "react";
import { loginUser } from "../utils/data";

const Login = () => {
  const { user } = useUser();
  useUserMustBeLogged(user, "out", "/");
  const router = useRouter();

  console.log(user);

  function reducer(state, action) {
    switch (action.type) {
      case "email":
      case "password":
        return { ...state, [action.type]: action.value };
      case "loading":
        return { ...state, loading: action.value };
      case "response":
        return { ...state, response: action.value };
    }

    throw Error("Unknown action." + action.type);
  }

  const initialState = {
    email: "",
    password: "",
    response: "",
    loading: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password, response, loading } = state;

  const login = async (e) => {
    dispatch({ type: "loading", value: true });
    dispatch({ type: "response", value: null });
    e.preventDefault();

    const response = await loginUser(email, password);

    dispatch({ type: "response", value: response });
    dispatch({ type: "loading", value: false });
    if (!!response?.success) {
      setTimeout(() => {
        router.replace("/");
      }, 3000);
    }
  };
  return (
    <div className="w-[390px] lg:w-[500px] mx-auto px-[46px]">
      {response && (
        <div
          className={`${
            response.success
              ? "bg-green-200 border-2 border-green-800 text-green-800"
              : "bg-red-200 border-2 border-red-800 text-red-800"
          } py-2 px-5 my-10 text-center`}
        >
          <span className="font-bold">
            {response.success
              ? `Success ${response.message}`
              : `Failure: ${response.error.message}`}
          </span>
        </div>
      )}
      <h2 className="my-14 h1 heading text-center">Login</h2>
      <form
        onSubmit={login}
        className={loading ? "opacity-[10%] pointer-events-none" : ""}
      >
        {/* ["email", "name", "slug", "password", "response", "loading"] */}
        {Object.keys(initialState)
          .filter((k) => !["response", "loading"].includes(k))
          .map((key) => {
            let type = "text";
            if (key === "password") {
              type = "password";
            } else if (key === "email") {
              type = "email";
            }

            return (
              <p key={key} className="mb-5">
                <label className="text-xl capitalize w-[75px] font-bold text-black inline-block">
                  {key}*
                </label>
                <input
                  className="bg-seashell p-2 border-4 border-black text-black focus:border-purple block w-full"
                  required
                  name={key}
                  onChange={(e) => {
                    dispatch({ type: e.target.name, value: e.target.value });
                  }}
                  value={state[key]}
                  type={type}
                />
              </p>
            );
          })}
        <div className="flex justify-center my-10">
          <input className="button small" type="submit"></input>
        </div>
      </form>
    </div>
  );
};

export default Login;
