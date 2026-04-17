import {useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import './ReadMe.css';


export default function ReadMe() {

  const { pathname } = useLocation();
  const [text, setText] = useState("");
  const [content, setContent] = useState(() => 
    localStorage.getItem('readme-content') || '');

  const handleChange = (e) => {
    const newText = e.target.value;
    setContent(newText);
    localStorage.setItem('readme-content', newText);};
   
  useEffect(() => {
    const saved = localStorage.getItem(`readme-${pathname}`);
    setText(saved || "");}, [pathname]);

  useEffect(() => {
    localStorage.setItem(`readme-${pathname}`, text);
  }, [text, pathname]);

  return (
    <div className="readme-container">
      <h2 className='title-readme'>README</h2>
      <p>
      <textarea
        className="readme-input"
        id="readme-input"
        value={text}
        onChange={(e) => setText(e.target.value)}/>
        </p>
    </div>
  );
}