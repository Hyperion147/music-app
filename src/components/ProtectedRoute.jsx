import { Navigate } from "react-router-dom";
import { useAuth } from "../context/FirebaseContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-neon-green">Loading...</div>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
