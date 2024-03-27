import { io } from 'socket.io-client';

export const iconSize = 44;
export const ITEM_PER_PAGE = 10;
export const AFFILIATE_DEPTH = 3;
export const socket = io(import.meta.env.VITE_BASE_URL_SOCKET, { path: '/socket.io' });
