import React, { FC } from "react";
import "./OrderOfTheDay.css";

type OrderItem = {
  time: string;
  text?: string;
};

interface OrderOfTheDayProps {
  orders: OrderItem[];
}

export const OrderOfTheDay: FC<OrderOfTheDayProps> = ({ orders }) => {
  return (
    <div className="orders-container">
      {orders.map((order, index) => (
        <div className="order-item" key={`order-${index + 1}`}>
          <p
            className={
              index === 0 || index === 3 ? "order-time-date" : "order-time"
            }
          >
            {order.time}
          </p>
          {order.text && <p className="order-text">{order.text}</p>}
        </div>
      ))}
    </div>
  );
};
