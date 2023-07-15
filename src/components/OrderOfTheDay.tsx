import React, { FC } from "react";
import "./OrderOfTheDay.css";

type OrderItem = {
  time: string;
  text: string;
};

interface OrderOfTheDayProps {
  orders: OrderItem[];
}

export const OrderOfTheDay: FC<OrderOfTheDayProps> = ({ orders }) => {
  return (
    <div className="orders-container">
      {orders.map((order) => (
        <div className="order-item">
          <p className="order-time">{order.time}</p>
          <p className="order-text">{order.text}</p>
        </div>
      ))}
    </div>
  );
};
