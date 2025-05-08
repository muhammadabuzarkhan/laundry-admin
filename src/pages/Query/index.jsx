import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Query from '../../components/Query/Query';

const QueryPage = () => {
  return (
    <div className="dashboard-page" style={{display:'flex'}}>
      <Sidebar />
      <Query />
    </div>
  );
};

export default QueryPage;
