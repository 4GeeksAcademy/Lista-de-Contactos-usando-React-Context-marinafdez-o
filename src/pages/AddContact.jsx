import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store";

const AddContact = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    agenda_slug: "marina"
  });

  const { dispatch } = useContext(Context);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://playground.4geeks.com/apis/fake/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const newContact = await res.json();
      dispatch({ type: "ADD_CONTACT", payload: newContact });
      navigate("/");
    } catch (error) {
      console.error("Error al guardar el contacto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Agregar nuevo contacto</h2>

      <input
        type="text"
        name="full_name"
        placeholder="Nombre completo"
        value={form.full_name}
        onChange={handleChange}
        required
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        required
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      <input
        type="tel"
        name="phone"
        placeholder="Teléfono"
        value={form.phone}
        onChange={handleChange}
        required
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      <button type="submit" style={{ padding: "10px 20px" }}>
        Guardar
      </button>
    </form>
  );
};

export default AddContact;
