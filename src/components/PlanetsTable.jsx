import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

import '../styles/PlanetsTable.css';

function PlanetsTable() {
  const {
    loading,
    planets,
    getPlanetsData,
    numericFilter,
    filter,
  } = useContext(PlanetsContext);
  const [planetsUpdated, setPlanetsUpdated] = useState(planets);

  useEffect(() => {
    setPlanetsUpdated(planets);
  }, [getPlanetsData, planets]);

  if (loading) return <p>Loading...</p>;

  const filterPlanets = () => {
    const newPlanets = [...planetsUpdated];
    const { filterByNumericValues } = numericFilter;
    const { filterByName } = filter;
    if (filterByName.name) {
      return planetsUpdated.filter(
        ({ name }) => name.toLowerCase().includes(filterByName.name),
      );
    }
    
    if (filterByNumericValues[0]) {
      return filterByNumericValues.reduce((accumulator, currentValue) => {
        const { comparison, column, value } = currentValue;
        switch (comparison) {
        case 'maior que':
          accumulator = planetsUpdated
            .filter((planet) => Number(planet[column]) > Number(value));
          break;

        case 'menor que':
          accumulator = planetsUpdated
            .filter((planet) => Number(planet[column]) < Number(value));
          break;

        case 'igual a':
          accumulator = planetsUpdated
            .filter((planet) => Number(planet[column]) === Number(value));
          break;

        default:
          break;
        }
        return accumulator;
      }, [planetsUpdated]);
    }
    return newPlanets;
  };

  return (
    <div className="planets-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          { filterPlanets().map((planet, index) => (
            <tr key={ index }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlanetsTable;
