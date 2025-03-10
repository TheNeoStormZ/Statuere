import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

interface CustomMenuProps {
  anchorElUser: boolean;
  handleCloseUserMenu: () => void;
  settings: action[]; 
}

const CustomMenu: React.FC<CustomMenuProps> = ({
  anchorElUser,
  handleCloseUserMenu,
  settings,
}) => {
  return (
    <Menu
      sx={{ mt: -8 }}
      id="menu-appbar"
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={anchorElUser}
      onClose={handleCloseUserMenu}
    >  
    {settings && settings.map((setting, index) => (
        <MenuItem key={setting.info} onClick={(setting?.action)}>
        <Typography textAlign="center">{setting.info}</Typography>
      </MenuItem>
      ))}
    </Menu>
  );
};

export default CustomMenu;