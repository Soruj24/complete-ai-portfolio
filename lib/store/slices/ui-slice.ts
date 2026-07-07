import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  id: string;
  title: string;
  description?: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}

interface UiState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  commandPaletteOpen: boolean;
  globalSearchOpen: boolean;
  notificationsOpen: boolean;
  notifications: Notification[];
  unreadCount: number;
  activeShortcuts: boolean;
}

const initialState: UiState = {
  sidebarOpen: true,
  sidebarCollapsed: false,
  commandPaletteOpen: false,
  globalSearchOpen: false,
  notificationsOpen: false,
  notifications: [],
  unreadCount: 0,
  activeShortcuts: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload;
    },
    toggleCommandPalette(state) {
      state.commandPaletteOpen = !state.commandPaletteOpen;
    },
    setCommandPaletteOpen(state, action: PayloadAction<boolean>) {
      state.commandPaletteOpen = action.payload;
    },
    setGlobalSearchOpen(state, action: PayloadAction<boolean>) {
      state.globalSearchOpen = action.payload;
    },
    setNotificationsOpen(state, action: PayloadAction<boolean>) {
      state.notificationsOpen = action.payload;
    },
    addNotification(state, action: PayloadAction<Omit<Notification, "id" | "read" | "createdAt">>) {
      state.notifications.unshift({
        ...action.payload,
        id: crypto.randomUUID(),
        read: false,
        createdAt: new Date().toISOString(),
      });
      state.unreadCount += 1;
    },
    markNotificationRead(state, action: PayloadAction<string>) {
      const n = state.notifications.find((n) => n.id === action.payload);
      if (n && !n.read) {
        n.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllNotificationsRead(state) {
      state.notifications.forEach((n) => (n.read = true));
      state.unreadCount = 0;
    },
    clearNotifications(state) {
      state.notifications = [];
      state.unreadCount = 0;
    },
    setActiveShortcuts(state, action: PayloadAction<boolean>) {
      state.activeShortcuts = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  toggleCommandPalette,
  setCommandPaletteOpen,
  setGlobalSearchOpen,
  setNotificationsOpen,
  addNotification,
  markNotificationRead,
  markAllNotificationsRead,
  clearNotifications,
  setActiveShortcuts,
} = uiSlice.actions;
export type { Notification, UiState };
export default uiSlice.reducer;
