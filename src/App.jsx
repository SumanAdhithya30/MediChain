// import { useState } from "react";
// import { ethers } from "ethers";

// function App() {
//   const [account, setAccount] = useState(null);

//   // Function to connect MetaMask
//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const signer = await provider.getSigner();
//         const address = await signer.getAddress();
//         setAccount(address);
//       } catch (error) {
//         console.error("Connection Error:", error);
//       }
//     } else {
//       alert("MetaMask not detected!");
//     }
//   };

//   return (
//     <div className="h-screen bg-blue-500 flex justify-center items-center">
//       <div className="text-center w-full">
//         <h1 className="text-4xl text-white font-bold mb-4">MediChain</h1>
//         <div className="card bg-white p-6 rounded-lg shadow-lg">
//           {account ? (
//             <p className="text-green-600 font-semibold">Connected: {account}</p>
//           ) : (
//             <button
//               onClick={connectWallet}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
//             >
//               Connect MetaMask
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from "react"; 
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Navbar from './components/Navbar';  
import Login from "./pages/Login";

function App() {
  const [userRole, setUserRole] = useState(null); // ✅ State defined and now used

  return (
    <Router>
      <Navbar />  
      <div className="App">
        {/* ✅ Display user role in console or UI */}
        {userRole && <p className="text-center">Logged in as: {userRole}</p>}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


