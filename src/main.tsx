import App from '@/app';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { enableMocking } from './testing/mocks';

const rootElement = document.getElementById('root')!;
if (!rootElement) throw new Error('No root element found');

enableMocking().then(() => {
   const root = ReactDOM.createRoot(rootElement);
   root.render(
      <StrictMode>
         <App />
      </StrictMode>,
   );
});
