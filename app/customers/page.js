"use client";
import { useState, useEffect } from "react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("/api/customers")
      .then(res => res.json())
      .then(setCustomers);
  }, []);

  return (
    <div>
      <h1>Customers</h1>
      <ul>
        {customers.map(c => (
          <li key={c._id}>
            {c.name} - {c.memberNumber}
          </li>
        ))}
      </ul>
    </div>
  );
}
