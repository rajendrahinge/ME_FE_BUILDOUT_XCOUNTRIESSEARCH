import React, { useState,useEffect } from "react";
import './App.css';

function App() {

  // toLowerCase().includes("hel")

  // function filterByCategory(list, categoryList) {
      
  //   let finalList = [];
  //   for (let i = 0; i < list.length; i++) {
  //     if (categoryList.includes(list[i].category)) {
  //       finalList.push(list[i])
  //     }
  //   }
  //   return finalList;
  
  // }
  
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
      fetch('https://restcountries.com/v3.1/all')
        .then((response) => response.json())
        .then((data) => {
            if(search !== '') {
              let finalList = [];
              for (let i = 0; i < data.length; i++) {
                if (data[i].name.common.toLowerCase().includes(search)) {
                  finalList.push(data[i])
                }
              }
              setCountries(finalList);
            } else {              
              setCountries(data);
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
  }, [search]);

  return (
    <div className="App">
      <div className="input_box">
        <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search for countries" />
      </div>
      <div className="container">
        {countries.map((item, index) => (
          <div className="items countryCard">
            <span>
              <img src={item.flags.png} alt={item.flags.alt} />
              <div>{item.name.common}</div>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
