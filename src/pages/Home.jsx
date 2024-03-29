import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../components/PageTitle/PageTitle";
import { fetchContacts } from "../redux/contacts/operations";
import { selectError, selectLoading } from "../redux/contacts/slice";
import { useEffect } from "react";
import ContactForm from "../components/ContactForm/ContactForm";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
import SearchBox from "../components/SearchBox/SearchBox";
import ContactList from "../components/ContactList/ContactList";
import { Toaster } from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
       <PageTitle>
    
    <ContactForm />
    {error && <Error></Error>}
  {loading && <Loader>Loading message</Loader>}
    <SearchBox />
    <ContactList />
    <Toaster />
    </PageTitle>
  </div>
  );
}

export default Home;


 
