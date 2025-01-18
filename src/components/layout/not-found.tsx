import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const NotFound = () => {
   const navigate = useNavigate();
   useEffect(() => {
      navigate('/en');
   }, []);
   return <div>NotFound</div>;
};

export default NotFound;
