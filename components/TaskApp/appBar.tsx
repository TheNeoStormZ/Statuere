import AddTaskIcon from "@mui/icons-material/AddTask";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { authClient } from "../../lib/auth-client";
import { useEffect, useState } from "react";
import { Avatar, Tooltip } from "@mui/material";
import CustomMenu from "./UserMenu";
import { redirect } from 'next/navigation'

interface ButtonAppBarProps {
  onButtonClick: () => void;
}



const ButtonAppBar: React.FC<ButtonAppBarProps> = ({ onButtonClick }) => {

  const [user, setUser] = useState<User>();
  const [userMenu, setUserMenu] = useState<boolean>(false);


  const settings: action[] = [
    {
      info: "Add Passkey",
      action: addPaskey,
    },

    {
      info: "Log out",
      action: logOut,
    },


];

  async function logOut() {

  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
       setUser(undefined);
       redirect('/login');
      },
    },
  })
}

async function addPaskey() {

  const data = await authClient.passkey.addPasskey();

}

  async function getData() {

    const { data: session, error } = await authClient.getSession();
    if (session && session.user) {
      setUser(session.user);
    } else {
      redirect('/login');
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <TaskAltIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Statuere
          </Typography>
          <IconButton aria-label="create" onClick={onButtonClick}>
            <AddTaskIcon />
          </IconButton>
          <Tooltip title={user?.name}>
          <IconButton onClick={() => setUserMenu(true)} sx={{ p: 0 }}>
            <Avatar alt={user?.name} src={user?.image || ""} />
          </IconButton>
          </Tooltip>
          <CustomMenu
            anchorElUser={userMenu}
            handleCloseUserMenu={() => setUserMenu(false)}
            settings={settings}
      />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;

