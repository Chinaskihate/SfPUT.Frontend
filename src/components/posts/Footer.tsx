import React, { FC, ReactElement, useRef, useEffect, useState } from 'react';
import {Client, PostVm, SectionVm, TagVm} from '../../api/api';
import { FormControl } from 'react-bootstrap';
import styled from "styled-components";
import Header from "./Header";
import PostPreviewData from "./PostPreviewData";

const apiClient = new Client('https://localhost:5001');

const FooterContainer = styled.div`
  display: flex;
`;

const LikeContainer = styled.div`
  width: 50%;
`;

const RateContainer = styled.div`
  width: 50%;
`;

interface IProps {
    postVm: PostVm;
    refreshPosts: () => void;
}

const Footer: FC<IProps> = ({postVm, refreshPosts}): ReactElement => {
    const [isLiked, setLiked] = useState<boolean>(true);

    async function likePost() {
        setLiked(!isLiked)
        const tagsList = await apiClient.likePost({postId: postVm.id, isLiked: !isLiked});
        refreshPosts();
    }

    async function handleClick(event: React.MouseEvent) {
        if (event.button == 0) {
            await likePost();
        }
    }

    return (
        <FooterContainer>
            <LikeContainer>
                <button className="button" style={{
                    background: isLiked ? "darkred" : "white"
                }} onClick={handleClick}>{isLiked ? "true" : "false"}</button>
            </LikeContainer>
            <RateContainer>{Number(postVm.rate?.toFixed(2))}</RateContainer>
        </FooterContainer>
    );
};

export default Footer;