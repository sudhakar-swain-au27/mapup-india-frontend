import Link from 'next/link';
import { useState, useRef } from 'react';
import axios from 'axios';
import { HiOutlineHome, HiOutlineChartBar, HiOutlineUser } from 'react-icons/hi';
import { FaShieldAlt, FaFileUpload, FaBell, FaFileAlt, FaDatabase } from 'react-icons/fa';
import { AiOutlineFileSearch } from 'react-icons/ai';
import UserCreationModal from './CreatUser';
import UserProfileCard from './UserProfileCard';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ContactsIcon from '@mui/icons-material/Contacts';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import GavelIcon from '@mui/icons-material/Gavel';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export default function Sidebar() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);


  // User data for profile card
  const user = {
    fullName: 'Sudhakar Swain',
    username: 'sudhakar27',
    location: 'India',
    avatar: '/path/to/avatar.jpg' // Replace with a real avatar path
  };

  // File upload handler
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        setUploading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        await axios.post(`${apiUrl}/api/data/upload-file`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setUploading(false);
        onFileUploadSuccess();
      } catch (error) {
        console.error('File upload failed:', error);
        setUploading(false);
        alert("File upload failed. Please try again.");
      }
    }
  };

  // Function to handle successful upload
  const onFileUploadSuccess = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      window.location.reload();
    }, 1000);
  };
  const sidebarItemStyle = "flex items-center p-2 rounded-md hover:bg-purple-100 transition-colors text-grey-500 font-semibold text-sm";

  const sidebarItems = [
    { href: "/", icon: <HiOutlineHome className="text-blue-600" />, label: "Dashboard" },
    { href: "/analytics", icon: <HiOutlineChartBar className="text-green-600" />, label: "Analytics" },
    { href: "/userdata", icon: <FaShieldAlt className="text-purple-600" />, label: "User Data" },
    { href: "/userlist", icon: <FaFileAlt className="text-red-500" />, label: "User Lists" },
    { href: "/upload-file", icon: <FaFileUpload className="text-blue-600" />, label: "Upload File", isButton: true, onClick: () => fileInputRef.current.click() },
    { href: "/create-user", icon: <HiOutlineUser className="text-purple-600" />, label: "Create User", isButton: true, onClick: () => setShowUserModal(true) },
    { href: "/account", icon: <HiOutlineUser className="text-yellow-600" />, label: "Account", onClick: () => setShowProfile(true) },
    { href: "/dataset-access", icon: <FaDatabase className="text-teal-500" />, label: "Dataset Access" },
    { href: "/report-generation", icon: <AiOutlineFileSearch className="text-cyan-500" />, label: "Report Generation" },
    { href: "/view-data", icon: <HiOutlineChartBar className="text-indigo-500" />, label: "View Data" },
    { href: "/notifications", icon: <FaBell className="text-pink-500" />, label: "Notifications" },
    { href: "/help", icon: <HelpOutlineIcon className="text-lime-600" />, label: "Help" },
    { href: "/contacts", icon: <ContactsIcon className="text-gray-600" />, label: "Contacts" },
    { href: "/privacy-policy", icon: <PrivacyTipIcon className="text-purple-800" />, label: "Privacy Policy" },
    { href: "/terms-and-conditions", icon: <GavelIcon className="text-red-600" />, label: "Terms and Conditions" },
    { href: "/logout", icon: <HiOutlineUser className="text-gray-700" />, label: "Logout" },
  ];

  return (
    <aside className="bg-gray-100 text-gray-700 w-64 h-screen fixed left-0 top-0 flex flex-col items-center py-8 shadow-lg overflow-y-auto transition-colors duration-300">
      <h1 className="text-purple-700 text-2xl font-bold mb-8 items-center">MapUp India</h1>

      <nav className="w-full space-y-2 px-4">
        {sidebarItems.map((item, index) =>
          item.isButton ? (
            <Button
              key={index}
              className={`${sidebarItemStyle} w-full text-base`}
              size="medium"
              startIcon={item.icon}
              onClick={item.onClick}
            >
              <span className="ml-3">{item.label}</span>
            </Button>
          ) : (
            <Link href={item.href} key={index} className={sidebarItemStyle} onClick={item.onClick}>
              {item.icon} <span className="ml-3">{item.label}</span>
            </Link>
          )
        )}
      </nav>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />

      {/* Success Modal with Loader */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center flex flex-col items-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">File Uploaded Successfully!</h2>
            <CircularProgress color="primary" />
          </div>
        </div>
      )}

      {/* User Creation Modal */}
      <UserCreationModal
        open={showUserModal}
        onClose={() => setShowUserModal(false)}
        onUserCreated={() => window.location.reload()}
      />

      {/* User Profile Overlay */}
      <UserProfileCard open={showProfile} onClose={() => setShowProfile(false)} user={user} />
    </aside>
  );
}
