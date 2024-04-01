
import PageTitle from "../components/PageTitle/PageTitle";
import ContactList from "../components/ContactList/ContactList";
import { Toaster } from "react-hot-toast";

const Home = () => {
  
  return (
    <div>
       <PageTitle>
    
    
    <ContactList />
    <Toaster />
    </PageTitle>
  </div>
  );
}

export default Home;


 
