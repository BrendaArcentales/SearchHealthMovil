import React, { useEffect, useState } from "react";
import user from "./services/user";
import AuthProvider from "../services/AuthProvider";


const User  = () => {
    const { authValues } = React.useContext(AuthProvider);
    const [dataUser, setDataUser] = useState<any>([]);
    useEffect(() => {
        const getlistCenter = async () => {
            const res = await user.getUserInfo(authValues.user.uid).get();
            setDataUser({ id: res.id, ...res.data() });
        };
        getlistCenter();
    }, []);

    return [dataUser];
};

export default User;

