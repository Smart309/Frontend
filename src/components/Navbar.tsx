import { Button, Grid } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

const Navbar = () => {
  const iconStyle = {
    color: "#F8F8F8",
    backgroundColor: "#393939",
    borderRadius: "50%",
    padding: "5px",
  };

  return (
    <>
      <Grid container>
        {/* //Grid left */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div className="box-left">
            <h1>Today</h1>
            <p>23 April 2024. Tuesday</p>
            <Button
              id="Allbtn"
              variant="outlined"
              startIcon={<Inventory2OutlinedIcon sx={iconStyle} />}
            >
              <span className="showAlltask">All</span>
              {/* <span className="showIncompeletetask">10</span> */}
            </Button>

            <Button
              id="Todaybtn"
              variant="outlined"
              startIcon={<CalendarTodayOutlinedIcon sx={iconStyle} />}
            >
              <span className="showTodaytask">Today</span>
              {/* <span className="showIncompeletetask">{todayTaskCount}</span> */}
            </Button>
          </div>

          {/* Add-New-Task-btn */}
          <div className="AddTaskBox"></div>
        </Grid>

        {/* //Grid right */}
        <Grid item xs={12} md={9}>
          <div className="box-right">
            <div className="header">
              <h1>All</h1>
              {/* <SelfTodoFilter /> */}
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Navbar;
