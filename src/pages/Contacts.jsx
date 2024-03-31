import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../components/PageTitle/PageTitle";
import { fetchContacts } from "../redux/contacts/operations";
import ContactList from "../components/ContactList/ContactList";
import ContactEditor from "../components/ContactEditor/ContactEditor";
import { selectLoading } from "../redux/contacts/selectors";


const Contacts = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <PageTitle>Your tasks</PageTitle>
      <ContactEditor />
      <div>{isLoading && "Request in progress..."}</div>
      <ContactList />
    </>
  );
}

export default Contacts;