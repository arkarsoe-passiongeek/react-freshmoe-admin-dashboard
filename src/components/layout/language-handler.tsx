import React, { createContext, useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { Outlet, useParams } from 'react-router';

export interface LanguageContextType {
   language: string;
   setLanguage: (lang: string) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
   undefined
);

const LanguageHandler: React.FC = () => {
   const { lang } = useParams<{ lang?: string }>();
   const [language, setLanguage] = useState<string>(lang ?? 'en');

   const messagesInFrench = {
      myMessage: 'nous  le {ts, date, ::yyyyMMdd}',
      myDashboard: 'dash',
   };

   const messagesInEn = {
      myMessage: 'testing',
      myDashboard: 'dash2',
   };

   const currentMessages = language === 'en' ? messagesInEn : messagesInFrench;

   const languageValues = useMemo(() => ({ language, setLanguage }), [lang]);

   return (
      <div>
         <LanguageContext.Provider value={languageValues}>
            <IntlProvider
               messages={currentMessages}
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
