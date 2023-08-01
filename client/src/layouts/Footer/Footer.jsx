import { BsPlus } from 'react-icons/bs';
import { useState } from 'react';
import { Wrapper, ColumnFooter, ColumnHead, Title, PlusIcon, ColumnItem, ColumnContent } from './FooterStyles';

const Footer = () => {
  const [isToggle, setToggle] = useState({
    help: false,
    services: false,
    about: false,
    connect: false,
  });

  return (
    <Wrapper>
      <ColumnFooter>
        <ColumnHead>
          <Title>HELP</Title>
          <PlusIcon onClick={() => setToggle((prev) => ({ ...prev, help: !prev.help }))}>
            <BsPlus size={18} className="plus-icon" />
          </PlusIcon>
        </ColumnHead>

        <ColumnContent isToggle={isToggle.help}>
          <ColumnItem>You can call or email us.</ColumnItem>
          <ColumnItem>FAQ'S</ColumnItem>
          <ColumnItem>Product Care</ColumnItem>
          <ColumnItem>Stores</ColumnItem>
        </ColumnContent>
      </ColumnFooter>
      <ColumnFooter>
        <ColumnHead>
          <Title>Services</Title>
          <BsPlus
            size={18}
            className="plus-icon"
            onClick={() => setToggle((prev) => ({ ...prev, services: !prev.services }))}
          />
        </ColumnHead>

        <ColumnContent isToggle={isToggle.services}>
          <ColumnItem>Repairs</ColumnItem>
          <ColumnItem>Personalization</ColumnItem>
          <ColumnItem>Art of Gifting</ColumnItem>
          <ColumnItem>Download our Apps</ColumnItem>
        </ColumnContent>
      </ColumnFooter>
      <ColumnFooter>
        <ColumnHead>
          <Title>ABOUT</Title>
          <BsPlus
            size={18}
            className="plus-icon"
            onClick={() => setToggle((prev) => ({ ...prev, about: !prev.about }))}
          />
        </ColumnHead>

        <ColumnContent isToggle={isToggle.about}>
          <ColumnItem>Fashion Shows</ColumnItem>
          <ColumnItem>Art & Culture</ColumnItem>
          <ColumnItem>La Maison</ColumnItem>
          <ColumnItem>Subtainability</ColumnItem>
          <ColumnItem>Last News</ColumnItem>
        </ColumnContent>
      </ColumnFooter>
      <ColumnFooter>
        <ColumnHead>
          <Title>CONNECT</Title>
          <BsPlus
            size={18}
            className="plus-icon"
            onClick={() => setToggle((prev) => ({ ...prev, connect: !prev.connect }))}
          />
        </ColumnHead>

        <ColumnContent isToggle={isToggle.connect}>
          <ColumnItem>Sign up for first access to latest collections, campaigns and videos.</ColumnItem>
          <ColumnItem>Follow Us</ColumnItem>
        </ColumnContent>
      </ColumnFooter>
    </Wrapper>
  );
};

export default Footer;
