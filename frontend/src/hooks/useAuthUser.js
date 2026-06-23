import { useUsers } from "./useUsuario";

export function useAuthUser() {
  const {
    loggedUser,
    isAuthenticated,
    handleLogout
  } = useUsers();

  return {
    user: loggedUser,
    isAuthenticated,
    handleLogout
  };
}