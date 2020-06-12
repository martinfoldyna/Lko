import { Observable } from 'rxjs';

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  picture: string;
  role: string;
}

export interface AuthenticationUser {
  name: string;
  username: string;
  email: string;
  password: string;
  rePassword: string;
}

export interface AuthoriseUser {
  name: string;
  state: string;
  email: string;
  role: string;
}[];

export interface GoogleUser {
  name: string;
  email: string;
  picture: string;
  token: string;
}

export interface MicrosoftUser {
  name: string;
  preferedUsername: string;
}

export interface Contacts {
  user: User;
  type: string;
}

export interface RecentUsers extends Contacts {
  time: number;
}

export abstract class UserData {
  abstract getUsers(): Observable<User[]>;
  abstract getContacts(): Observable<Contacts[]>;
  abstract getRecentUsers(): Observable<RecentUsers[]>;
}

