import React, {useState} from 'react'
import styled from 'styled-components'
import UserPostList from "../components/posts/UserPostList";
import {useModal} from "../hooks/useModal";
import {PostVm} from "../api/api";

const PublishedText = styled.div`
    //display: flex;
    width: 40%;
  margin-left: 30%;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    height: 70vh;
`

const Published: React.FunctionComponent = () => {
    return (
        <PublishedText>
            <UserPostList/>
        </PublishedText>
    )
}

export default Published;