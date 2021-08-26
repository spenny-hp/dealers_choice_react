import React from "react";

const BoroughList = ({
    boroughs
  }) => {
    return (
        boroughs.map((borough) => {
          return (
            <span key={borough.id} onClick={() => selectBorough(borough)}>
                {borough.name}
            </span>
          );
        })
    );
  };
  
  export default BoroughList;