import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">MediChain</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          {/* <Link to="/patients" className="hover:underline">Patients</Link>
          <Link to="/doctors" className="hover:underline">Doctors</Link> */}
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;