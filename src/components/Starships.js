import React, { useState, useEffect } from 'react';
import { getStarship } from '../api/Starships';
import PageLoader from '../common/PageLoader';
import { useHistory } from 'react-router-dom'

import Pagination from 'react-js-pagination';

export default function Starships() {
  const pageRangeDisplayed = 5;
  const itemsCountPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [activePageNumber, setActivePageNumber] = useState(1);
  const history = useHistory();

  const getData = (pageNumber = 1) =>
    getStarship(pageNumber).then(response => {
      setData(response);
      setIsLoading(false);
    });

  useEffect(() => {
    if (isLoading || Object.keys(data).length === 0) {
      getData();
    }
  }, [isLoading, data]);
  const redirectShip = (ship) => {
    let url = ship.url.split('/');
    console.log(url[url.length - 2]);
    history.push('/ship-detail/' + url[url.length - 2]);
  }
  const renderStarships = () => {
    let starships = []
    if (data && data.results) {

      starships = data.results.map((ship) => {
        return (
          <tr key={ship.name} onClick={() => { redirectShip(ship); }}>
            <td>{ship.name ? ship.name : 'N/A'}</td>
            <td>{ship.model ? ship.model : 'N/A'}</td>
            <td>{ship.pilots.length}</td>
            <td>{ship.manufacturer ? ship.manufacturer : 'N/A'}</td>
          </tr>
        )
      });
    }
    return starships;
  }

  const handlePageChange = pageNumber => {
    // activePageNumber = pageNumber;
    setActivePageNumber(pageNumber);
    getData(pageNumber);
  };
  const handlePagination = pageRangeDisplayed => {
    if (data && data.results) {
      if (data.results.count === 0) {
        return '';
      }
      return (
        <div className="text-center pagination-outer">
          <Pagination
            activePage={activePageNumber}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={data && data.count}
            innerClass="custom-pagination"
            pageRangeDisplayed={pageRangeDisplayed}
            onChange={handlePageChange}
          />
        </div>
      );
    }
  };

  return (
    <React.Fragment>
      {isLoading ? <PageLoader /> :
        <React.Fragment>
          <header className="main-header">
            <div className="container">
              <h1>StarShip</h1>
            </div>
          </header>

          <div className="container pt-5">
            <div className="row">
              <div className="col-12">
                <h3 className="mb-3">All Ships</h3>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped table-hover">
                    <thead>
                      <tr>
                        <th width="20%">Ship Name</th>
                        <th width="30%">Model</th>
                        <th width="15%">Number of Pilots</th>
                        <th width="20%">Manufacturer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderStarships()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {!isLoading
              ? handlePagination(pageRangeDisplayed)
              : ''}
          </div>
        </React.Fragment>
      }
    </React.Fragment >
  );
}


