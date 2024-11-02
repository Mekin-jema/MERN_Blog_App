import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signinStart, signinFail, signinSuccess } from "../Redux/userSlice";
import OAuth from "../Components/OAuth";

const SignIn = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.email || !formData.password) {
        return;
      }
      dispatch(signinStart());
      // setError(false);
      const data = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const response = await data.json();
      if (response.success === false) {
        dispatch(signinFail(response.message));
        return;
      }
      dispatch(signinSuccess(response));
      navigate("/");
      setFormData({
        password: "",
        email: "",
      });
      console.log(response);
    } catch (error) {
      dispatch(signinFail(error.message));
    }
  };
  return (
    <div className=" min-h-screen mt-20 ">
      {error && (
        <Alert className="mt-5  " color="failure">
          {error}
        </Alert>
      )}
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left side */}
        <div className=" flex-1 ">
          <Link
            to="/"
            className="  sm:text-xl font-bold  text-5xl
       "
          >
            <span className=" px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">
              Mekin's
            </span>
            Blog
          </Link>
          <p className=" text-lg mt-5 ">
            This is a demo Project . you can sign in with your emaila nd
            password
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className=" ">
              <Label value="Your email" style={{ color: "black" }} />
              <TextInput
                type="text"
                placeholder="email"
                id="email"
                style={{ backgroundColor: "white", color: "black" }}
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className=" ">
              <Label value="Your password" style={{ color: "black" }} />
              <TextInput
                type="password"
                placeholder="************"
                id="password"
                style={{ backgroundColor: "white", color: "black" }}
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
              className=" disabled:opacity-90"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pt-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span> Don't have an account?</span>
            <Link to="/sign-up " className="text-blue-700">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
