import React, { FC, ReactElement, useRef, useEffect, useState } from 'react';
import {Client, PostVm, SectionVm, TagVm} from '../../api/api';
import { FormControl } from 'react-bootstrap';
import UserPost from "./UserPost";
import PostModal from "./PostModal";
import {Modal} from "../../hoc/modal";
import {useModal} from "../../hooks/useModal";

const apiClient = new Client('https://localhost:5001');

const UserPostList: FC<{}> = (): ReactElement => {
    const {isShown, toggle}= useModal();
    const [pressedPost, setPressedPost] = useState<PostVm>();

    function postClicked(postVm: PostVm) {
        setPressedPost(postVm)
        toggle()
    }

    let textInput = useRef(null);
    const [posts, setPosts] = useState<PostVm[] | undefined>(undefined);

    async function getUserPosts() {
        const postList = await apiClient.getUserPosts();
        setPosts(postList);
    }

    useEffect(() => {
        setTimeout(getUserPosts, 500);
    }, []);

    return (
        <div>
            Published
            <section>
                {posts?.map((vm) => (
                    <UserPost postVm={vm} callbackPostClicked={postClicked}/>
                ))}
            </section>
            <Modal isShown={isShown}
                   hide={toggle}
                   modalContent={<PostModal refreshPosts={() => {}} postVm={pressedPost!}
                                            callbackPostCommented={() => {}}/>}
                   headerText={pressedPost ? pressedPost!.info?.title! + " | " + pressedPost!.section!.name : ''}/>
        </div>
    );
};

export default UserPostList;