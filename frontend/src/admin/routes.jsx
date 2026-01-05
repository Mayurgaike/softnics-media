import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import ClientsList from "./pages/clients/ClientsList";
import ServicesList from "./pages/services/ServicesList";
import TeamList from "./pages/team/TeamList";
import BlogsList from "./pages/blogs/BlogsList";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="clients" element={<ClientsList />} />
        <Route path="services" element={<ServicesList />} />
        <Route path="team" element={<TeamList />} />
        <Route path="blogs" element={<BlogsList />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
