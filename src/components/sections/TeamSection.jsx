import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import SectionWrapper from '../common/SectionWrapper';
import { team } from '../../data/team';

const TeamSection = () => {
  return (
    <SectionWrapper
      id="team"
      title="Our Team"
      subtitle="A passionate team powering your digital growth."
      bg="background.paper"
    >
      <Box
        sx={{
          borderRadius: 4,
          border: '3px solid #EF4444', // red strip vibe
          p: { xs: 2, md: 3 },
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          {team.map((member) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={member.name}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 2,
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  p: 1,
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 5,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
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
