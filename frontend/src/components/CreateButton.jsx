import React, { useState } from 'react';
import './CreateButton.css';

export default function CreateButton({ onAbrirCreacion }) {
  return (
    <div className="floating-container">
      <button onClick={onAbrirCreacion} className="btn-floating-action">
        <span className="icon-plus">+</span> Crear
      </button>
    </div>
  );
}