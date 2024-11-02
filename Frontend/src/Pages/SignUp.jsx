import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "../Components/OAuth";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
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
      if (!formData.username || !formData.email || !formData.password) {
        setError("Please fill all the fields");
        return;
      }
      setLoading(true);
      // setError(false);
      const data = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const response = await data.json();
      if (response.success === false) {
        setError(response.message);
        return;
      }
      setLoading(false);
      navigate("/sign-in");
      setFormData({
        username: "",
        password: "",
        email: "",
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
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
          <p className=" text-sm mt-5 ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
            earum perferendis modi suscipit! Officiis commodi architecto tempore
            tenetur totam, ea, harum necessitatibus fugit dolorum odio
            perferendis ex itaque tempora voluptate.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className=" ">
              <Label value="Your username" color="black" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                style={{ backgroundColor: "white", color: "black" }}
                onChange={handleChange}
                value={formData.username}
              />
            </div>
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
                placeholder="password"
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
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in " className="text-blue-700">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
