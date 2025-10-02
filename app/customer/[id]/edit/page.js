"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditCustomerPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [form, setForm] = useState({
    name: "",
    dateOfBirth: "",
    memberNumber: "",
    interests: ""
  });

  // Load existing customer data
  useEffect(() => {
    async function fetchCustomer() {
      const res = await fetch(`/api/customer/${id}`);
      const data = await res.json();
      setForm({
        name: data.name,
        dateOfBirth: data.dateOfBirth?.substring(0, 10), // format yyyy-mm-dd
        memberNumber: data.memberNumber,
        interests: data.interests.join(", ")
      });
    }
    fetchCustomer();
  }, [id]);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/customer/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        memberNumber: parseInt(form.memberNumber),
        interests: form.interests.split(",").map((s) => s.trim())
      }),
    });
    router.push("/customer");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Customer</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          name="memberNumber"
          value={form.memberNumber}
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          name="interests"
          value={form.interests}
          onChange={handleChange}
          required
        />
        <br /><br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
