import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import SectionWrapper from "../common/SectionWrapper";
import { team } from "../../data/team";

const TeamSection = () => {
  const getInitials = (name) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  };

  const owner = team[0];
  const others = team.slice(1);

  return (
    <SectionWrapper
      id="team"
      title="Our Team"
      subtitle="Meet the creative minds shaping digital excellence."
      bg="white"
    >
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, md: 3 } }}>

        {/* ---------------- OWNER / FOUNDER ---------------- */}
        <Grid
          container
          justifyContent="center"
          sx={{ mb: { xs: 6, md: 10 } }}
        >
          <Grid
            item
            xs={12}
            md={8}
            lg={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              sx={{
                width: "100%",
                maxWidth: 350,
                height: 350,
                borderRadius: "28px",
                p: 4,
                textAlign: "center",
                background: "rgba(255, 255, 255, 0.55)",
                backdropFilter: "blur(12px)",

                // ⭐ Always show premium deep shadow (previous hover shadow)
                boxShadow: "0 5px 10px rgba(30, 100, 230, 0.28)",

                // No hover styles
                transition: "none",
              }}
            >
              {/* Gradient Avatar */}
              <Box
                sx={{
                  mx: "auto",
                  mb: 2,
                  width: 110,
                  height: 110,
                  borderRadius: "50%",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: -3,
                    borderRadius: "50%",
                    padding: "3px",
                    background:
                      "linear-gradient(135deg, #2563eb, #3b82f6, #9333ea)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    animation: "spin 6s linear infinite",
                  },

                  "@keyframes spin": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: "white",
                  }}
                >
                  {getInitials(owner.name)}
                </Box>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                {owner.name}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                {owner.role}
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* ---------------- OTHER TEAM MEMBERS ---------------- */}
        <Grid container spacing={4} justifyContent="center">
          {others.map((member) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={member.name}>
              <Card
                sx={{
                  borderRadius: 2,
                  background: "linear-gradient(180deg, #ffffff, #f8faff)",
                  textAlign: "center",
                  p: 4,

                  // ⭐ Always show premium shadow (previous hover shadow)
                  boxShadow: "0 5px 10px rgba(0,0,0,0.18)",

                  transition: "none",
                }}
              >
                <Box
                  sx={{
                    width: 95,
                    height: 95,
                    borderRadius: "50%",
                    mx: "auto",
                    mb: 2,
                    background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    boxShadow: "0 6px 20px rgba(37,99,235,0.25)",
                  }}
                >
                  {getInitials(member.name)}
                </Box>

                <CardContent sx={{ p: 0 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {member.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, color: "text.secondary" }}
                  >
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </SectionWrapper>
  );
};

export default TeamSection;
