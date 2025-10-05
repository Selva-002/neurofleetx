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
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import {
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material'

const Maintenance = () => {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    fetchMaintenanceData()
  }, [])

  const fetchMaintenanceData = async () => {
    try {
      const token = localStorage.getItem('token') // JWT token from login
      const response = await fetch('http://localhost:8080/api/maintenance/alerts', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
  
      if (!response.ok) throw new Error('Failed to fetch maintenance data')
      const data = await response.json()
      setAlerts(data)
    } catch (err) {
      setError('Failed to load maintenance data')
      console.error('Maintenance error:', err)
    } finally {
      setLoading(false)
    }
  }
  

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedAlert(null)
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return <ErrorIcon color="error" />
      case 'HIGH':
        return <WarningIcon color="warning" />
      case 'MEDIUM':
        return <InfoIcon color="info" />
      case 'LOW':
        return <CheckIcon color="success" />
      default:
        return <InfoIcon color="action" />
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return 'error'
      case 'HIGH':
        return 'warning'
      case 'MEDIUM':
        return 'info'
      case 'LOW':
        return 'success'
      default:
        return 'default'
    }
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading maintenance data...
        </Typography>
      </Container>
    )
  }

  // Mock data for demonstration
  const mockAlerts = [
    {
      id: 1,
      vehicleId: 1,
      vehicleLicensePlate: 'ABC-123',
      alertType: 'MAINTENANCE_DUE',
      severity: 'HIGH',
      description: 'Regular maintenance due based on mileage (45,000 miles)',
      recommendedAction: 'Schedule comprehensive inspection and replace wear parts',
      detectedAt: '2024-01-15T10:30:00',
      estimatedMaintenanceDate: '2024-01-22T09:00:00',
      confidenceScore: 0.92,
      status: 'ACTIVE'
    },
    {
      id: 2,
      vehicleId: 2,
      vehicleLicensePlate: 'XYZ-789',
      alertType: 'LOW_FUEL',
      severity: 'MEDIUM',
      description: 'Fuel level below 20% (18.5%)',
      recommendedAction: 'Refuel vehicle immediately',
      detectedAt: '2024-01-15T14:15:00',
      estimatedMaintenanceDate: '2024-01-15T15:00:00',
      confidenceScore: 0.98,
      status: 'ACTIVE'
    },
    {
      id: 3,
      vehicleId: 3,
      vehicleLicensePlate: 'DEF-456',
      alertType: 'ENGINE_SERVICE',
      severity: 'CRITICAL',
      description: 'Engine service recommended after 5,200 hours',
      recommendedAction: 'Schedule engine service and inspection',
      detectedAt: '2024-01-15T16:45:00',
      estimatedMaintenanceDate: '2024-01-16T08:00:00',
      confidenceScore: 0.89,
      status: 'ACTIVE'
    },
    {
      id: 4,
      vehicleId: 4,
      vehicleLicensePlate: 'GHI-789',
      alertType: 'POOR_HEALTH',
      severity: 'CRITICAL',
      description: 'Vehicle health status is poor - requires immediate attention',
      recommendedAction: 'Remove vehicle from service and schedule immediate repair',
      detectedAt: '2024-01-15T11:20:00',
      estimatedMaintenanceDate: '2024-01-16T07:00:00',
      confidenceScore: 0.95,
      status: 'ACTIVE'
    },
    {
      id: 5,
      vehicleId: 5,
      vehicleLicensePlate: 'JKL-012',
      alertType: 'HIGH_MILEAGE',
      severity: 'MEDIUM',
      description: 'Vehicle approaching high mileage (22,000 miles)',
      recommendedAction: 'Schedule comprehensive inspection and replace wear parts',
      detectedAt: '2024-01-15T09:10:00',
      estimatedMaintenanceDate: '2024-01-25T10:00:00',
      confidenceScore: 0.78,
      status: 'ACTIVE'
    }
  ]

  const criticalAlerts = mockAlerts.filter(alert => alert.severity === 'CRITICAL')
  const highAlerts = mockAlerts.filter(alert => alert.severity === 'HIGH')
  const mediumAlerts = mockAlerts.filter(alert => alert.severity === 'MEDIUM')

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Predictive Maintenance
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Alert Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <ErrorIcon color="error" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" color="error.main">
                    {criticalAlerts.length}
                  </Typography>
                  <Typography color="text.secondary">Critical Alerts</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <WarningIcon color="warning" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" color="warning.main">
                    {highAlerts.length}
                  </Typography>
                  <Typography color="text.secondary">High Priority</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <InfoIcon color="info" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" color="info.main">
                    {mediumAlerts.length}
                  </Typography>
                  <Typography color="text.secondary">Medium Priority</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <CheckIcon color="success" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" color="success.main">
                    {mockAlerts.length}
                  </Typography>
                  <Typography color="text.secondary">Total Alerts</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Alerts Table */}
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
                  <TableCell>Description</TableCell>
                  <TableCell>Detected</TableCell>
                  <TableCell>Confidence</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockAlerts.map((alert) => (
                  <TableRow key={alert.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {alert.vehicleLicensePlate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {alert.alertType.replace('_', ' ')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getSeverityIcon(alert.severity)}
                        label={alert.severity}
                        color={getSeverityColor(alert.severity)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 200 }}>
                        {alert.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">
                        {new Date(alert.detectedAt).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {(alert.confidenceScore * 100).toFixed(0)}%
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={alert.status}
                        color={alert.status === 'ACTIVE' ? 'warning' : 'success'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleAlertClick(alert)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Alert Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Maintenance Alert Details
        </DialogTitle>
        <DialogContent>
          {selectedAlert && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Vehicle
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedAlert.vehicleLicensePlate}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Alert Type
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedAlert.alertType.replace('_', ' ')}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Severity
                  </Typography>
                  <Chip
                    icon={getSeverityIcon(selectedAlert.severity)}
                    label={selectedAlert.severity}
                    color={getSeverityColor(selectedAlert.severity)}
                    sx={{ mb: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Confidence Score
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {(selectedAlert.confidenceScore * 100).toFixed(1)}%
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Description
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedAlert.description}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Recommended Action
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedAlert.recommendedAction}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Detected At
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {new Date(selectedAlert.detectedAt).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Estimated Maintenance Date
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {new Date(selectedAlert.estimatedMaintenanceDate).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button variant="contained" color="primary">
            Acknowledge Alert
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Maintenance









