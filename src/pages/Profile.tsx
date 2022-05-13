import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Simulate} from "react-dom/test-utils";
import {loadUsername} from "../auth/user-service";
import {Client} from "../api/api";

const apiClient = new Client('https://localhost:5001');

const ProfileText = styled.div`
    display: grid;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    height: 70vh;
`

const Profile: React.FunctionComponent = () => {
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [rating, setRating] = useState<number | undefined>(undefined);
    useEffect(() => {
        setTimeout(async () => {
            const loadedUsername = await loadUsername();
            const loadedRating = await apiClient.getUserRating();
            console.log(loadedRating);
            console.log(loadedUsername)
            if (!loadedRating) {
                setRating(loadedRating)
            } else {
                setRating(Number(loadedRating.toFixed(2)));
            }
            setUsername(loadedUsername);
        }, 100);
    }, []);

    return (
        <ProfileText>
            <p>{username}</p>
            <p>{rating}</p>
        </ProfileText>
    )
}

export default Profile;