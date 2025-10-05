import React, { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip
} from '@mui/material'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'
import api from '../api/axios'

const Admin = () => {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tabValue, setTabValue] = useState(0)
  const [systemStatus, setSystemStatus] = useState('ONLINE')
  const [maintenanceAlerts, setMaintenanceAlerts] = useState([])
  const [userActions, setUserActions] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/api/dashboard/admin/metrics')
      setMetrics(response.data)
    } catch (err) {
      setError('Failed to load admin dashboard data')
      console.error('Admin dashboard error:', err)
    } finally {
      setLoading(false)
    }
  }
  

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleSystemRestart = () => {
    setSystemStatus('RESTARTING')
    alert('🔄 System restart initiated!\n\nSystem will be back online in 2-3 minutes.')
    
    // Simulate restart process
    setTimeout(() => {
      setSystemStatus('ONLINE')
      alert('✅ System restart completed successfully!')
    }, 3000)
  }

  const handleDatabaseBackup = () => {
    const backupInfo = {
      timestamp: new Date().toLocaleString(),
      size: '2.5 GB',
      duration: '3 minutes',
      status: 'COMPLETED'
    }
    
    alert(`💾 Database backup completed!\n\nTimestamp: ${backupInfo.timestamp}\nSize: ${backupInfo.size}\nDuration: ${backupInfo.duration}\nStatus: ${backupInfo.status}`)
  }

  const handleUserManagement = () => {
    const userStats = {
      totalUsers: 256,
      activeUsers: 189,
      newUsersToday: 12,
      adminUsers: 3,
      dispatcherUsers: 8,
      customerUsers: 245
    }
    
    alert(`👥 User Management Overview:\n\nTotal Users: ${userStats.totalUsers}\nActive Users: ${userStats.activeUsers}\nNew Users Today: ${userStats.newUsersToday}\n\nUser Roles:\n- Admins: ${userStats.adminUsers}\n- Dispatchers: ${userStats.dispatcherUsers}\n- Customers: ${userStats.customerUsers}`)
  }

  const handleSystemSettings = () => {
    const systemConfig = {
      serverUptime: '99.9%',
      databaseSize: '2.5 GB',
      apiCallsToday: '15,420',
      errorRate: '0.02%',
      lastMaintenance: '2 hours ago'
    }
    
    alert(`⚙️ System Configuration:\n\nServer Uptime: ${systemConfig.serverUptime}\nDatabase Size: ${systemConfig.databaseSize}\nAPI Calls Today: ${systemConfig.apiCallsToday}\nError Rate: ${systemConfig.errorRate}\nLast Maintenance: ${systemConfig.lastMaintenance}`)
  }

  const handleMaintenanceAlert = (alertId) => {
    const alertActions = {
      1: 'Oil change scheduled for vehicle ABC-123',
      2: 'Fuel level alert resolved for vehicle XYZ-789',
      3: 'Engine service scheduled for vehicle DEF-456'
    }
    
    // Update maintenance alerts status
    setMaintenanceAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: 'RESOLVED', resolvedAt: new Date().toLocaleString() }
          : alert
      )
    )
    
    alert(`🔧 Maintenance Alert ${alertId} Handled!\n\nAction: ${alertActions[alertId] || 'Maintenance task processed successfully'}`)
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading admin dashboard...
        </Typography>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }

  // Mock data for demonstration
  const mockMetrics = {
    totalVehicles: 83,
    availableVehicles: 45,
    vehiclesInUse: 28,
    vehiclesInMaintenance: 5,
    totalBookings: 143,
    pendingBookings: 15,
    completedBookings: 95,
    totalCustomers: 256,
    fleetUtilizationRate: 33.7,
    averageBookingValue: 45.50
  }

  const vehicleTypeData = [
    { name: 'Sedan', value: 25, color: '#8884d8' },
    { name: 'SUV', value: 18, color: '#82ca9d' },
    { name: 'Truck', value: 12, color: '#ffc658' },
    { name: 'Van', value: 15, color: '#ff7300' },
    { name: 'Motorcycle', value: 8, color: '#00ff00' },
    { name: 'Bus', value: 5, color: '#ff0000' }
  ]

  const bookingTypeData = [
    { name: 'Ride Share', value: 45, color: '#8884d8' },
    { name: 'Delivery', value: 32, color: '#82ca9d' },
    { name: 'Freight', value: 18, color: '#ffc658' },
    { name: 'Emergency', value: 5, color: '#ff7300' },
    { name: 'Scheduled', value: 28, color: '#00ff00' }
  ]

  const weeklyData = [
    { name: 'Mon', vehicles: 65, bookings: 12 },
    { name: 'Tue', vehicles: 70, bookings: 19 },
    { name: 'Wed', vehicles: 68, bookings: 15 },
    { name: 'Thu', vehicles: 72, bookings: 22 },
    { name: 'Fri', vehicles: 75, bookings: 18 },
    { name: 'Sat', vehicles: 60, bookings: 8 },
    { name: 'Sun', vehicles: 55, bookings: 5 }
  ]

  const recentAlerts = [
    { id: 1, vehicle: 'ABC-123', type: 'MAINTENANCE_DUE', severity: 'HIGH', message: 'Oil change required' },
    { id: 2, vehicle: 'XYZ-789', type: 'LOW_FUEL', severity: 'MEDIUM', message: 'Fuel level below 20%' },
    { id: 3, vehicle: 'DEF-456', type: 'ENGINE_SERVICE', severity: 'CRITICAL', message: 'Engine service required' }
  ]

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Administrative Dashboard
        </Typography>
        <Chip
          label={`System: ${systemStatus}`}
          color={systemStatus === 'ONLINE' ? 'success' : systemStatus === 'RESTARTING' ? 'warning' : 'error'}
          variant="outlined"
        />
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="System Overview" />
          <Tab label="User Management" />
          <Tab label="System Analytics" />
          <Tab label="Maintenance Management" />
          <Tab label="System Settings" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          {/* Key Metrics */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="primary">
                  {mockMetrics.totalVehicles}
                </Typography>
                <Typography color="text.secondary">Total Vehicles</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="success.main">
                  {mockMetrics.totalBookings}
                </Typography>
                <Typography color="text.secondary">Total Bookings</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="info.main">
                  {mockMetrics.totalCustomers}
                </Typography>
                <Typography color="text.secondary">Total Customers</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="warning.main">
                  {mockMetrics.fleetUtilizationRate}%
                </Typography>
                <Typography color="text.secondary">Fleet Utilization</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Fleet Status Chart */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Fleet Status Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Available', value: mockMetrics.availableVehicles, color: '#4caf50' },
                        { name: 'In Use', value: mockMetrics.vehiclesInUse, color: '#2196f3' },
                        { name: 'Maintenance', value: mockMetrics.vehiclesInMaintenance, color: '#ff9800' }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[
                        { name: 'Available', value: mockMetrics.availableVehicles, color: '#4caf50' },
                        { name: 'In Use', value: mockMetrics.vehiclesInUse, color: '#2196f3' },
                        { name: 'Maintenance', value: mockMetrics.vehiclesInMaintenance, color: '#ff9800' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Weekly Performance */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Weekly Performance
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="vehicles" stroke="#2196f3" strokeWidth={2} />
                    <Line type="monotone" dataKey="bookings" stroke="#4caf50" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Vehicle Types Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={vehicleTypeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Fleet Health Status
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Excellent', value: 35, color: '#4caf50' },
                        { name: 'Good', value: 28, color: '#8bc34a' },
                        { name: 'Fair', value: 15, color: '#ff9800' },
                        { name: 'Poor', value: 5, color: '#f44336' }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[
                        { name: 'Excellent', value: 35, color: '#4caf50' },
                        { name: 'Good', value: 28, color: '#8bc34a' },
                        { name: 'Fair', value: 15, color: '#ff9800' },
                        { name: 'Poor', value: 5, color: '#f44336' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Booking Types Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={bookingTypeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Booking Status Overview
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Completed', value: 95, color: '#4caf50' },
                        { name: 'In Progress', value: 8, color: '#2196f3' },
                        { name: 'Pending', value: 15, color: '#ff9800' },
                        { name: 'Cancelled', value: 5, color: '#f44336' }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[
                        { name: 'Completed', value: 95, color: '#4caf50' },
                        { name: 'In Progress', value: 8, color: '#2196f3' },
                        { name: 'Pending', value: 15, color: '#ff9800' },
                        { name: 'Cancelled', value: 5, color: '#f44336' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Maintenance Alerts
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Vehicle</TableCell>
                        <TableCell>Alert Type</TableCell>
                        <TableCell>Severity</TableCell>
                        <TableCell>Message</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentAlerts.map((alert) => (
                        <TableRow key={alert.id}>
                          <TableCell>{alert.vehicle}</TableCell>
                          <TableCell>{alert.type}</TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                color: alert.severity === 'CRITICAL' ? 'error.main' : 
                                       alert.severity === 'HIGH' ? 'warning.main' : 'info.main',
                                fontWeight: 'bold'
                              }}
                            >
                              {alert.severity}
                            </Box>
                          </TableCell>
                          <TableCell>{alert.message}</TableCell>
                          <TableCell>
                            <Chip
                              label="ACTIVE"
                              color="warning"
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Button 
                              size="small" 
                              variant="outlined"
                              onClick={() => handleMaintenanceAlert(alert.id)}
                            >
                              Handle
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* User Management Tab */}
      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  User Management
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleUserManagement}
                  >
                    Manage Users
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="secondary"
                    onClick={handleUserManagement}
                  >
                    View User Activity
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="info"
                    onClick={handleUserManagement}
                  >
                    Role Management
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* System Analytics Tab */}
      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  System Performance
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  System uptime: 99.9%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active users: 256
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  API calls today: 15,420
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Error rate: 0.02%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Database Status
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Database size: 2.5 GB
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last backup: 2 hours ago
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={handleDatabaseBackup}
                  sx={{ mt: 2 }}
                >
                  Create Backup
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* System Settings Tab */}
      {tabValue === 4 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  System Settings
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleSystemSettings}
                  >
                    General Settings
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="secondary"
                    onClick={handleSystemSettings}
                  >
                    Security Settings
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="warning"
                    onClick={handleSystemRestart}
                  >
                    System Restart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  )
}

export default Admin








