import { Link } from "react-router-dom";

interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
  visible?: boolean;
}

interface DropdownProps {
  items: DropdownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ items }) => {
  return (
    <div className="dropdown">
      <a role="button" className="d-block dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" viewBox="0 0 256 256">
          <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
        </svg>
      </a>
      <ul className="dropdown-menu">
        {items
          .filter((item) => item.visible !== false)
          .map((item, index) => (
            <li data-bs-dismiss="offcanvas" data-bs-target="#offcanvas" key={index}>
              <Link
                className="dropdown-item"
                to={item.href || "#"}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}>
                {item.label}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Dropdown;
