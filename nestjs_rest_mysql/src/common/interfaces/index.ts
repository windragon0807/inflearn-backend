export interface UserContext {
  id: string;
  email: string;
}

export interface Context extends Request {
  user?: UserContext;
}
