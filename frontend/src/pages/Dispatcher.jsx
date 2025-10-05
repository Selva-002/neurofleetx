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
import {
  DirectionsCar as FleetIcon,
  BookOnline as BookingsIcon,
  Build as MaintenanceIcon,
  TrendingUp as TrendingIcon,
  Warning as WarningIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material'
import api from '../api/axios'

const Dispatcher = () => {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tabValue, setTabValue] = useState(0)
  const [pendingBookings, setPendingBookings] = useState([])
  const [availableVehicles, setAvailableVehicles] = useState([])
  const [assignments, setAssignments] = useState([])

  useEffect(() => {
    fetchDashboardData()
    initializeDemoData()
  }, [])

  const initializeDemoData = () => {
    // Initialize demo data for presentation
    setPendingBookings([
      { id: 1234, customer: 'John Smith', pickup: 'Central Station', drop: 'Airport', priority: 'HIGH' },
      { id: 1235, customer: 'Jane Doe', pickup: 'Downtown', drop: 'Mall', priority: 'MEDIUM' },
      { id: 1236, customer: 'Mike Johnson', pickup: 'University', drop: 'Hospital', priority: 'HIGH' }
    ])
    
    setAvailableVehicles([
      { id: 'ABC-123', type: 'SEDAN', driver: 'John Doe', location: 'Central Station' },
      { id: 'XYZ-789', type: 'SUV', driver: 'Jane Smith', location: 'Downtown' },
      { id: 'DEF-456', type: 'VAN', driver: 'Mike Johnson', location: 'Airport' }
    ])
  }

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/api/dashboard/metrics')
      setMetrics(response.data)
    } catch (err) {
      setError('Failed to load dispatcher dashboard data')
      console.error('Dispatcher dashboard error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleAssignVehicles = () => {
    // Simulate vehicle assignment process
    const mockAssignments = [
      { bookingId: 1234, vehicleId: 'ABC-123', driver: 'John Doe', status: 'ASSIGNED' },
      { bookingId: 1235, vehicleId: 'XYZ-789', driver: 'Jane Smith', status: 'ASSIGNED' },
      { bookingId: 1236, vehicleId: 'DEF-456', driver: 'Mike Johnson', status: 'ASSIGNED' }
    ]
    
    setAssignments(prev => [...prev, ...mockAssignments])
    
    // Update pending bookings
    setPendingBookings(prev => prev.filter(booking => 
      !mockAssignments.some(assignment => assignment.bookingId === booking.id)
    ))
    
    alert(`✅ Successfully assigned ${mockAssignments.length} vehicles to pending bookings!`)
  }

  const handleOptimizeRoutes = () => {
    // Simulate route optimization
    const optimizedRoutes = [
      { routeId: 1, distance: '12.5 km', duration: '18 min', efficiency: '95%' },
      { routeId: 2, distance: '8.2 km', duration: '12 min', efficiency: '98%' },
      { routeId: 3, distance: '15.1 km', duration: '22 min', efficiency: '92%' }
    ]
    
    alert(`🚀 Route optimization completed!\n\nOptimized ${optimizedRoutes.length} routes:\n${optimizedRoutes.map(route => 
      `Route ${route.routeId}: ${route.distance} (${route.duration}) - ${route.efficiency} efficiency`
    ).join('\n')}`)
  }

  const handleReviewBookingQueue = () => {
    // Simulate booking queue review
    const queueStats = {
      total: 15,
      highPriority: 3,
      mediumPriority: 8,
      lowPriority: 4,
      averageWaitTime: '12 minutes'
    }
    
    alert(`📋 Booking Queue Review:\n\nTotal pending: ${queueStats.total}\nHigh priority: ${queueStats.highPriority}\nMedium priority: ${queueStats.mediumPriority}\nLow priority: ${queueStats.lowPriority}\nAverage wait time: ${queueStats.averageWaitTime}`)
  }

  const handleUrgentTask = (taskId) => {
    // Simulate urgent task handling
    const taskActions = {
      1: 'Vehicle ABC-123 assigned to booking #1234',
      2: 'Maintenance scheduled for vehicle XYZ-789',
      3: 'Routes optimized for 5 pending bookings',
      4: 'Fuel alert resolved for vehicle DEF-456'
    }
    
    alert(`⚡ Urgent Task ${taskId} Handled!\n\nAction: ${taskActions[taskId] || 'Task processed successfully'}`)
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading dispatcher dashboard...
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

  const operationalData = [
    { name: 'Available', value: mockMetrics.availableVehicles, color: '#4caf50' },
    { name: 'In Use', value: mockMetrics.vehiclesInUse, color: '#2196f3' },
    { name: 'Maintenance', value: mockMetrics.vehiclesInMaintenance, color: '#ff9800' }
  ]

  const bookingStatusData = [
    { name: 'Pending', value: 15, color: '#ff9800' },
    { name: 'In Progress', value: 8, color: '#2196f3' },
    { name: 'Completed', value: 95, color: '#4caf50' },
    { name: 'Cancelled', value: 5, color: '#f44336' }
  ]

  const dailyOperations = [
    { name: 'Mon', bookings: 12, vehicles: 65 },
    { name: 'Tue', bookings: 19, vehicles: 70 },
    { name: 'Wed', bookings: 15, vehicles: 68 },
    { name: 'Thu', bookings: 22, vehicles: 72 },
    { name: 'Fri', bookings: 18, vehicles: 75 },
    { name: 'Sat', bookings: 8, vehicles: 60 },
    { name: 'Sun', bookings: 5, vehicles: 55 }
  ]

  const urgentTasks = [
    { id: 1, type: 'BOOKING_ASSIGNMENT', priority: 'HIGH', description: 'Assign vehicle to booking #1234', vehicle: 'ABC-123', booking: '#1234' },
    { id: 2, type: 'MAINTENANCE_ALERT', priority: 'CRITICAL', description: 'Vehicle XYZ-789 needs immediate service', vehicle: 'XYZ-789', booking: '-' },
    { id: 3, type: 'ROUTE_OPTIMIZATION', priority: 'MEDIUM', description: 'Optimize routes for 5 pending bookings', vehicle: '-', booking: 'Multiple' },
    { id: 4, type: 'FUEL_ALERT', priority: 'HIGH', description: 'Vehicle DEF-456 fuel level critical', vehicle: 'DEF-456', booking: '-' }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'CRITICAL': return 'error'
      case 'HIGH': return 'warning'
      case 'MEDIUM': return 'info'
      case 'LOW': return 'success'
      default: return 'default'
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dispatcher Operations Center
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Operations Overview" />
          <Tab label="Fleet Status" />
          <Tab label="Booking Management" />
          <Tab label="Urgent Tasks" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          {/* Key Operational Metrics */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <FleetIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4">{mockMetrics.availableVehicles}</Typography>
                    <Typography color="text.secondary">Available Vehicles</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <BookingsIcon color="warning" sx={{ mr: 2, fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4">{mockMetrics.pendingBookings}</Typography>
                    <Typography color="text.secondary">Pending Bookings</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <MaintenanceIcon color="error" sx={{ mr: 2, fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4">{mockMetrics.vehiclesInMaintenance}</Typography>
                    <Typography color="text.secondary">In Maintenance</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <TrendingIcon color="success" sx={{ mr: 2, fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4">{mockMetrics.fleetUtilizationRate}%</Typography>
                    <Typography color="text.secondary">Fleet Utilization</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Fleet Status Overview */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Fleet Status Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={operationalData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {operationalData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Daily Operations */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Daily Operations Trend
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyOperations}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="bookings" stroke="#2196f3" strokeWidth={2} name="Bookings" />
                    <Line type="monotone" dataKey="vehicles" stroke="#4caf50" strokeWidth={2} name="Active Vehicles" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Fleet Status Overview
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box textAlign="center" p={2} bgcolor="success.light" borderRadius={1}>
                      <Typography variant="h4" color="success.dark">
                        {mockMetrics.availableVehicles}
                      </Typography>
                      <Typography variant="body2">Available</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box textAlign="center" p={2} bgcolor="info.light" borderRadius={1}>
                      <Typography variant="h4" color="info.dark">
                        {mockMetrics.vehiclesInUse}
                      </Typography>
                      <Typography variant="body2">In Use</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box textAlign="center" p={2} bgcolor="warning.light" borderRadius={1}>
                      <Typography variant="h4" color="warning.dark">
                        {mockMetrics.vehiclesInMaintenance}
                      </Typography>
                      <Typography variant="body2">Maintenance</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box textAlign="center" p={2} bgcolor="error.light" borderRadius={1}>
                      <Typography variant="h4" color="error.dark">
                        2
                      </Typography>
                      <Typography variant="body2">Out of Service</Typography>
                    </Box>
                  </Grid>
                </Grid>
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
                  Pending Bookings ({pendingBookings.length})
                </Typography>
                <Box display="flex" flexDirection="column" gap={1}>
                  {pendingBookings.map((booking) => (
                    <Box key={booking.id} display="flex" justifyContent="space-between" alignItems="center" p={1} bgcolor="grey.50" borderRadius={1}>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">#{booking.id}</Typography>
                        <Typography variant="caption">{booking.customer}</Typography>
                      </Box>
                      <Chip 
                        label={booking.priority} 
                        color={booking.priority === 'HIGH' ? 'error' : 'warning'} 
                        size="small" 
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Available Vehicles ({availableVehicles.length})
                </Typography>
                <Box display="flex" flexDirection="column" gap={1}>
                  {availableVehicles.map((vehicle) => (
                    <Box key={vehicle.id} display="flex" justifyContent="space-between" alignItems="center" p={1} bgcolor="success.light" borderRadius={1}>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">{vehicle.id}</Typography>
                        <Typography variant="caption">{vehicle.driver} - {vehicle.location}</Typography>
                      </Box>
                      <Chip label={vehicle.type} color="success" size="small" />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Booking Status Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={bookingStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {bookingStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Booking Management Actions
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<ScheduleIcon />}
                    onClick={handleAssignVehicles}
                  >
                    Assign Vehicles to Pending Bookings
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    startIcon={<TrendingIcon />}
                    onClick={handleOptimizeRoutes}
                  >
                    Optimize Routes
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="info" 
                    startIcon={<BookingsIcon />}
                    onClick={handleReviewBookingQueue}
                  >
                    Review Booking Queue
                  </Button>
                </Box>
                
                {/* Show recent assignments */}
                {assignments.length > 0 && (
                  <Box mt={3}>
                    <Typography variant="subtitle2" gutterBottom>
                      Recent Assignments:
                    </Typography>
                    {assignments.slice(-3).map((assignment, index) => (
                      <Chip
                        key={index}
                        label={`Booking #${assignment.bookingId} → ${assignment.vehicleId}`}
                        color="success"
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                )}
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
                  Urgent Tasks & Alerts
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Task Type</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Vehicle</TableCell>
                        <TableCell>Booking</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {urgentTasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell>{task.type.replace('_', ' ')}</TableCell>
                          <TableCell>
                            <Chip
                              label={task.priority}
                              color={getPriorityColor(task.priority)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{task.description}</TableCell>
                          <TableCell>{task.vehicle}</TableCell>
                          <TableCell>{task.booking}</TableCell>
                          <TableCell>
                            <Button 
                              size="small" 
                              variant="outlined"
                              onClick={() => handleUrgentTask(task.id)}
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
    </Container>
  )
}

export default Dispatcher
