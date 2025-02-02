import styled from "styled-components";
import { useState, useEffect } from "react";
import SearchResult from "./components/SearchResults/SearchResult";
export const BASE_URL = "http://localhost:9000"
const App = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedButton, setSelectedButton] = useState("all");
  
  useEffect(() => {
    const fetchFoodData = async () => {
      try{
        setLoading(true)
        const response = await fetch(BASE_URL)
        const json = await response.json();
        setData(json)
        setFilteredData(json)
        setLoading(false)
      }
      catch(error){
        setError("Unable to fetch data")
      }
    };
    fetchFoodData();
  }, [])

  const searchFood = (e) => {
    const searchValue = e.target.value;
    if(searchValue === ""){
      setFilteredData(null);
    }
    const filter = data?.filter((food) => 
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  }

  const filterFood = (type) => {
    if(type === "all"){
      setFilteredData(data);
      setSelectedButton("all");
      return;
    }
    const filter = data?.filter((food) => 
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedButton(type);
  }
  if(error) return <div>{error}</div>
  if(loading) return <div>Loading...</div>
  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.svg" alt="logo"/>
          </div>
          <div className="search">
            <input onChange={searchFood} placeholder="Search Food"/>
          </div>
        </TopContainer>
        <FilterContainer>
          <Button isSelected={selectedButton === "all"} onClick={() => filterFood("all")}>All</Button>
          <Button isSelected={selectedButton === "breakfast"} onClick={() => filterFood("breakfast")}>Breakfast</Button>
          <Button isSelected={selectedButton === "lunch"} onClick={() => filterFood("lunch")}>Lunch</Button>
          <Button isSelected={selectedButton === "dinner"} onClick={() => filterFood("dinner")}>Dinner</Button>
        </FilterContainer>
      </Container>
      <SearchResult data={filteredData} />
    </>
  )
};
export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search{
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 4px;
      &::placeholder{
        color: white;
      }
    }
  }

  @media (0 < width < 600px){
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background: ${({isSelected}) => isSelected ? "#f22f2f": "#ff4343"}  ;
  outline: 1px solid ${({isSelected}) => isSelected ? "white": "#ff4343"}  ;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f222f2f;
  }
`;

