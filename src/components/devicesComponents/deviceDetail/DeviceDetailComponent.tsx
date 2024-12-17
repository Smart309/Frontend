import { Grid, Typography } from "@mui/material";
import { IDevice } from "../../../interface/IDevice"; // Update the path accordingly

const DeviceDetailComponent = ({ deviceData }: { deviceData: IDevice }) => {
  const deviceDetails = deviceData.details; // Extracting the DeviceDetails from the deviceData object
  
  return (
    <Grid container spacing={3}>
      {/* Basic Information Section */}
      <Grid item xs={12} md={6}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Basic Information
        </Typography>
        <Typography>Hostname: {deviceData.hostname}</Typography>
        <Typography>IP Address: {deviceData.ip_address}</Typography>
        <Typography>Host Group: {deviceData.hostgroup}</Typography>
        <Typography>SNMP Version: {deviceData.snmp_version}</Typography>
        <Typography>SNMP Port: {deviceData.snmp_port}</Typography>
      </Grid>
      
      {/* Device Details Section */}
      <Grid item xs={12} md={6}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Device Details
        </Typography>
        <Typography>Location: {deviceDetails.location}</Typography>
        <Typography>Room: {deviceDetails.Room}</Typography>
        <Typography>Serial Number: {deviceDetails.serialNo}</Typography>
        <Typography>OS: {deviceDetails.os}</Typography>
        <Typography>Type: {deviceDetails.type}</Typography>
        <Typography>Vendor: {deviceDetails.vendor}</Typography>
        <Typography>Hardware: {deviceDetails.hardware}</Typography>
      </Grid>
    </Grid>
  );
};

export default DeviceDetailComponent;
