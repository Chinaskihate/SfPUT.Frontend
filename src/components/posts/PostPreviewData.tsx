import React, {FC, ReactElement, useRef, useEffect, useState} from 'react';
import {Client, PostVm, SectionVm, TagVm} from '../../api/api';
import styled from "styled-components";
import Header from "./Header";
import TagList from "../tags/TagList";
import PostTagList from "../tags/PostTagList";

const apiClient = new Client('https://localhost:5001');

const PreviewContainer = styled.div`
  border-radius: 20px;
  background: #79B6E2;
  display: flex;
  justify-content: center;
  height: 80%;
`;

interface IProps {
    id: string | undefined;
    tags: TagVm[] | undefined;
}

const PhotoContainer = styled.div`
  width: 60%;
  background: transparent;
`;

const TagsContainer = styled.div`
  width: 40%;
`;

const PostPreviewData: FC<IProps> = ({id, tags}): ReactElement => {
    const [text, setText] = useState<string | undefined>(undefined);

    async function getImage() {
        const temp = await apiClient.downloadPhoto(id);
        setText("downloaded");
    }

    useEffect(() => {
        setTimeout(getImage, 500);
    }, []);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.currentTarget.value = '';
            setTimeout(getImage, 500);
        }
        if (event.key === 'Alt') {

        }
    };
    return (
        <PreviewContainer>
            <PhotoContainer>
                <p>{text}</p>
            </PhotoContainer>
            <TagsContainer>
                <PostTagList tags={tags} callbackTagClicked={() => {}}/>
            </TagsContainer>
        </PreviewContainer>
    );
};

export default PostPreviewData;