import apiInstance from "@/api/apiInstance";

const handleLogout = async () => {
  try {
    await apiInstance.get("/auth/logout", { withCredentials: true });
    window.location.replace("/login");
  } catch (error) {
    console.log(error);
  }
};

export default handleLogout;
