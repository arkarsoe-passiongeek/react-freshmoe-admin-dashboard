
import { IntlProvider, FormattedMessage, FormattedNumber } from 'react-intl'
import { Outlet, useParams } from 'react-router';
const LanguageHandler = ({ children }: any) => {
    let { lang } = useParams();
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
        return lang
    }

    return (
        <div>
            <IntlProvider messages={currentLang() === 'en' ? messagesInEn : messagesInFrench} locale="fr" defaultLocale="en">
                {/* <p>
                    <FormattedMessage
                        id="myMessage"
                        defaultMessage="Today is {ts, date, ::yyyyMMdd}"
                        values={{ ts: Date.now() }}
                    />
                    <br />
                    <FormattedNumber value={19} style="currency" currency="EUR" />
                </p> */}
                <Outlet />
            </IntlProvider>
        </div>
    )
}

export default LanguageHandler