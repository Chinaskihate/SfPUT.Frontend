import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import TagList from "../components/tags/TagList";
import {Client, TagVm} from "../api/api";
import SearchFieldCont from "../components/fields/SearchFieldCont";
import CreateFieldCont from "../components/fields/CreateFieldCont";

const apiClient = new Client('https://localhost:5001');

const CreateTagText = styled.div`
    display: grid;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    height: 70vh;
`

const CreateTag: React.FunctionComponent = () => {
    const [tags, setTags] = useState<TagVm[] | undefined>(undefined);

    async function createTag(createText: string) {
        await apiClient.createTag(createText);
        const tagsList = await apiClient.getAll();
        setTags(tagsList);
    };

    async function searchTag(searchText: string) {
        const tagsList = await apiClient.getByName(searchText);
        setTags(tagsList);
    };

    useEffect(() => {
        setTimeout(async () => {
            const tagsList = await apiClient.getAll();
            console.log(tagsList)
            setTags(tagsList);
        }, 100);
    }, []);

    return (
        <CreateTagText>
            <SearchFieldCont searchPlaceholder={'Search tag'} searchText={searchTag}/>
            <CreateFieldCont createPlaceholder={'Create tag'} createText={createTag}/>
            <TagList tagsVms={tags!} callbackTagClicked={() => {}}/>
        </CreateTagText>
    )
}

export default CreateTag;