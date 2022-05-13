import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import TagList from "../components/tags/TagList";
import SectionList from "../components/sections/SectionList";
import {Client, SectionVm} from "../api/api";
import SearchFieldCont from "../components/fields/SearchFieldCont";
import CreateFieldCont from "../components/fields/CreateFieldCont";

const CreateSectionText = styled.div`
    display: grid;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    height: 70vh;
`

const apiClient = new Client('https://localhost:5001');

const CreateSection: React.FunctionComponent = () => {
    const [sections, setSections] = useState<SectionVm[] | undefined>(undefined);
    async function createSection(text: string) {
        await apiClient.createSection(text);
        const sectionVms = await apiClient.getAllSections();
        setSections(sectionVms);
    }
    async function searchSection(text: string) {
        const sections = await apiClient.getSectionsByName(text);
        setSections(sections);
    }

    useEffect(() => {
        setTimeout(async () => {
            const sections = await apiClient.getAllSections();
            setSections(sections);
        }, 100);
    }, []);

    return (
        <CreateSectionText>
            <SearchFieldCont searchPlaceholder={'Search section'} searchText={searchSection}/>
            <CreateFieldCont createPlaceholder={'Create section'} createText={createSection}/>
            <SectionList sections={sections!} callbackSectionClicked={() => {}}/>
        </CreateSectionText>
    )
}

export default CreateSection;