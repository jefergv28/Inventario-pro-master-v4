// app/types/usuario.ts

export interface Usuario {
  id: number;
  name: string;
  email: string;
  profilePicture: string;
  language: string;
  notifications: boolean;
  role: string;
  password?: string;
}
