import React, { useEffect, useState } from "react";
import user from "../firebase/services/user";
import AuthProvider from "../services/AuthProvider";

const User  = () => {
    const { authValues } = React.useContext(AuthProvider);
    const [dataUser, setDataUser] = useState<any>([]);
    useEffect(() => {
        const getlistCenter = async () => {
            await user.getUser(authValues.user.uid).onSnapshot((querySnapshot =>{
                setDataUser({ id: querySnapshot.id, ...querySnapshot.data() });
            }));

        };
        getlistCenter();
    }, []);

    return [dataUser];
};

export default User;

