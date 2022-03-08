import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import FooterCopyright from "../components/FooterCopyright";
import NavbarWrap from "../components/NavbarWrap";
import Products2 from "../components/Products2";
import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  ${mobile({ marginBottom: "5px" })}
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 15px;
  margin-right: 15px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 5px;
  margin-right: 15px;
  ${mobile({ margin: "5px 0px" })}
`;

const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const search = location.search;
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters, //to remember read about spread operator for object.(with objects is used to create copies of existing objects with new or updated values or to make a copy of an object with more properties)
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <NavbarWrap />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled defaultValue="Color">
              Color
            </Option>
            <Option>Yellow</Option>
            <Option>Black</Option>
            <Option>Blue</Option>
            <Option>White</Option>
            <Option>Green</Option>
            <Option>Brown</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (Ascending)</Option>
            <Option value="desc">Price (Descending)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products2 cat={cat} filters={filters} sort={sort} search={search} />
      <Footer />
      <FooterCopyright />
    </Container>
  );
};

export default ProductList;
