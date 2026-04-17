import "./Route.css";
import BackButton from "./BackButton.jsx";
import { useLocation, useNavigate } from "react-router-dom";

export default function Route() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const segments = pathname.split("/").filter(Boolean);


  const user = segments[0];
  const section = segments[1];
  const folders = segments.slice(2);

  const format = (text) =>
    text.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  return (
    <nav className="route-breadcrumb">
      <div>
        <BackButton />
      </div>
      {user && (<span className="breadcrumb-segment" style={{ cursor: "default" }}>
        👤 {format(user)}</span>)}

      {folders.map((seg, i) => {
        const routeTo = `/${user}/${section}/${folders.slice(0, i + 1).join("/")}`;

        return (
          <span key={i} >
            <span className="barrastyle" >/</span>
            <span className="breadcrumb-segment"
              onClick={() => navigate(routeTo)}>{seg}
            </span>
          </span>);
      })}
    </nav>
  );
}