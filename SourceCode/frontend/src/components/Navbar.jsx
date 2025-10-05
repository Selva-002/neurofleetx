import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  DirectionsCar as FleetIcon,
  BookOnline as BookingsIcon,
  AdminPanelSettings as AdminIcon,
  Build as MaintenanceIcon,
  AccountCircle as AccountIcon,
  Logout as LogoutIcon
} from '@mui/icons-material'

const Navbar = () => {
  const { user, logout, hasRole } = useAuth()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    handleClose()
  }

  const isAdmin = hasRole(['ROLE_ADMIN'])
  const isDispatcher = hasRole(['ROLE_DISPATCHER'])
  const isAdminOrDispatcher = hasRole(['ROLE_ADMIN', 'ROLE_DISPATCHER'])

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            NeuroFleetX
          </Link>
        </Typography>
        
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button color="inherit" component={Link} to="/dashboard">
              <DashboardIcon sx={{ mr: 1 }} />
              Dashboard
            </Button>
            
            <Button color="inherit" component={Link} to="/fleet">
              <FleetIcon sx={{ mr: 1 }} />
              Fleet
            </Button>
            
            <Button color="inherit" component={Link} to="/bookings">
              <BookingsIcon sx={{ mr: 1 }} />
              Bookings
            </Button>
            
            {isAdmin && (
              <Button color="inherit" component={Link} to="/admin">
                <AdminIcon sx={{ mr: 1 }} />
                Admin
              </Button>
            )}
            
            {isDispatcher && (
              <Button color="inherit" component={Link} to="/dispatcher">
                <AdminIcon sx={{ mr: 1 }} />
                Dispatcher
              </Button>
            )}
            
            {isAdminOrDispatcher && (
              <Button color="inherit" component={Link} to="/maintenance">
                <MaintenanceIcon sx={{ mr: 1 }} />
                Maintenance
              </Button>
            )}
            
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Typography variant="body2" color="text.secondary">
                  {user.username} ({user.roles?.[0]?.replace('ROLE_', '')})
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar








