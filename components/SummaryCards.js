import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, CircularProgress } from '@mui/material';
import { FaFileAlt, FaDatabase, FaCalendarAlt, FaExclamationTriangle, FaUpload } from 'react-icons/fa';
import axios from 'axios';

const SummaryCards = ({ totalFiles, totalRecords, lastUploadDate, dataValidity, isProcessing, onFileUpload }) => {
  const [uploading, setUploading] = useState(false);


  return (
    <div style={{ padding: '24px' }}>
      <Grid container spacing={3}>
        {/* Total Files Uploaded */}
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined" style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <FaFileAlt style={{ marginRight: '8px', color: '#6c63ff' }} />
                Total Files
              </Typography>
              <Typography variant="h4" style={{ fontWeight: 'bold', color: '#333' }}>{totalFiles}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Records */}
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined" style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <FaDatabase style={{ marginRight: '8px', color: '#6c63ff' }} />
                Total Records
              </Typography>
              <Typography variant="h4" style={{ fontWeight: 'bold', color: '#333' }}>{totalRecords}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Last Upload Date */}
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined" style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <FaCalendarAlt style={{ marginRight: '8px', color: '#6c63ff' }} />
                Last Upload
              </Typography>
              <Typography variant="body1" style={{ color: '#555' }}>{lastUploadDate || "N/A"}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Data Validity */}
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined" style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <FaExclamationTriangle style={{ marginRight: '8px', color: dataValidity === "Valid" ? '#4caf50' : '#ff5252' }} />
                Data Validity
              </Typography>
              <Typography variant="body1" style={{ color: dataValidity === "Valid" ? '#4caf50' : '#ff5252' }}>
                {dataValidity || "Unknown"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Processing Status */}
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined" style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Typography variant="h6" color="textSecondary" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <FaDatabase style={{ marginRight: '8px', color: '#6c63ff' }} />
                Processing Status
              </Typography>
              {isProcessing ? (
                <CircularProgress size={28} color="primary" />
              ) : (
                <Typography variant="body1" style={{ color: '#4caf50' }}>Completed</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </div>
  );
};

export default SummaryCards;
