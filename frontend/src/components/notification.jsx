import React from 'react';
import './notification.css';

export default function Notification({message}) {
  return (
    <div className="notification">
      <p>{message}</p>
    </div>
  );
}