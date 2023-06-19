import React from "react";
import { useDispatch } from "react-redux";



interface loginCardType {
  username: string;
  password: string;
}

function LoginCard({ name, index }: loginCardType) {
  const dispatch = useDispatch();
  
  return (
    <div
      className="reservation-card-container"
      onClick={() => {
        dispatch(removeReservation(index));
        dispatch(
          addCustomer({
            id: uuid(),
            name,
            food: [],
          })
        );
      }}
    >
      <p>{name}</p>
    </div>
  );
}

export default ReservationCard;