import styled from 'styled-components';

export const HeadPage = styled.div`
    position: relative;
`;

export const UserIndetity = styled.div`
    display: flex;
    width: 200px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -100px;
    transform: translateY(55%);
`;

export const UserFrame = styled.div`
    width: 6.25rem;
    height: 6.25rem;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 101;
    span {
        font-size: 28px;
    }
`;
export const Name = styled.span`
    margin-top: 1rem;
`;

export const BoxContainer = styled.div`
    box-sizing: border-box;
    padding-left: 6.4vw;
    padding-right: 6.4vw;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin-top: 100px;

    @media only screen and (min-width: 768px) {
        padding-left: 3.125vw;
        padding-right: 3.125vw;
    }
    .wp-push {
        width: 100%;
        @media only screen and (min-width: 768px) {
            width: 50%;
            flex: 1;
            &:last-child {
                margin-left: 1rem;
            }
        }
        section {
            margin-bottom: 1rem;
        }
    }
`;
