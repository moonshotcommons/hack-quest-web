import React from 'react';

interface ShowAllProp {
  showAll: boolean;
}

const ShowAll: React.FC<ShowAllProp> = ({ showAll }) => {
  return (
    <div className="flex items-center">
      <span>Show All</span>
    </div>
  );
};

export default ShowAll;
