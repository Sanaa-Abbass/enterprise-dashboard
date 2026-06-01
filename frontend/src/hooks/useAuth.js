
export default function useAuth() {
  const token = localStorage.getItem("access");

  return !!token;
}