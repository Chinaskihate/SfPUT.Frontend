import React, {FC, ReactElement, useRef, useEffect, useState} from 'react';
import {Client, PostVm, SectionVm, TagVm} from '../../api/api';
import {FormControl} from 'react-bootstrap';
import styled from "styled-components";
import Header from "./Header";
import PostPreviewData from "./PostPreviewData";
import UserFooter from "./UserFooter";
import Footer from "./Footer";

const apiClient = new Client('https://localhost:5001');

const PostContainer = styled.div`
  border-radius: 20px;
  background: #79B6E2;
  margin: 10px;
`;

interface IProps {
    postVm: PostVm,
    callbackPostClicked: (post: PostVm) => void;
    refreshPosts: () => void;
}

const Post: FC<IProps> = ({postVm, callbackPostClicked, refreshPosts}): ReactElement => {
    return (
        <PostContainer key={postVm.id} onClick={(event: any) => {
            callbackPostClicked(postVm);
        }}>
            <Header title={postVm.info?.title} sectionName={postVm.section?.name}/>
            <PostPreviewData id={postVm.id} tags={postVm.tags}/>
            <Footer postVm={postVm} refreshPosts={refreshPosts}/>
        </PostContainer>
    );
};

export default Post;