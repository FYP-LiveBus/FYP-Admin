import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  // Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  // AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  // ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  // UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { viewBus, viewDriver, viewConductor, viewStudent, viewAdmin, viewSubAdmin, viewRoute, viewStop, viewNotification} from 'src/Redux/actions';

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/students',
    icon: UsersIcon,
    title: 'Students'
  },
  {
    href: '/app/drivers',
    icon: UsersIcon,
    title: 'Drivers'
  },
  {
    href: '/app/conductors',
    icon: UsersIcon,
    title: 'Conductors'
  },
  {
    href: '/app/routes',
    icon: UsersIcon,
    title: 'Routes'
  },
  {
    href: '/app/stops',
    icon: UsersIcon,
    title: 'Stops'
  },
  {
    href: '/app/buses',
    icon: UsersIcon,
    title: 'Buses'
  },
  {
    href: '/app/admins',
    icon: UsersIcon,
    title: 'Admins'
  },
  {
    href: '/app/subadmins',
    icon: UsersIcon,
    title: 'Subadmins'
  },
  // {
  //   href: '/app/products',
  //   icon: ShoppingBagIcon,
  //   title: 'Products'
  // },
  {
    href: '/app/trips',
    icon: LockIcon,
    title: 'Trips'
  },
  {
    href: '/app/notifications',
    icon: LockIcon,
    title: 'Notifications'
  },
  {
    href: '/app/feedbacks',
    icon: LockIcon,
    title: 'Feedbacks'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  }
  // {
  //   href: '/login',
  //   icon: LockIcon,
  //   title: 'Login'
  // },
  // {
  //   href: '/register',
  //   icon: UserPlusIcon,
  //   title: 'Register'
  // },
  // {
  //   href: '/404',
  //   icon: AlertCircleIcon,
  //   title: 'Error'
  // }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const state = useSelector(state => state)

  const dispatch = useDispatch()

  const clickHandler = (title) => {
    let t = title.charAt(0).toLowerCase() + title.slice(1)

    if(t === "dashboard" || t === "settings" || t=== "trips" || t === "feedbacks" || t === "account"){}
    else if (t === "drivers" || t === "conductors" || t === "buses" || t === "routes" || t === "stops"|| t === "notifications") {
      axios.get(`https://livebusapi.herokuapp.com/api/admin/${t}/`)
      .then(response => {
        if(t==="buses")
          dispatch(viewBus(response.data));
        else if(t==="conductors")
          dispatch(viewConductor(response.data));
        else if(t==="drivers")
          dispatch(viewDriver(response.data));
        else if(t==="routes")
          dispatch(viewRoute(response.data));
        else if(t === "notifications")
          dispatch(viewNotification(response.data));
        else if(t === "stops")
          dispatch(viewStop(response.data));
      })
      .catch( err => alert(err) )
    }
    else if(t==="students"){
      axios.get(`https://livebusapi.herokuapp.com/api/admin/students/Accept`)
      .then((response)=>{
        dispatch(viewStudent(response.data));
      })
      .catch( err=>alert(err) ) 
    }
    else{
      axios.get(`https://livebusapi.herokuapp.com/api/users/${t}/`)
      .then(response => {
        if(t==="admins")
          dispatch(viewAdmin(response.data));
        else if(t==="subadmins")
          dispatch(viewSubAdmin(response.data));
      })
      .catch( err => alert(err) )
    }
  }

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const user = {
    avatar: '/static/images/avatars/adminLogo.png',
    jobTitle: state.user.role,
    name: state.user.username,
  };

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map(item => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
              onClick={()=>clickHandler(item.title)}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
