import React from 'react';
import { Dialog, DialogContent, Avatar, Button } from '@mui/material';
import { LocationOn, Language } from '@mui/icons-material';

const UserProfileCard = ({ open, onClose, user }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent className="flex flex-col items-center p-6 space-y-4">
        <div className="relative w-full h-32 bg-gray-800 rounded-t-lg flex items-center justify-center">
          <h2 className="text-white text-lg font-semibold">Welcome to MapUp India</h2>
        </div>

        <div className="relative -mt-16 mb-4">
          <Avatar
            src={user.avatar || '/path/to/default-avatar.jpg'} 
            alt={user.fullName}
            className="w-24 h-24 border-4 border-white rounded-full mx-auto"
          />
        </div>

        <h3 className="text-xl font-semibold">{user.fullName}</h3>
        <p className="text-gray-500">@{user.username}</p>
        <div className="flex flex-col items-center space-y-1 mt-4">
          <p className="text-blue-600 flex items-center space-x-1">
            <Language className="text-blue-600" />
            <a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a>
          </p>
          <p className="text-gray-500 flex items-center space-x-1">
            <LocationOn />
            <span>{user.location}</span>
          </p>
        </div>

        <div className="mt-4 text-center text-gray-600">
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Created Date:</strong> {new Date(user.createdDate).toLocaleDateString()}</p>
          <p><strong>Last Login:</strong> {new Date(user.lastLogin).toLocaleString()}</p>
        </div>

        <Button variant="contained" color="primary" className="mt-4">
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileCard;
