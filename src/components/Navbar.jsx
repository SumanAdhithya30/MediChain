import { Link } from 'react-router-dom';  // Import Link for routing

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <ul className="flex justify-around">
        <li>
          <Link to="/" className="hover:text-gray-200">Home</Link>
        </li>
        <li>
          <Link to="/patients" className="hover:text-gray-200">Patients</Link>
        </li>
        <li>
          <Link to="/doctors" className="hover:text-gray-200">Doctors</Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-gray-200">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;