import { useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import { IoCloseOutline, IoChevronForward } from 'react-icons/io5';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import productApis from '../apis/productApis';
import { useDebounce } from 'use-debounce';
import { Box, Button } from '@mui/material';

const _sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const Filter = ({ direction, path, setFilterData }) => {
  const [valuePrice, setValue] = useState('0-5000000');
  const [status, setStatus] = useState(false);
  const [filterToggle, setFilterToggle] = useState(false);
  const { t } = useTranslation(['home', 'product']);
  const [value] = useDebounce(valuePrice, 500);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['filter'],
    queryFn: async () => {
      await _sleep(1000);
      const res = await productApis.filterProducts(path, value.split('-'));
      return res;
    },
    refetchOnWindowFocus: false,
    enabled: status,
    onSuccess: async (data) => {
      setFilterData(data);
    },
  });

  useEffect(() => {
    if (filterToggle === true) {
      if (typeof window != 'undefined' && window.document) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [filterToggle]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClearClick = () => {
    setFilterToggle(false);
    setFilterData(null);
  };

  const handleClick = () => {
    setFilterToggle(false);
    setStatus(true);
    refetch();
  };
  return (
    <>
      <FilterWrapper>
        <FilterContent direction={direction}>
          <h5>{t(path)}</h5>
          <div>
            <ButtonFilter onClick={() => setFilterToggle(!filterToggle)}>
              <span>{t('filter', { ns: 'product' })}</span>
              <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 96 960 960" width="22">
                <path d="M700 926q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41Zm-.235-60Q733 866 756.5 842.735q23.5-23.264 23.5-56.5Q780 753 756.735 729.5q-23.264-23.5-56.5-23.5Q667 706 643.5 729.265q-23.5 23.264-23.5 56.5Q620 819 643.265 842.5q23.264 23.5 56.5 23.5ZM120 816v-60h360v60H120Zm140-310q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41Zm-.235-60Q293 446 316.5 422.735q23.5-23.264 23.5-56.5Q340 333 316.735 309.5q-23.264-23.5-56.5-23.5Q227 286 203.5 309.265q-23.5 23.264-23.5 56.5Q180 399 203.265 422.5q23.264 23.5 56.5 23.5ZM480 396v-60h360v60H480Z" />
              </svg>
            </ButtonFilter>
          </div>
        </FilterContent>

        <FilterModal filterToggle={filterToggle}>
          <FilterModalTitle>
            <h2>SHOW FILTER</h2>
            <button className="close-btn" onClick={() => setFilterToggle(!filterToggle)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                  fill="black"
                />
              </svg>
            </button>
          </FilterModalTitle>
          <FilterModalContent>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">Price</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={valuePrice}
                onChange={(e) => handleChange(e)}
              >
                <FormControlLabel value="0-5000000" control={<Radio />} label="0 - 5000000 đ" />
                <FormControlLabel value="5000001-10000000" control={<Radio />} label="5000001 - 10000000 đ" />
                <FormControlLabel value="10000001-15000000" control={<Radio />} label="10000001 - 15000000 đ" />
                <FormControlLabel value="15000000" control={<Radio />} label="15000000+ đ" />
              </RadioGroup>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button sx={{ mr: 2 }} onClick={handleClearClick}>
                Clear
              </Button>
              <Button variant="contained" onClick={handleClick}>
                Filter
              </Button>
            </Box>
          </FilterModalContent>
        </FilterModal>
      </FilterWrapper>
      {filterToggle && <BackDrop />}
    </>
  );
};

export default memo(Filter);

const FilterWrapper = styled.div`
  margin-top: 7rem;

  @media only screen and (min-width: 768px) {
    margin-top: 7rem;
  }
  @media only screen and (min-width: 1024px) {
    margin-top: 9.5rem;
  }
`;
const FilterContent = styled.div`
  background-color: #fff;
  width: 100%;
  min-height: 4rem;
  position: fixed !important;
  transform: ${(props) => (props.direction === 'down' ? 'translateY(-7rem)' : 'translateY(-3.5rem)')};
  transition: background-color 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  z-index: 99;
  h5 {
    font-weight: normal;
    font-size: 14px;
  }
  @media only screen and (min-width: 768px) {
    padding-left: 3.125vw;
    padding-right: 3.125vw;
    transform: ${(props) => (props.direction === 'down' ? 'translateY(-7rem)' : 'translateY(-3rem)')};
  }

  @media only screen and (min-width: 1024px) {
    transform: ${(props) => (props.direction === 'down' ? 'translateY(-9.5rem)' : 'translateY(-4rem)')};
    padding-left: 3.125vw;
    padding-right: 3.125vw;
  }
`;

const ButtonFilter = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 0.5rem;
  border-radius: 999px;
  border: 1px solid #ccc;
  background-color: transparent;

  span {
    margin-right: 0.5rem;
    font-size: 14px;
  }
  @media screen and (min-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

const FilterModal = styled.div`
  position: fixed;
  inset: 0 0 0 0;
  background-color: #fff;
  z-index: 999;
  color: #000;
  transform: ${(props) => (props.filterToggle ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);

  /*Mobile*/
  @media only screen and (min-width: 48rem) {
    inset: 0 0 0 60%;
  }
`;

const FilterModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 1px #eae8e4;
  height: 4.5rem;
  h2 {
    width: 100%;
    padding: 0 2.5rem;
    font-size: 20px;
    @media screen and (min-width: 48rem) {
      font-size: 22px;
    }
  }
  .close-btn {
    height: 100%;
    padding: 0 1.5rem;
    box-shadow: -1px 1px #eae8e4;
    background-color: transparent;
    border: none;
    /* border-left: 2px solid #eae8e4; */
    cursor: pointer;
    &:hover {
      background-color: #eae8e4;
    }
  }
`;

const FilterModalContent = styled.div`
  height: 100%;
  padding: 3rem 2rem 0;
  display: flex;
  flex-direction: column;
`;
const BackDrop = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 101;
`;
