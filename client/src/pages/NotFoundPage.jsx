import styled from 'styled-components';

const NotFoundPage = () => {
    return (
        <Wrapper>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 ">
                        <div className="col-sm-10 col-sm-offset-1  text-center">
                            <div className="four_zero_four_bg">
                                <h1 className="text-center ">404</h1>
                            </div>

                            <div className="contant_box_404">
                                <h3 className="h2">Look like you're lost</h3>

                                <p>the page you are looking for not avaible!</p>

                                <a href="" className="link_404">
                                    Go to Home
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default NotFoundPage;

const Wrapper = styled.section`
    padding: 40px 0;
    background: #fff;
    font-family: 'Arvo', serif;
    img {
        width: 100%;
    }
    .four_zero_four_bg {
        background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
        height: 400px;
        background-position: center;
    }

    .four_zero_four_bg h1 {
        font-size: 80px;
    }

    .four_zero_four_bg h3 {
        font-size: 80px;
    }

    .link_404 {
        color: #fff !important;
        padding: 10px 20px;
        background: #39ac31;
        margin: 20px 0;
        display: inline-block;
    }
    .contant_box_404 {
        margin-top: -50px;
    }
`;
