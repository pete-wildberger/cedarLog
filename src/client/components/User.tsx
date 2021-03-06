import * as React from 'react';

export const User = (props: any) => {
  console.log(props);
  return (
    <div className="row">
      <div className="col-3">
        <img src={props.code} />
      </div>
      <div>
        <p>TICKET # {props.num}</p>
        <p>ROW: {props.row}</p>
        <p>SEAT: {props.seat}</p>
      </div>
    </div>
  );
};
