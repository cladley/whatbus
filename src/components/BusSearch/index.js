import React from "react";
import styled from "styled-components";
import Downshift from "downshift";

import useDimension from "../../utilities/useDimensions";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import allRoutes from "./routes";

const HeaderStyle = styled.header`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textLight};
  padding: 20px 15px;
  position: relative;

  h2 {
    font-size: 20px;
    font-size: 22px;
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  label {
    font-size: 14px;
    margin-bottom: 10px;
    display: inline-block;
    color: #000;
  }

  input {
    height: 36px;
    width: 100%;
    border-radius: 17px;
    border: 0;
    font-size: 16px;
    padding-left: 45px;
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  }

  svg {
    width: 30px;
    position: absolute;
    left: 21px;
    bottom: 22px;
  }
`;

const SearchList = styled.ul`
  overflow: scroll;

  li {
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }
`;

const StyledSearchItem = styled.li`
  display: grid;
  grid-template-columns: 40px 1fr;
  padding: 10px 15px;

  h3 {
    font-weight: 700;
    font-size: 14px;
  }

  p {
    font-size: 12px;
    align-self: center;
  }
`;

const SearchItem = ({ name, sections, ...args }) => {
  return (
    <StyledSearchItem {...args}>
      <h3>{name}</h3>
      <p>{sections}</p>
    </StyledSearchItem>
  );
};

const BusSearch = () => {
  const [headerElementRef, { height: headerHeight }] = useDimension();

  return (
    <Downshift
      onChange={selection => alert(`You selected ${selection.value}`)}
      itemToString={item => (item ? item.value : "")}
      onOuterClick={() => console.log("outer was clicked")}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem
      }) => (
        <div className="bus-search">
          <HeaderStyle ref={headerElementRef}>
            <h2>Find A bus</h2>
            <label {...getLabelProps()}>Enter bus number or location</label>
            <input {...getInputProps()} data-testid="bus-search" />
            <SearchIcon />
          </HeaderStyle>

          <SearchList
            {...getMenuProps()}
            style={{ height: `calc(100% - ${headerHeight}px)` }}
          >
            {isOpen
              ? allRoutes
                  .filter(
                    item =>
                      !inputValue ||
                      item.sections
                        .toLowerCase()
                        .includes(inputValue.toLowerCase()) ||
                      item.name.includes(inputValue)
                  )
                  .map((item, index) => (
                    <SearchItem
                      {...getItemProps({
                        key: item.id,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: selectedItem === item ? "bold" : "normal"
                        }
                      })}
                      name={item.name}
                      sections={item.sections}
                      data-testid="search-item"
                      onClick={() => console.log(item.name)}
                    >
                      {item.name} - {item.sections}
                    </SearchItem>
                  ))
              : null}
          </SearchList>
        </div>
      )}
    </Downshift>
  );
};

export default BusSearch;
