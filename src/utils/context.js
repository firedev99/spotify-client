import { createContext } from "react";

export const UserContext = createContext({});
export const LoginContext = createContext(false);
export const TokenContext = createContext(null);
export const PlaylistContext = createContext();
export const MessageContext = createContext(() => { });
export const PlayContext = createContext(() => { });