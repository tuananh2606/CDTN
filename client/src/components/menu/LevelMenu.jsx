import { FiArrowLeft } from 'react-icons/fi';
import styled from 'styled-components';

const LevelMenu = ({ title, onBack }) => {
    return (
        <Wrapper>
            <FiArrowLeft onClick={onBack} size={24} className="back-icon" />
            <span>{title}</span>
        </Wrapper>
    );
};

export default LevelMenu;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0 var(--header-padding-x);
    .back-icon {
        cursor: pointer;
    }
    span {
        margin-left: 2rem;
        font-size: 24px;
    }
`;
