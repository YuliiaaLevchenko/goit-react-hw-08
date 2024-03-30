
import PageTitle from "../components/PageTitle/PageTitle";

import ContactForm from "../components/ContactForm/ContactForm";

import SearchBox from "../components/SearchBox/SearchBox";
import ContactList from "../components/ContactList/ContactList";
import { Toaster } from "react-hot-toast";

const Home = () => {
  
  return (
    <div>
       <PageTitle>
    
    <ContactForm />
    
    <SearchBox />
    <ContactList />
    <Toaster />
    </PageTitle>
  </div>
  );
}

export default Home;


 
