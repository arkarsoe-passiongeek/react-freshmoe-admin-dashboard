
import { createContext, useState } from 'react';
import { IntlProvider, FormattedMessage, FormattedNumber } from 'react-intl'
import { Outlet, useParams } from 'react-router';

export const LanguageContext = createContext({})

const LanguageHandler = ({ children }: any) => {
    let { lang } = useParams();
    const [language, setLanguage] = useState('en')
    console.log(lang)

    const messagesInFrench = {
        myMessage: "Aujourd'hui, nous sommes le {ts, date, ::yyyyMMdd}",
        myDashboard: 'dash'
    }

    const messagesInEn = {
        myMessage: 'testing',
        myDashboard: 'dash2'
    }

    const currentLang = () => {
        return language
    }

    return (
        <div>
            <LanguageContext.Provider value={{ language, setLanguage }}>
                <IntlProvider messages={currentLang() === 'en' ? messagesInEn : messagesInFrench} locale={language} defaultLocale="en">
                    {/* <p>
                    <FormattedMessage
                        id="myMessage"
                        defaultMessage="Today is {ts, date, ::yyyyMMdd}"
                        values={{ ts: Date.now() }}
                    />
                    <br />
                    <FormattedNumber value={19} style="currency" currency="EUR" />
                </p> */}
                    <div className='bg-c-bg'>
                        <Outlet />
                    </div>
                </IntlProvider>
            </LanguageContext.Provider>
        </div>
    )
}

export default LanguageHandler