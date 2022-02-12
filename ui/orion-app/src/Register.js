import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5193/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <form onSubmit={submit}>
      <h1 className="h3 mb-3 fw-normal">Register</h1>

      <input
        className="form-control  my-3"
        placeholder="Name"
        required
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        className="form-control  my-3"
        placeholder="name@example.com"
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control  my-3"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};
