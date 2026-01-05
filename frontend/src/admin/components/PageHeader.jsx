import { Box, Typography, Button } from "@mui/material";

const PageHeader = ({ title, actionLabel, onAction }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Typography variant="h6" fontWeight={700}>
        {title}
      </Typography>

      {actionLabel && (
        <Button variant="contained" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default PageHeader;
