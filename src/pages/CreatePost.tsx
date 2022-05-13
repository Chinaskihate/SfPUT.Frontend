import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {TextInput} from "react-native";
import PostTagList from "../components/tags/PostTagList";
import {Client, SectionVm, TagVm} from "../api/api";
import SearchFieldCont from "../components/fields/SearchFieldCont";
import CreateFieldCont from "../components/fields/CreateFieldCont";
import section from "../components/sections/Section";
import SectionList from "../components/sections/SectionList";

const apiClient = new Client('https://localhost:5001');

const CreatePostText = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 10px;
  justify-content: center;
  font-size: 50px;
  width: 70%;
  height: 30%;
  margin-left: 20%;
  background-color: #38bdd4;
`

const TitleInputCont = styled.div`
  grid-row: 1;
  grid-column: 1;
  border-radius: 10px;
`;

const SellerLinkInputCont = styled.div`
  grid-column: 2;
  grid-row: 1;
`;

const SelectedTagsCont = styled.div`
  grid-row: 3 / 4;
  grid-column: 1;
`;

const SelectedSectionCont = styled.div`
  grid-column: 3;
  grid-row: 3/4;
`;

const UnselectedTagCont = styled.div`
  grid-row: 3 / 4;
  grid-column: 2;
`;

const DescrCont = styled.div`
  grid-row: 1;
  grid-column: 3;
`;

const ButtonCont = styled.button`
  grid-row: 1;
  grid-column: 4;
  border-radius: 10px;
`;

const SelectedTagsTitle = styled.p`
  grid-row: 2;
  grid-column: 1;
`;

const TagsTitle = styled.p`
  grid-row: 2;
  grid-column: 2;
`;

const SelectedSectionTitle = styled.p`
  grid-row: 2;
  grid-column: 3;
`;

const SectionsTitle = styled.p`
  grid-row: 2;
  grid-column: 4;
`;

const SectionCont = styled.div`
  grid-row: 3 / 4;
  grid-column: 4;
`;

const CreatePost: React.FunctionComponent = () => {
    const [title, setTitle] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<TagVm[]>([]);
    const [searchedTags, setSearchedTags] = useState<TagVm[]>([]);
    const [selectedSections, setSelectedSections] = useState<SectionVm[]>();
    const [searchedSections, setSearchedSections] = useState<SectionVm[]>();

    function addTag(tag: TagVm) {
        if (!selectedTags.some((t) => t.id == tag.id)) {
            setSelectedTags([...selectedTags, tag]);
        }
    }

    function removeTag(tag: TagVm) {
        setSelectedTags(selectedTags.filter(t => t.id != tag.id))
    }

    async function searchTag(searchText: string) {
        const tagsList = await apiClient.getByName(searchText);
        setSearchedTags(tagsList);
    };

    async function searchSection(searchText: string) {
        const sectionList = await apiClient.getSectionsByName(searchText);
        setSearchedSections(sectionList);
    }

    function addSection(section: SectionVm) {
        setSelectedSections([section]);
    }

    function removeSection(section: SectionVm) {
        setSelectedSections([]);
    }

    async function createPost() {
        const dto = {
            sectionId: (selectedSections!)[0].id,
            title: title,
            description: description,
            sellerLink: link,
            tagsIds: selectedTags.map(t => t.id!)
        };
        await apiClient.createPost(dto);
        setTitle('');
        setLink('');
        setDescription('');
        setSelectedSections([]);
        setSelectedTags([]);
        setSearchedSections([]);
        setSearchedTags([]);
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }

    const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLink(event.currentTarget.value);
    }

    const handleDescriptionChange = (text: string) => {
        setDescription(text);
    }

    return (
        <CreatePostText>
            <TitleInputCont>
                <input placeholder={'Title'} value={title} onChange={handleTitleChange}/>
            </TitleInputCont>
            <SellerLinkInputCont>
                <input placeholder={'Seller link'} value={link} onChange={handleLinkChange}/>
            </SellerLinkInputCont>
            <DescrCont>
                <TextInput style={{
                    margin: 10,
                    borderRadius: 10,
                    backgroundColor: "#fff",
                    height: 200,
                    textAlign: "center"
                }} placeholder={'Description'}
                           multiline={true}
                           value={description}
                           onChangeText={handleDescriptionChange}/>
            </DescrCont>
            <SelectedTagsTitle>Selected tags</SelectedTagsTitle>
            <SelectedTagsCont>
                <PostTagList tags={selectedTags} callbackTagClicked={removeTag}/>
            </SelectedTagsCont>
            <TagsTitle>Tags</TagsTitle>
            <UnselectedTagCont>
                <SearchFieldCont searchPlaceholder={'Search tag'} searchText={searchTag}/>
                <PostTagList tags={searchedTags} callbackTagClicked={addTag}/>
            </UnselectedTagCont>
            <SelectedSectionTitle>Selected Section</SelectedSectionTitle>
            <SelectedSectionCont>
                <SectionList sections={selectedSections!} callbackSectionClicked={removeSection}/>
            </SelectedSectionCont>
            <SectionsTitle>Sections</SectionsTitle>
            <SectionCont>
                <SearchFieldCont searchPlaceholder={'Search section'} searchText={searchSection}/>
                <SectionList sections={searchedSections!} callbackSectionClicked={addSection}/>
            </SectionCont>
            <ButtonCont onClick={createPost}>Create post</ButtonCont>
        </CreatePostText>
    )
}

export default CreatePost;