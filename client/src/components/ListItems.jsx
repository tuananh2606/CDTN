import styled from 'styled-components';

const ListItems = () => {
    return (
        <Wrapper>
            <Title>News</Title>
            <ul>
                <li>Tops</li>
                <li>Iconic Shoes</li>
            </ul>
        </Wrapper>
    );
};

export default ListItems;

const Wrapper = styled.div`
    width: 50%;
    ul {
        padding: 0;
        gap: 20px;
        list-style-type: none;
    }
`;
const Title = styled.h2`
    margin: 0;
`;
const ListItem = styled.li`
    margin: 1rem 0;
`;
