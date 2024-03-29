import { selectNameFilter } from "../../redux/filtersSlice";
import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";
import Contact from "../Contact/Contact";
import css from "../ContactList/ContactList.module.css";
import { selectContacts } from "../../redux/contactsSlice";

const ContactList = () => {
const nameFilter = useSelector(selectNameFilter);
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

const filteredContacts = contacts.filter(contact =>
  contact.name.toLowerCase().includes(nameFilter.toLowerCase())
  );
  
  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <ul>
      {filteredContacts.map((contact) => {
        return (
          <li className={css.item} key={contact.id}>
            <Contact name={contact.name} number={contact.number} id={contact.id} onDelete={() => handleDeleteContact(contact.id)}/>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;



