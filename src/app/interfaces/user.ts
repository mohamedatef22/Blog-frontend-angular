export interface User {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  isConfirmed?: true;
  isAdmin?: true;
  isActivate?: true;
}
