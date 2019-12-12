import React from 'react';
import Loader from 'react-loader-spinner';

export default function PageLoader() {
  return (
    <div className="page-loader">
      <Loader type="Bars" color="#2931a8" height={100} width={100} />
    </div>
  );
}
