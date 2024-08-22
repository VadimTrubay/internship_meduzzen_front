import React, {useEffect, useState} from 'react';
import {
  IconButton, Badge, Menu, MenuItem, ListItemText, ListItem, List, Paper
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {selectMyNotifications} from "../../redux/notifications/selectors";
import {notificationType} from "../../types/notificationsTypes";
import {markAsReadNotifications, fetchMyNotifications} from "../../redux/notifications/operations";


const NotificationMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const notifications = useSelector(selectMyNotifications) as notificationType[];

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchMyNotifications());
    }, 500000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const handleBellClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = (id: string) => {
    if (id) {
      setAnchorEl(null);
      dispatch(markAsReadNotifications(id));
    }
  };

  const unreadCount = notifications.length;

  return (
    <>
      <IconButton color="inherit" onClick={handleBellClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon/>
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 8,
          style: {
            maxHeight: 300,
            width: '300px',
            borderRadius: '6px',
          },
          component: Paper,
        }}
      >
        <List>
          {notifications.map(notification => (
            <ListItem
              key={notification.id}
              button
              onClick={() => handleMarkAsRead(notification.id)}
              sx={{
                '&:hover': {
                  backgroundColor: '#d3d3d3',
                },
                borderRadius: '4px',
                margin: '4px 4px',
              }}
            >
              <ListItemText primary={notification.text}/>
            </ListItem>
          ))}
        </List>
        {notifications.length === 0 && (
          <MenuItem>No notifications</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default NotificationMenu;
