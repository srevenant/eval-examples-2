import React, { useState, useEffect } from 'react';
import { useParams  } from 'react-router';

import { getStarshipDetail, getPilots, getAllPilots } from '../api/Starships';
import PageLoader from '../common/PageLoader';

export default function Pilots() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [pilotData, setPilotData] = useState([]);
  const { id } = useParams();

  const getData = () =>
    getStarshipDetail(id).then(response => {
      setData(response);
      const actionList = [];
      if (
        Object.keys(response).includes('pilots') &&
        response['pilots'].length > 0
      ) {
        response['pilots'].forEach(element => {
          actionList.push(getPilots(element));
        });
      }
      if (actionList.length > 0) {
        getAllPilots(actionList).then(res => {
          setPilotData(res);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });

  useEffect(() => {
    if (isLoading || Object.keys(data).length === 0) {
      getData();
    }
  }, [isLoading, data]);

  function renderPilotList() {
    const pilots = [];
    if (pilotData.length > 0) {
      for (const pilot of pilotData) {
        pilots.push(
          <tr key={pilot.name}>
            <th>{pilot.name}</th>
            <td>{pilot.height}</td>
            <td>{pilot.mass}</td>
            <td>{pilot.gender}</td>
            <td>{pilot.birth_year}</td>
          </tr>
        );
      }
    } else {
      pilots.push(
        <tr className="text-center">
          <td colSpan="5">No pilots present</td>
        </tr>
      );
    }

    return pilots;
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <PageLoader />
      ) : (
          <React.Fragment>
            <header className="main-header">
              <div className="container">
                <h1>Starship Details</h1>
              </div>
            </header>
            <div className="container pt-5">
              <div className="row">
                <div className="col-12">
                  <h3 className="mb-3">Ship Detail</h3>
                  <hr />
                </div>
                <div className="col-md-6">
                  <div className="container-fluid">
                    <div className="row mb-1">
                      <div className="col-">
                        <strong>Ship Name: &nbsp;</strong>
                      </div>
                      <div className="col-">{data.name}</div>
                    </div>
                    <div className="row mb-1">
                      <div className="col-">
                        <strong>Model: &nbsp;</strong>
                      </div>
                      <div className="col-">{data.model}</div>
                    </div>
                    <div className="row mb-1">
                      <div className="col-">
                        <strong>Manufacturer: &nbsp;</strong>
                      </div>
                      <div className="col-">
                        {data.manufacturer}
                      </div>
                    </div>
                    <div className="row mb-1">
                      <div className="col-">
                        <strong>Length : &nbsp;</strong>
                      </div>
                      <div className="col-">{data.length}</div>
                    </div>
                    <div className="row mb-1">
                      <div className="col-">
                        <strong>Crew: &nbsp;</strong>
                      </div>
                      <div className="col-">{data.crew}</div>
                    </div>
                    <div className="row mb-1">
                      <div className="col-">
                        <strong>Passengers: &nbsp;</strong>
                      </div>
                      <div className="col-">{data.passengers}</div>
                    </div>
                    <div className="row mb-1">
                      <div className="col-">
                        <strong>Cargo Capacity: &nbsp;</strong>
                      </div>
                      <div className="col-">{data.cargo_capacity}</div>
                    </div>
                    <div className="row mb-1">
                      <div className="col-">
                        <strong>Consumables: &nbsp;</strong>
                      </div>
                      <div className="col-">{data.consumables}</div>
                    </div>
                    <div className="row mb-1">
                      <div className="col-">
                        <strong>Starship Class: &nbsp;</strong>
                      </div>
                      <div className="col-">{data.starship_class}</div>
                    </div>
                  </div>
                </div>
                <div className="col-12  pt-2">
                  <hr />
                  <h4 className="mb-3">Pilots</h4>
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover">
                      <thead>
                        <tr>
                          <th width="30%">Name</th>
                          <th width="10%">Height</th>
                          <th width="40%">Mass</th>
                          <th width="10%">Gender</th>
                          <th width="10%">Birth Year</th>
                        </tr>
                      </thead>
                      <tbody>{renderPilotList()}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>{' '}
          </React.Fragment>
        )}
    </React.Fragment>
  );
}
