"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function CustomerDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState(null);
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      const res = await fetch(`/api/customer/${id}`);
      const data = await res.json();
      setCustomer(data);
      setForm({
        name: data.name,
        dateOfBirth: data.dateOfBirth?.substring(0, 10),
        memberNumber: data.memberNumber,
        interests: data.interests.join(", "),
      });
    };
    if (id) fetchCustomer();
  }, [id]);

  if (!customer || !form) return <p>Loading...</p>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`/api/customer/${id}`, {
      method: "PUT",
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
      <h1>Customer Detail</h1>
      <form onSubmit={handleUpdate}>
        <input name="name" value={form.name} onChange={handleChange} />
        <br /><br />
        <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} />
        <br /><br />
        <input name="memberNumber" value={form.memberNumber} onChange={handleChange} />
        <br /><br />
        <input name="interests" value={form.interests} onChange={handleChange} />
        <br /><br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
