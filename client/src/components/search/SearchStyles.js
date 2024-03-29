import styled from 'styled-components';

export const StyledSearch = styled.div`
  position: fixed;
  inset: 0 0 20%;
  background-color: #fff;
  z-index: 999;
  transition: all 0.5s ease;
  overflow: hidden;
  transform: ${(props) => (props.searchToggle ? 'translateY(0)' : 'translateY(-100%)')};
  transition: transform 0.3s ease-in-out;
  /* &::-webkit-scrollbar {
        display: none;
    } */
  .search-container {
    width: 100%;
    height: 88px;
    padding: 0 2rem;
    display: flex;
    position: relative;
    justify-content: center;
    /* text-align: center; */
    .search-close {
      position: absolute;
      top: 0;
      right: 4%;
      transform: translateY(100%);
      cursor: pointer;
    }
    input.search-input {
      border: 1px solid #000;
      background: transparent
        url("data:image/svg+xml,%3Csvg stroke='currentColor' fill='currentColor' stroke-width='0' version='1.1' id='search' x='0px' y='0px' viewBox='0 0 24 24' color='%23000' class='search-icon' height='22' width='22' xmlns='http://www.w3.org/2000/svg' style='color: rgb(0, 0, 0);'%3E%3Cg%3E%3Cpath d='M20.031,20.79c0.46,0.46,1.17-0.25,0.71-0.7l-3.75-3.76c1.27-1.41,2.04-3.27,2.04-5.31 c0-4.39-3.57-7.96-7.96-7.96s-7.96,3.57-7.96,7.96c0,4.39,3.57,7.96,7.96,7.96c1.98,0,3.81-0.73,5.21-1.94L20.031,20.79z M4.11,11.02c0-3.84,3.13-6.96,6.96-6.96c3.84,0,6.96,3.12,6.96,6.96c0,3.84-3.12,6.96-6.96,6.96C7.24,17.98,4.11,14.86,4.11,11.02 z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")
        no-repeat 12px center;

      height: 44px;
      /* padding: 0 1rem; */
      width: 50%;
      margin: auto;
      border-radius: 8px;
      background-size: 22px;
      text-indent: 44px;
      outline: none;
    }
  }
`;

export const SearchContainerBottom = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-top: 1px solid var(--border-color);
  height: calc(100% - 88px);
  .search-left {
    display: flex;
    flex-wrap: wrap;
    padding: 3rem 2rem;
    height: calc(100% - 6rem);
    border-right: 1px solid var(--border-color);
    color: #000;
    .tesi {
      width: 50%;
    }
    h2 {
      margin: 0;
    }
    ul {
      padding: 0;
      gap: 20px;
      list-style-type: none;
      li {
        margin: 1rem 0;
      }
    }
  }
  .search-right {
    display: flex;
    flex-wrap: wrap;
    padding: 3rem 2rem;
    height: calc(100% - 14rem);
    border-right: 1px solid var(--border-color);
    color: #000;
    .tesi {
      width: 100%;
      .product {
        display: flex;
        align-items: center;
      }
      img {
        margin-right: 10px;
        width: 100px;
        height: 100px;
        object-fit: contain;
        background: url('/images/gradient_default.svg') 0 0 / cover no-repeat;
      }
      span {
        text-decoration: none;
      }
    }
    h2 {
      margin: 0;
    }
    ul {
      padding: 0;
      gap: 20px;
      list-style-type: none;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      li {
        margin: 1rem 0;
        a {
          text-decoration: none;
          color: #000;
        }
      }
    }
  }
`;
