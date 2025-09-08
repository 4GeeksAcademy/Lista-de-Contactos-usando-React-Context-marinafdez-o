import { useContext, useEffect } from "react";
import { Context } from "../store";
import ContactCard from "../components/ContactCard";
import { Link } from "react-router-dom";

const Contact = () => {
  const { store, dispatch } = useContext(Context);

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
        method: "DELETE"
      });
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/marina");
      const data = await res.json();

      if (Array.isArray(data)) {
        dispatch({ type: "SET_CONTACTS", payload: data });
      } else {
        console.warn("La respuesta no contiene una lista de contactos:", data);
      }
    } catch (error) {
      console.error("Error al cargar contactos:", error);
    }
  };

  return (
    <div>
      <h1>Lista de Contactos</h1>

      <Link to="/add">
        <button>➕ Agregar nuevo contacto</button>
      </Link>

      <div>
        {store.contacts.length === 0 ? (
          <p>No hay contactos disponibles.</p>
        ) : (
          store.contacts.map((contact, index) => (
            <ContactCard
              key={contact.id || contact.email || index}
              contact={contact}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Contact;
