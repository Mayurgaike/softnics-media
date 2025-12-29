import { Box, Typography } from "@mui/material";
import SectionWrapper from "../common/SectionWrapper";
import React, { useState, useEffect } from "react";
import { fetchTeam } from "../../api/api";

const TeamSection = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetchTeam().then(setTeam);
  }, []);

  useEffect(() => {
    console.log("team state updated:", team);
  }, [team]);

  // ✅ SAFE INITIALS FUNCTION
  const getInitials = (name = "") => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  // ✅ WAIT UNTIL DATA IS LOADED
  if (!team.length) {
    return (
      <SectionWrapper
        id="team"
        title="Our Team"
        subtitle="Meet the creative minds shaping digital excellence."
        bg="#E8F0FF"
      >
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography color="text.secondary">Loading team...</Typography>
        </Box>
      </SectionWrapper>
    );
  }

  const owner = team[0];
  const others = team.slice(1);

  return (
    <SectionWrapper
      id="team"
      title="Our Team"
      subtitle="Meet the creative minds shaping digital excellence."
      bg="#E8F0FF"
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
        {/* OWNER CARD */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: { xs: 6, md: 10 },
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 350,
              height: { xs: 290, md: 350 },
              borderRadius: 2,
              backgroundColor: "#f8fafc",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              p: 4,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                mb: 2,
                background: "linear-gradient(135deg,#1e3a8a,#3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                fontWeight: 800,
                color: "#fff",
              }}
            >
              {getInitials(owner.name)}
            </Box>

            <Typography variant="h6" fontWeight={800}>
              {owner.name}
            </Typography>

            <Typography
              variant="body2"
              sx={{ mt: 1, maxWidth: 260, color: "text.secondary" }}
            >
              {owner.role}
            </Typography>
          </Box>
        </Box>

        {/* OTHER TEAM MEMBERS */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 4,
          }}
        >
          {others.map((member) => (
            <Box
              key={member.id || member.name}
              sx={{
                height: 250,
                borderRadius: 1,
                backgroundColor: "#f8fafc",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                p: 3,
              }}
            >
              <Box
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  mb: 2,
                  background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                }}
              >
                {getInitials(member.name)}
              </Box>

              <Typography variant="h6" fontWeight={700}>
                {member.name}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  color: "text.secondary",
                  maxWidth: 220,
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {member.role}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </SectionWrapper>
  );
};

export default TeamSection;
