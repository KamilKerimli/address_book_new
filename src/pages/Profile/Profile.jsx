import React, { useState } from 'react'

import EditCom from "../../components/ProfileComponents/EditCom/EditCom";
import Privacy from "../../components/ProfileComponents/PrivacyCom/PrivacyCom";
import Notifications from "../../components/ProfileComponents/NotificationsCom/NotificationsCom";
import Favorites from "../../components/ProfileComponents/FavoritesCom/FavoritesCom";

const Profile = () => {
    const [state] = useState(localStorage.getItem("prType"));
    const publicRoutes = [
        { value: 'default', element: <EditCom /> } ,
        { value: null, element: <EditCom /> } ,
        { value: 'privacy', element: <Privacy /> },
        { value: 'notification', element: <Notifications /> },
        { value: 'favorites', element: <Favorites /> },
      ];

    return (
        <div>
            {publicRoutes.map((route, index) => 
                (route.value === state || (route.value === 'default' && !state)) && (
                <div key={index}>
                    {route.element}
                </div>
                )
            )
            }
        </div>
    )
}

export default Profile