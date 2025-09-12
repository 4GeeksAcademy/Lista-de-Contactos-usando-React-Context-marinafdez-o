import React, { useEffect, useState } from "react";

const AGENDA = "marina";
const BASE = "https://playground.4geeks.com/contact";

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [error, setError] = useState("");

  // Cargar contactos desde el servidor
  const fetchContacts = async () => {
    setError("");
    try {
      const res = await fetch(`${BASE}/agendas/${AGENDA}`);
      const data = await res.json();
      setContacts(Array.isArray(data.contacts) ? data.contacts : []);
    } catch {
      setError("Error al cargar contactos");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Guardar contacto
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.full_name || !form.email || !form.phone || !form.address) {
      setError("Completa todos los campos");
      return;
    }

    const body = {
      name: form.full_name.trim(), // 👈 la API espera "name"
      phone: form.phone.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      agenda_slug: AGENDA
    };

    try {
      const res = await fetch(`${BASE}/agendas/${AGENDA}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        setForm({ full_name: "", email: "", phone: "", address: "" });
        fetchContacts();
      } else {
        const errData = await res.json();
        setError(errData.detail || "Error al guardar");
      }
    } catch {
      setError("Error de red al guardar");
    }
  };

  // Eliminar contacto
  const handleDelete = async (id) => {
    setError("");
    try {
      const res = await fetch(`${BASE}/agendas/${AGENDA}/contacts/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchContacts();
      } else {
        setError("Error al eliminar");
      }
    } catch {
      setError("Error de red al eliminar");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h1>Contactos</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        <input
          type="text"
          placeholder="Nombre completo"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Dirección"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
        />
        <button type="submit">Guardar</button>
      </form>

      <hr />

      {contacts.length === 0 ? (
        <p>No hay contactos</p>
      ) : (
        contacts.map((c) => (
          <div
            key={c.id}
            style={{
              background: "#fff",
              padding: 10,
              marginBottom: 8,
              border: "1px solid #ccc",
              borderRadius: 4
            }}
          >
            <p><strong>{c.name}</strong></p>
            <p>{c.email}</p>
            <p>{c.phone}</p>
            <p>{c.address}</p>
            <button onClick={() => handleDelete(c.id)}>Eliminar</button>
          </div>
        ))
      )}
    </div>
  );
}
