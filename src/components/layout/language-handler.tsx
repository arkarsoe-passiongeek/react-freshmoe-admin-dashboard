import { LOCALES } from '@/lib/constants';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { Outlet, useNavigate, useParams } from 'react-router';

interface LanguageContextProps {
   language: string;
   setLanguage: (state: string) => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
   language: 'en',
   setLanguage: state => state,
});

const LanguageHandler: React.FC = () => {
   const { lang } = useParams<{ lang: string }>();
   const [language, setLanguage] = useState<string>('en');
   const navigate = useNavigate();

   const messagesInFrench = {
      myMessage: "Aujourd'hui, nous sommes le {ts, date, ::yyyyMMdd}",
      myDashboard: 'dash',
   };

   const messagesInEn = {
      myMessage: 'testing',
      myDashboard: 'dash2',
   };

   const currentLang = () => {
      return language;
   };

   useEffect(() => {
      if (!lang || !LOCALES.includes(lang)) {
         navigate('/en');
      } else {
         setLanguage(lang);
      }
   }, [lang, navigate]);

   const getLanguageProviderValue = useMemo(() => {
      return { language, setLanguage };
   }, [language]);

   return (
      <div>
         <LanguageContext.Provider value={getLanguageProviderValue}>
            <IntlProvider
               messages={
                  currentLang() === 'en' ? messagesInEn : messagesInFrench
               }
               locale={language}
               defaultLocale='en'>
               <div className='bg-c-bg'>
                  <Outlet />
               </div>
            </IntlProvider>
         </LanguageContext.Provider>
      </div>
   );
};

export default LanguageHandler;
