import React, { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'

const BASE_URL = 'http://localhost:8080'

const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [editingBooking, setEditingBooking] = useState(null)
  const [formData, setFormData] = useState({
    customerId: 1,
    pickupLatitude: '',
    pickupLongitude: '',
    dropLatitude: '',
    dropLongitude: '',
    pickupAddress: '',
    dropAddress: '',
    type: 'RIDE_SHARE',
    status: 'PENDING',
    specialRequirements: ''
  })

  useEffect(() => {
    fetchBookings()
  }, [])

  // Fetch bookings
  const fetchBookings = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${BASE_URL}/api/bookings`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const contentType = response.headers.get('content-type')
      if (!response.ok || !contentType?.includes('application/json')) {
        throw new Error('Failed to fetch bookings')
      }
      const data = await response.json()
      setBookings(data)
    } catch (err) {
      setError('Failed to load bookings data')
      console.error('Bookings error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (booking = null) => {
    if (booking) {
      setEditingBooking(booking)
      setFormData({
        customerId: booking.customerId || 1,
        pickupLatitude: booking.pickupLatitude || '',
        pickupLongitude: booking.pickupLongitude || '',
        dropLatitude: booking.dropLatitude || '',
        dropLongitude: booking.dropLongitude || '',
        pickupAddress: booking.pickupAddress || '',
        dropAddress: booking.dropAddress || '',
        type: booking.type || 'RIDE_SHARE',
        status: booking.status || 'PENDING',
        specialRequirements: booking.specialRequirements || ''
      })
    } else {
      setEditingBooking(null)
      setFormData({
        customerId: 1,
        pickupLatitude: '',
        pickupLongitude: '',
        dropLatitude: '',
        dropLongitude: '',
        pickupAddress: '',
        dropAddress: '',
        type: 'RIDE_SHARE',
        status: 'PENDING',
        specialRequirements: ''
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingBooking(null)
  }

  // Create / Update booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
  
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");
  
      const url = editingBooking
        ? `http://localhost:8080/api/bookings/${editingBooking.id}`
        : "http://localhost:8080/api/bookings";
      const method = editingBooking ? "PUT" : "POST";
  
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      const contentType = response.headers.get("content-type");
      if (!response.ok || !contentType?.includes("application/json")) {
        // Read the error message from server if available
        const errorData = contentType?.includes("application/json")
          ? await response.json()
          : null;
        const message = errorData?.message || "Failed to save booking";
        throw new Error(message);
      }
  
      handleCloseDialog();
      fetchBookings(); // Refresh bookings
    } catch (err) {
      console.error("Booking save error:", err);
      setError(err.message || "Failed to save booking");
    }
  };
  
  // Delete booking
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${BASE_URL}/api/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok) throw new Error('Failed to delete booking')
      fetchBookings()
    } catch (err) {
      setError('Failed to delete booking')
      console.error('Bookings delete error:', err)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'warning'
      case 'CONFIRMED': return 'info'
      case 'IN_PROGRESS': return 'primary'
      case 'COMPLETED': return 'success'
      case 'CANCELLED': return 'error'
      default: return 'default'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'RIDE_SHARE': return 'primary'
      case 'DELIVERY': return 'secondary'
      case 'FREIGHT': return 'warning'
      case 'EMERGENCY': return 'error'
      case 'SCHEDULED': return 'info'
      default: return 'default'
    }
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading bookings data...</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">Bookings Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>New Booking</Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Bookings Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="primary">{bookings.length}</Typography>
              <Typography color="text.secondary">Total Bookings</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="warning.main">{bookings.filter(b => b.status === 'PENDING').length}</Typography>
              <Typography color="text.secondary">Pending</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="info.main">{bookings.filter(b => b.status === 'IN_PROGRESS').length}</Typography>
              <Typography color="text.secondary">In Progress</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="success.main">{bookings.filter(b => b.status === 'COMPLETED').length}</Typography>
              <Typography color="text.secondary">Completed</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bookings Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Pickup</TableCell>
                <TableCell>Drop-off</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Vehicle</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>#{booking.id}</TableCell>
                  <TableCell><Chip label={booking.type} color={getTypeColor(booking.type)} size="small" /></TableCell>
                  <TableCell><Chip label={booking.status} color={getStatusColor(booking.status)} size="small" /></TableCell>
                  <TableCell>
                    {booking.pickupAddress || 'No address'}<br />
                    {booking.pickupLatitude?.toFixed(4)}, {booking.pickupLongitude?.toFixed(4)}
                  </TableCell>
                  <TableCell>
                    {booking.dropAddress || 'No address'}<br />
                    {booking.dropLatitude?.toFixed(4)}, {booking.dropLongitude?.toFixed(4)}
                  </TableCell>
                  <TableCell>Customer #{booking.customerId}</TableCell>
                  <TableCell>{booking.vehicleId ? `Vehicle #${booking.vehicleId}` : 'Unassigned'}</TableCell>
                  <TableCell>
                    <Button size="small" startIcon={<EditIcon />} onClick={() => handleOpenDialog(booking)}>Edit</Button>
                    <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(booking.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Add/Edit Booking Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editingBooking ? 'Edit Booking' : 'Create New Booking'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} label="Type">
                    <MenuItem value="RIDE_SHARE">Ride Share</MenuItem>
                    <MenuItem value="DELIVERY">Delivery</MenuItem>
                    <MenuItem value="FREIGHT">Freight</MenuItem>
                    <MenuItem value="EMERGENCY">Emergency</MenuItem>
                    <MenuItem value="SCHEDULED">Scheduled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} label="Status">
                    <MenuItem value="PENDING">Pending</MenuItem>
                    <MenuItem value="CONFIRMED">Confirmed</MenuItem>
                    <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                    <MenuItem value="COMPLETED">Completed</MenuItem>
                    <MenuItem value="CANCELLED">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Pickup Address" value={formData.pickupAddress} onChange={e => setFormData({...formData, pickupAddress: e.target.value})} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Drop-off Address" value={formData.dropAddress} onChange={e => setFormData({...formData, dropAddress: e.target.value})} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Pickup Latitude" type="number" value={formData.pickupLatitude} onChange={e => setFormData({...formData, pickupLatitude: parseFloat(e.target.value)})} required /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Pickup Longitude" type="number" value={formData.pickupLongitude} onChange={e => setFormData({...formData, pickupLongitude: parseFloat(e.target.value)})} required /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Drop-off Latitude" type="number" value={formData.dropLatitude} onChange={e => setFormData({...formData, dropLatitude: parseFloat(e.target.value)})} required /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Drop-off Longitude" type="number" value={formData.dropLongitude} onChange={e => setFormData({...formData, dropLongitude: parseFloat(e.target.value)})} required /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Special Requirements" multiline rows={3} value={formData.specialRequirements} onChange={e => setFormData({...formData, specialRequirements: e.target.value})} /></Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained">{editingBooking ? 'Update' : 'Create'} Booking</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  )
}

export default Bookings




