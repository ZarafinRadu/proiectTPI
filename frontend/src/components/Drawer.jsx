import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BasicModal from './Modal';
import { Navigate } from 'react-router-dom';

export default function AppDrawer({open, setOpen}) {
  function App() {
    const [mapOpen, setMapOpen] = useState(false);
  
    const handleOpenMap = () => {
      setMapOpen(true);
    };
  
    return (
      <div>
        {!mapOpen && (
          <button onClick={handleOpenMap}>Open Map</button>
        )}
        {mapOpen && <Map />}
      </div>
    );
  }

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [modalOpen,setModalOpen] = React.useState(false)

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Manage Vehicle', 'Manage User', 'Manage Route', 'Map'].map((text, index) => (
          <ListItem key={text} disablePadding onClick={text==='Manage Vehicle'?()=>setModalOpen(true):text==='Manage User'?()=>setModalOpen(true):text==='Manage Route'?()=>setModalOpen(true):text==='Map'?()=>Navigate("/MapPage"):null}>
            <ListItemButton>
              <ListItemIcon>
                {text==='Manage Vehicle' ? <LocalShippingIcon/> : <InboxIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['idk', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <MailIcon/> : <InboxIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (<>
    <BasicModal open={modalOpen} setOpen={setModalOpen}/>
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  </>
  );
}
