import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { login as loginApi } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async () => {
    const res = await loginApi({ email, password });
    if (res.token) {
      login(res.token);
      navigate("/admin");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10 }}>
      <Typography variant="h5" mb={2}>Admin Login</Typography>
      <TextField fullWidth label="Email" value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <TextField fullWidth type="password" label="Password"
        sx={{ mt: 2 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
      <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={submit}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
