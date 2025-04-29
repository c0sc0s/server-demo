import { create } from "zustand";
import { User, Friendship, DeleteFriendRequest } from "@shared/types";
import { api } from "@/api";

// 用户状态
type UserState = {
  // 好友列表
  friends: User[];
  // 好友请求列表
  friendRequests: Friendship[];
  // 搜索结果
  searchResults: User[];
  // 是否正在加载
  isLoading: boolean;
  // 错误信息
  error: string | null;

  // 获取好友列表
  fetchFriends: () => Promise<void>;

  // 获取好友请求
  fetchFriendRequests: () => Promise<void>;

  // 搜索用户
  searchUsers: (query: string) => Promise<void>;

  // 发送好友请求
  sendFriendRequest: (userId: number) => Promise<void>;

  // 接受好友请求
  acceptFriendRequest: (requestId: number) => Promise<void>;

  // 拒绝好友请求
  rejectFriendRequest: (requestId: number) => Promise<void>;

  // 删除好友
  deleteFriend: (friendshipId: number) => Promise<void>;

  // 重置错误
  resetError: () => void;
};

// 创建用户状态管理器
export const useUserStore = create<UserState>((set, get) => ({
  friends: [],
  friendRequests: [],
  searchResults: [],
  isLoading: false,
  error: null,

  // 获取好友列表
  fetchFriends: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await api.friendship.getFriends();

      set({
        friends: response.data.map((friendship: Friendship) => friendship.user),
        isLoading: false,
      });
    } catch (error) {
      console.error("Fetch friends error:", error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "获取好友列表失败",
      });
    }
  },

  // 获取好友请求
  fetchFriendRequests: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await api.friendship.getFriendRequests();

      set({
        friendRequests: response.data,
        isLoading: false,
      });
    } catch (error) {
      console.error("Fetch friend requests error:", error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "获取好友请求失败",
      });
    }
  },

  // 搜索用户
  searchUsers: async (query) => {
    if (!query.trim()) {
      set({ searchResults: [] });
      return;
    }

    try {
      set({ isLoading: true, error: null });

      const response = await api.user.search(query);

      set({
        searchResults: response.data.items,
        isLoading: false,
      });
    } catch (error) {
      console.error("Search users error:", error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "搜索用户失败",
      });
    }
  },

  // 发送好友请求
  sendFriendRequest: async (userId) => {
    try {
      set({ isLoading: true, error: null });

      await api.friendship.addFriend({ userId });

      set({ isLoading: false });
    } catch (error) {
      console.error("Send friend request error:", error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "发送好友请求失败",
      });
    }
  },

  // 接受好友请求
  acceptFriendRequest: async (requestId) => {
    try {
      set({ isLoading: true, error: null });

      await api.friendship.handleFriendRequest({
        requestId,
        action: "accept",
      });

      // 重新获取好友列表和好友请求
      await get().fetchFriends();
      await get().fetchFriendRequests();

      set({ isLoading: false });
    } catch (error) {
      console.error("Accept friend request error:", error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "接受好友请求失败",
      });
    }
  },

  // 拒绝好友请求
  rejectFriendRequest: async (requestId) => {
    try {
      set({ isLoading: true, error: null });

      await api.friendship.handleFriendRequest({
        requestId,
        action: "reject",
      });

      // 更新好友请求列表
      await get().fetchFriendRequests();

      set({ isLoading: false });
    } catch (error) {
      console.error("Reject friend request error:", error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "拒绝好友请求失败",
      });
    }
  },

  // 删除好友
  deleteFriend: async (friendshipId) => {
    try {
      set({ isLoading: true, error: null });

      await api.friendship.deleteFriend({ friendshipId });

      // 更新好友列表
      await get().fetchFriends();

      set({ isLoading: false });
    } catch (error) {
      console.error("Delete friend error:", error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "删除好友失败",
      });
    }
  },

  // 重置错误
  resetError: () => set({ error: null }),
}));
