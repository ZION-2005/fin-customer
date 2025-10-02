"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCustomerPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    dateOfBirth: "",
    memberNumber: "",
    interests: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        memberNumber: parseInt(form.memberNumber),
        interests: form.interests.split(",").map((s) => s.trim()),
      }),
    });
    router.push("/customer");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Customer</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <br /><br />
        <input type="date" name="dateOfBirth" onChange={handleChange} required />
        <br /><br />
        <input name="memberNumber" placeholder="Member Number" onChange={handleChange} required />
        <br /><br />
        <input name="interests" placeholder="Interests (comma separated)" onChange={handleChange} />
        <br /><br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
