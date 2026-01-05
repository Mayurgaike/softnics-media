import { Box, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Clients", path: "/admin/clients" },
  { label: "Services", path: "/admin/services" },
  { label: "Blogs", path: "/admin/blogs" },
  { label: "Team", path: "/admin/team" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((s) => (
          <Grid item xs={12} sm={6} md={3} key={s.label}>
            <Paper
              onClick={() => navigate(s.path)}
              sx={{
                p: 3,
                cursor: "pointer",
                borderRadius: 2,
                transition: "0.2s",
                "&:hover": {
                  boxShadow: 6,
                },
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Manage
              </Typography>
              <Typography variant="h6" fontWeight={700}>
                {s.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
