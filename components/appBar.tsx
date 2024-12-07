import AddTaskIcon from "@mui/icons-material/AddTask";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";

interface ButtonAppBarProps {
  onButtonClick: () => void;
}

const ButtonAppBar: React.FC<ButtonAppBarProps> = ({ onButtonClick }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
