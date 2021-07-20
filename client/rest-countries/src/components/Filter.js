import React, { useEffect, useState } from "react";

function Filter() {
  //   window.addEventListener("DOMContentLoaded", () => {
  // const search = document.getElementById("search");

  // search.addEventListener("click", (e) => {
  //   const { value } = e.target;

  //   const countryName = document.querySelectorAll(".country-name");

  //   countryName.forEach((name) => {
  // if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
  //   name.parentElement.parentElement.style.display = "block";
  // } else {
  //   name.parentElement.parentElement.style.display = "none";
  // }
  //   });
  // });
  //   });

  const [countries, setCountries] = useState([]);
  const [mode, setMode] = useState(true);
  // const [toggleBtn, setToggleBtn] = useState('<i class="far fa-sun"></i> Light Mode')

  useEffect(async () => {
    const res = await fetch("https://restcountries.eu/rest/v2/all");
    const data = await res.json();
    await setCountries(data);
  }, []);

  const filterByRegion = async (region) => {
    if (region === "") return;
    const res = await fetch(
      `https://restcountries.eu/rest/v2/region/${region}`
    );
    const data = await res.json();
    await setCountries(data);
  };

  const searchCountry = async (name) => {
    if (name.length < 3 || name === "") return;
    const res = await fetch(`https://restcountries.eu/rest/v2/name/${name}`);
    const data = await res.json();
    await setCountries(data);
  };

  return (
    <form className="form" id="form">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Busca un pais"
        onChange={(name) => searchCountry(name.target.value)}
      />

      <div className="select">
        <select
          name="select"
          id="select"
          onChange={(val) => filterByRegion(val.target.value)}
        >
          <option value="Filter by region">Filtrar por Region</option>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Oceania">Oceania</option>
          <option value="Europa">Europa</option>
          <option value="Asia">Asia</option>
        </select>
      </div>
    </form>
  );
}

export default Filter;
