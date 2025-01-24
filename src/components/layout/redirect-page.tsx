import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const RedirectPage = () => {
   const navigate = useNavigate();
   useEffect(() => {
      navigate('/en');
   }, []);
   return <div>RedirectPage</div>;
};

export default RedirectPage;
