import ProtectedRoute from "../../components/layout/ProtectedRoute";

const Profile = () => {
  return (
    <ProtectedRoute>
      <div>Profile</div>
    </ProtectedRoute>
  );
};

export default Profile;
