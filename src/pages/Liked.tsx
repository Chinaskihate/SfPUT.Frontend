import React from 'react'
import styled from 'styled-components'
import LikedPostList from "../components/posts/LikedPostList";

const LikedText = styled.div`
  width: 40%;
  margin-left: 30%;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    height: 70vh;
`

const Liked: React.FunctionComponent = () => {
    return (
        <LikedText>
            <LikedPostList/>
        </LikedText>
    )
}

export default Liked;