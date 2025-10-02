"use client";

import { useEffect, useState } from "react";

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    const res = await fetch("/api/customer");
    const data = await res.json();
    setCustomers(data);
    setLoading(false);
  };

  const deleteCustomer = async (id) => {
    await fetch(`/api/customer/${id}`, { method: "DELETE" });
    fetchCustomers();
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Customer List</h1>
      <a href="/customer/new" style={{ marginBottom: "20px", display: "inline-block" }}>
        ➕ Add New Customer
      </a>
      <ul>
        {customers.map((c) => (
          <li key={c._id}>
            <a href={`/customer/${c._id}`}>
              {c.name} (Member #{c.memberNumber})
            </a>
            {" "}
            <button onClick={() => deleteCustomer(c._id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
