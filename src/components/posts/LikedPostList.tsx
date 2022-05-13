import React, { FC, ReactElement, useRef, useEffect, useState } from 'react';
import {Client, PostVm, SectionVm, TagVm} from '../../api/api';
import { FormControl } from 'react-bootstrap';
import Post from "./Post";
import {useModal} from "../../hooks/useModal";
import {Modal} from "../../hoc/modal";
import PostModal from "./PostModal";

const apiClient = new Client('https://localhost:5001');

const LikedPostList: FC<{}> = (): ReactElement => {
    let textInput = useRef(null);
    const {isShown, toggle}= useModal();
    const [pressedPost, setPressedPost] = useState<PostVm>();
    const [sections, setPosts] = useState<PostVm[] | undefined>(undefined);

    async function getLikedPosts() {
        const postList = await apiClient.getLikedPosts();
        setPosts(postList);
    }

    useEffect(() => {
        setTimeout(getLikedPosts, 500);
    }, []);

    function postClicked(postVm: PostVm) {
        setPressedPost(postVm)
        toggle()
    }

    return (
        <div>
            Posts
            <section>
                {sections?.map((vm) => (
                    <Post postVm={vm} refreshPosts={getLikedPosts} callbackPostClicked={postClicked}/>
                ))}
            </section>
            <Modal isShown={isShown}
                   hide={toggle}
                    modalContent={<PostModal refreshPosts={getLikedPosts} postVm={pressedPost!}
                                             callbackPostCommented={getLikedPosts}/>}
                    headerText={pressedPost ? pressedPost!.info?.title! + " | " + pressedPost!.section!.name : ''}/>
        </div>
    );
};

export default LikedPostList;