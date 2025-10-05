import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button
} from '@mui/material'
import {
  DirectionsCar as FleetIcon,
  BookOnline as BookingsIcon,
  Analytics as AnalyticsIcon,
  Build as MaintenanceIcon
} from '@mui/icons-material'

const Home = () => {
  const { user } = useAuth()

  const features = [
    {
      title: 'Fleet Management',
      description: 'Real-time vehicle tracking and management',
      icon: <FleetIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2'
    },
    {
      title: 'Smart Bookings',
      description: 'AI-powered booking and route optimization',
      icon: <BookingsIcon sx={{ fontSize: 40 }} />,
      color: '#388e3c'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights and reporting',
      icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
      color: '#f57c00'
    },
    {
      title: 'Predictive Maintenance',
      description: 'AI-driven maintenance alerts and scheduling',
      icon: <MaintenanceIcon sx={{ fontSize: 40 }} />,
      color: '#d32f2f'
    }
  ]

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          NeuroFleetX
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          AI-Driven Urban Mobility Optimization
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Revolutionizing urban transportation with artificial intelligence, 
          predictive analytics, and real-time optimization.
        </Typography>
      </Box>

      {user ? (
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" gutterBottom>
            Welcome back, {user.username}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Access your dashboard to manage your fleet and bookings.
          </Typography>
        </Box>
      ) : (
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" gutterBottom>
            Get Started Today
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Join thousands of users optimizing their urban mobility with AI.
          </Typography>
          <Button variant="contained" size="large" href="/register">
            Sign Up Now
          </Button>
        </Box>
      )}

      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ color: feature.color, mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" component="h2" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={6} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Why Choose NeuroFleetX?
        </Typography>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              🚀 AI-Powered Optimization
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Advanced machine learning algorithms optimize routes, reduce costs, 
              and improve efficiency automatically.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              📊 Real-Time Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Comprehensive dashboards provide insights into fleet performance, 
              usage patterns, and maintenance needs.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              🔧 Predictive Maintenance
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Prevent breakdowns before they happen with AI-driven maintenance 
              predictions and automated alerts.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Home









