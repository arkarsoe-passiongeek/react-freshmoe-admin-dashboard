"use client";

import { useEffect, useState } from "react";
import { Card } from "../ui/card";

interface CCardProps {
    children: React.ReactNode;
    className: string
}


const CCard: React.FC<CCardProps> = ({ children, className, ...rest }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Card {...rest} className={`p-[30px] ${className}`}>
            {children}
        </Card>
    );
}

export default CCard;