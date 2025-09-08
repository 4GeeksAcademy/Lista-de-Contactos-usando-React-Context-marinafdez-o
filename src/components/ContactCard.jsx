const ContactCard = ({ contact, onDelete }) => {
  const avatarStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: "10px"
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
      <img
        src={contact.photo || "https://randomuser.me/api/portraits/women/44.jpg"}
        alt={contact.full_name}
        style={avatarStyle}
      />
      <div style={{ flex: 1 }}>
        <h3>{contact.full_name}</h3>
        <p>Email: {contact.email}</p>
        <p>Teléfono: {contact.phone}</p>
      </div>
      <button onClick={() => onDelete(contact.id)}>Eliminar</button>
    </div>
  );
};

export default ContactCard;
