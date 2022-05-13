import React, {useState} from 'react'
import styled from 'styled-components'
import {Client, PostVm, SectionVm, TagVm} from "../api/api";
import PostTagList from "../components/tags/PostTagList";
import SearchFieldCont from "../components/fields/SearchFieldCont";
import SectionList from "../components/sections/SectionList";
import PostList from "../components/posts/PostList";
import {useModal} from "../hooks/useModal";
import PostModal from "../components/posts/PostModal";
import {Modal} from "../hoc/modal";

const apiClient = new Client('https://localhost:5001');

const SearchPosts = styled.div`
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

const MinRateInputCont = styled.div`
  grid-row: 1;
  grid-column: 2;
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

const DatePickerCont = styled.div`
  grid-row: 1;
  grid-column: 3;
`;

const PostsCont = styled.div`
  grid-column: 2 / 4;
`;

const Search: React.FunctionComponent = () => {
    const {isShown, toggle}= useModal();
    const [pressedPost, setPressedPost] = useState<PostVm>();
    const [title, setTitle] = useState<string>('');
    const [date, setDate] = useState<string>("2022-04-10");
    const [rate, setRate] = useState<number>(0);
    const [posts, setPosts] = useState<PostVm[]>([]);
    const [selectedTags, setSelectedTags] = useState<TagVm[]>([]);
    const [searchedTags, setSearchedTags] = useState<TagVm[]>([]);
    const [selectedSections, setSelectedSections] = useState<SectionVm[]>();
    const [searchedSections, setSearchedSections] = useState<SectionVm[]>();

    function postClicked(postVm: PostVm) {
        setPressedPost(postVm)
        toggle()
    }

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

    async function getPosts() {
        const dto = {
            sectionId: (selectedSections!)[0].id,
            title: title,
            minRate: rate,
            tagsIds: selectedTags.map(t => t.id!),
            creationTime: new Date(date)
        };
        const searchedPosts = await apiClient.getPosts(dto);
        setPosts(searchedPosts);
        setTitle('');
        setRate(0);
        setDate("2022-05-10");
        setSelectedSections([]);
        setSelectedTags([]);
        setSearchedSections([]);
        setSearchedTags([]);
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.currentTarget.value);
    }

    const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRate(Number(event.currentTarget.value));
    }

    return (
        <div>
            <SearchPosts>
                <TitleInputCont>
                    <input placeholder={'Title'} value={title} onChange={handleTitleChange}/>
                </TitleInputCont>
                <MinRateInputCont>
                    <input type="number" value={rate} onChange={handleRateChange}/>
                </MinRateInputCont>
                <DatePickerCont>
                    <input type="date" value={date} onChange={handleDateChange}/>
                </DatePickerCont>
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
                <ButtonCont onClick={getPosts}>Find Posts</ButtonCont>
                <PostsCont>
                    <PostList postVms={posts} callbackPostClicked={postClicked}/>
                </PostsCont>
                <Modal isShown={isShown}
                                   hide={toggle}
                                   modalContent={<PostModal refreshPosts={() => {}} postVm={pressedPost!}
                                                            callbackPostCommented={() => {}}/>}
                                   headerText={pressedPost ? pressedPost!.info?.title! + " | " + pressedPost!.section!.name : ''}/>
            </SearchPosts>
        </div>
    )
}

export default Search;