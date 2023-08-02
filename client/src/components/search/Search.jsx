import { IoCloseOutline } from 'react-icons/io5';
import { forwardRef } from 'react';
import ListItems from '../ListItems';
import { memo, useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { StyledSearch, SearchContainerBottom } from './SearchStyles';
import productApis from '../../apis/productApis';
import { Link } from 'react-router-dom';

const Search = forwardRef(({ searchToggle, setSearchToggle }, ref) => {
  const [text, setText] = useState(' ');
  const [searchData, setSearchData] = useState();
  const [value] = useDebounce(text, 2000);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setText(searchValue);
    }
  };

  const link = (category, slug, code) => {
    return `/${category}/${slug}/${code}`;
  };

  const handleClick = () => {
    setSearchToggle(false);
    setText('');
  };

  useEffect(() => {
    const search = async () => {
      if (value !== ' ') {
        const response = await productApis.searchProducts(value);
        setSearchData(response);
      }
    };
    search();
  }, [value]);

  return (
    <StyledSearch searchToggle={searchToggle} ref={ref} id="search-container">
      <div className="search-container">
        <input className="search-input" placeholder="Search" onChange={(e) => handleChange(e)} />
        <IoCloseOutline
          color="#000"
          size={26}
          className="search-close"
          onClick={() => setSearchToggle(!searchToggle)}
        />
      </div>

      <SearchContainerBottom>
        <div className="search-left">
          <ListItems />
          <ListItems />
          <ListItems />
        </div>

        <div className="search-right">
          <h2>Products</h2>
          <div className="tesi">
            <ul>
              {searchData &&
                searchData.length > 0 &&
                searchData.map((item, idx) => (
                  <li key={idx} onClick={handleClick}>
                    <Link to={link(item.category['slug'], item.slug, item.code)}>
                      <div className="product">
                        <img src={item.images[0]?.url} alt="Anh" />
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </SearchContainerBottom>
    </StyledSearch>
  );
});

export default memo(Search);
