import React, { FC, ReactElement, useRef, useEffect, useState } from 'react';
import {Client, PostVm, SectionVm, TagVm} from '../../api/api';
import { FormControl } from 'react-bootstrap';

const apiClient = new Client('https://localhost:5001');

const RatedPostList: FC<{}> = (): ReactElement => {
    let textInput = useRef(null);
    const [posts, setPosts] = useState<PostVm[] | undefined>(undefined);

    async function getRatedPosts() {
        const postList = await apiClient.getRatedPosts();
        setPosts(postList);
    }

    useEffect(() => {
        setTimeout(getRatedPosts, 500);
    }, []);

    return (
        <div>
            Rated
            <section>
                {posts?.map((vm) => (
                    <div key={vm.id}>
                        {vm.info?.title}
                    </div>
                ))}
            </section>
        </div>
    );
};

export default RatedPostList;