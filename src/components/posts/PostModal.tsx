import React, {FC, ReactElement, useRef, useEffect, useState} from 'react';
import {Client, CommentVm, PostVm, SectionVm, TagVm} from '../../api/api';
import {FormControl} from 'react-bootstrap';
import styled from "styled-components";
import Header from "./Header";
import PostPreviewData from "./PostPreviewData";
import UserFooter from "./UserFooter";
import Footer from "./Footer";
import TagList from "../tags/TagList";
import CommentList from "../comments/CommentList";
import {TextInput} from "react-native";
import comment from "../comments/Comment";
import {loadUsername} from "../../auth/user-service";
import RateField from "../rates/RateField";

const apiClient = new Client('https://localhost:5001');

const PostContainer = styled.div`
  display: grid;
`;

const DescriptionContainer = styled.div`
  grid-row: 1;
  grid-column: 1;
`;

const TagsContainer = styled.div`
  grid-row: 1;
  grid-column: 2;
`;

const CommentsContainer = styled.div`
  grid-row: 1 / 2;
  grid-column: 3;
`

const CreateCommentContainer = styled.div`
  grid-row: 3;
  grid-column: 3;
`;

const FooterContainer = styled.div`
  grid-row: 2;
  grid-column: 1;
`;

const RateContainer = styled.div`
  grid-column: 2;
  grid-row: 2;
`;

const PostModal: FC<IProps> = ({postVm, callbackPostCommented, refreshPosts}): ReactElement => {
    const [commentText, setCommentText] = useState<string>('');
    const [comments, setComments] = useState<CommentVm[]>(postVm!.comments!);
    function handleCommentTextChanged(text: string) {
        setCommentText(text);
    }

    async function createComment() {
        const dto = {
            postId: postVm.id,
            content: commentText
        }
        const id = await apiClient.createComment(dto);
        setComments([...comments, {
            username: await loadUsername(),
            content: commentText
        }]);
        callbackPostCommented(postVm);
    }

    async function ratePost(rate: number) {
        const dto = {
            postId: postVm.id,
            rate: rate
        }
        console.log(dto);
        await apiClient.ratePost(dto);
    }

    return (
        <PostContainer>
            <DescriptionContainer>
                <p>Description:</p>
                <p style={{borderRadius: 10, backgroundColor: "white", whiteSpace: "pre-wrap"}}>{postVm.info?.description}</p>
                <a href={postVm.info?.sellerLink}>Shop</a>
            </DescriptionContainer>
            <TagsContainer>
                <TagList tagsVms={postVm.tags!} callbackTagClicked={() => {}}/>
            </TagsContainer>
            <CommentsContainer>
                <p>Comments</p>
                <CommentList commentVms={comments}/>
            </CommentsContainer>
            <FooterContainer>
                <Footer postVm={postVm} refreshPosts={refreshPosts}/>
            </FooterContainer>
            <RateContainer>
                <RateField callbackPostRated={ratePost}/>
            </RateContainer>
            <CreateCommentContainer>
                <TextInput placeholder={'Comment'} multiline={true}
                           style={{
                               margin: 10,
                               borderRadius: 10,
                               backgroundColor: "#fff",
                               height: 100
                           }} value={commentText}
                           onChangeText={handleCommentTextChanged}/>
                <button style={{verticalAlign: "top"}} onClick={createComment}>Create comment</button>
            </CreateCommentContainer>
        </PostContainer>
    );
};

interface IProps {
    postVm: PostVm,
    callbackPostCommented: (post: PostVm) => void;
    refreshPosts: () => void;
}

export default PostModal;