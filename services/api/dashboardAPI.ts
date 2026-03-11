import { apiClient } from './apiClient';

export type DashboardStats = {
  visitors: number;
  coursesCount: number;
  bookingsCount: number;
  videosCount: number;
  postsCount: number;
  revenueByMonth: Array<{ month: string; revenue: number }>;
};

export const DashboardAPI = {
  getStats: () => apiClient.get<DashboardStats>('/dashboard/stats'),
};
