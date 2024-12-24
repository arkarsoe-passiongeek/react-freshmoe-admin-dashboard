import React from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router"

const usePathname = () => {
    const { locale } = useIntl()
    const { pathname } = useLocation()

    return React.useMemo(() => {
        const cleanPathname = pathname.replace(`/${locale}`, '');
        return cleanPathname;
    }, [pathname, locale]);
}

export default usePathname