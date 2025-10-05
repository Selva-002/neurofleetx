import React, { useState, useEffect } from 'react'
import {
  Container, Typography, Grid, Card, CardContent, Box, Button, Chip,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem
} from '@mui/material'
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, LocationOn as LocationIcon } from '@mui/icons-material'

const API_BASE = 'http://localhost:8080/api/vehicles' // backend URL

const Fleet = () => {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [formData, setFormData] = useState({
    licensePlate: '',
    make: '',
    model: '',
    year: '',
    type: 'SEDAN',
    status: 'AVAILABLE'
  })

  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    setLoading(true)
    try {
      const response = await fetch(API_BASE, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) throw new Error(`Failed to fetch vehicles: ${response.status}`)
      const data = await response.json()
      setVehicles(data)
    } catch (err) {
      setError('Failed to load fleet data')
      console.error('Fleet error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (vehicle = null) => {
    if (vehicle) {
      setEditingVehicle(vehicle)
      setFormData({ ...vehicle })
    } else {
      setEditingVehicle(null)
      setFormData({
        licensePlate: '',
        make: '',
        model: '',
        year: '',
        type: 'SEDAN',
        status: 'AVAILABLE'
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingVehicle(null)
  }

 
  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      setError('User not authenticated')
      return
    }
  
    const url = editingVehicle ? `${API_BASE}/${editingVehicle.id}` : API_BASE
    const method = editingVehicle ? 'PUT' : 'POST'
  
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
  
      if (!response.ok) {
        let errMsg = `Failed: ${response.status}`
        try {
          const data = await response.json()
          errMsg += ` - ${data.message || JSON.stringify(data)}`
        } catch (_) {}
        throw new Error(errMsg)
      }
  
      handleCloseDialog()
      fetchVehicles()
    } catch (err) {
      setError('Failed to save vehicle')
      console.error('Vehicle error:', err)
    }
  }
  

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok) throw new Error(`Failed to delete vehicle: ${response.status}`)
      fetchVehicles()
    } catch (err) {
      setError('Failed to delete vehicle')
      console.error('Delete error:', err)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'AVAILABLE': return 'success'
      case 'IN_USE': return 'info'
      case 'MAINTENANCE': return 'warning'
      case 'OUT_OF_SERVICE': return 'error'
      default: return 'default'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'SEDAN': return 'primary'
      case 'SUV': return 'secondary'
      case 'TRUCK': return 'warning'
      case 'VAN': return 'info'
      case 'MOTORCYCLE': return 'success'
      case 'BUS': return 'error'
      default: return 'default'
    }
  }

  if (loading) return (
    <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
      <CircularProgress />
      <Typography variant="h6" sx={{ mt: 2 }}>Loading fleet data...</Typography>
    </Container>
  )

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Fleet Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>Add Vehicle</Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card><CardContent><Typography variant="h4" color="primary">{vehicles.length}</Typography><Typography color="text.secondary">Total Vehicles</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card><CardContent><Typography variant="h4" color="success.main">{vehicles.filter(v => v.status === 'AVAILABLE').length}</Typography><Typography color="text.secondary">Available</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card><CardContent><Typography variant="h4" color="info.main">{vehicles.filter(v => v.status === 'IN_USE').length}</Typography><Typography color="text.secondary">In Use</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card><CardContent><Typography variant="h4" color="warning.main">{vehicles.filter(v => v.status === 'MAINTENANCE').length}</Typography><Typography color="text.secondary">Maintenance</Typography></CardContent></Card>
        </Grid>
      </Grid>

      {/* Vehicles Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>License Plate</TableCell>
                <TableCell>Make & Model</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Fuel Level</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles.map(v => (
                <TableRow key={v.id}>
                  <TableCell>{v.licensePlate}</TableCell>
                  <TableCell>{v.make} {v.model}</TableCell>
                  <TableCell>{v.year}</TableCell>
                  <TableCell><Chip label={v.type} color={getTypeColor(v.type)} size="small" /></TableCell>
                  <TableCell><Chip label={v.status} color={getStatusColor(v.status)} size="small" /></TableCell>
                  <TableCell>{v.currentLatitude && v.currentLongitude ? <Box display="flex" alignItems="center"><LocationIcon fontSize="small" color="action" /><Typography variant="caption" sx={{ ml: 0.5 }}>{v.currentLatitude.toFixed(4)}, {v.currentLongitude.toFixed(4)}</Typography></Box> : <Typography variant="caption" color="text.secondary">No location</Typography>}</TableCell>
                  <TableCell>{v.fuelLevel ? `${v.fuelLevel.toFixed(1)}%` : 'N/A'}</TableCell>
                  <TableCell>
                    <Button size="small" startIcon={<EditIcon />} onClick={() => handleOpenDialog(v)}>Edit</Button>
                    <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(v.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Add/Edit Vehicle Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField fullWidth label="License Plate" value={formData.licensePlate} onChange={e => setFormData({...formData, licensePlate: e.target.value})} required /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Make" value={formData.make} onChange={e => setFormData({...formData, make: e.target.value})} required /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Model" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} required /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Year" type="number" value={formData.year} onChange={e => setFormData({...formData, year: parseInt(e.target.value)})} required /></Grid>
              <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Type</InputLabel><Select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} label="Type"><MenuItem value="SEDAN">Sedan</MenuItem><MenuItem value="SUV">SUV</MenuItem><MenuItem value="TRUCK">Truck</MenuItem><MenuItem value="VAN">Van</MenuItem><MenuItem value="MOTORCYCLE">Motorcycle</MenuItem><MenuItem value="BUS">Bus</MenuItem></Select></FormControl></Grid>
              <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Status</InputLabel><Select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} label="Status"><MenuItem value="AVAILABLE">Available</MenuItem><MenuItem value="IN_USE">In Use</MenuItem><MenuItem value="MAINTENANCE">Maintenance</MenuItem><MenuItem value="OUT_OF_SERVICE">Out of Service</MenuItem></Select></FormControl></Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained">{editingVehicle ? 'Update' : 'Add'} Vehicle</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  )
}

export default Fleet




