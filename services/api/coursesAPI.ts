import { apiClient } from './apiClient';

export const CoursesAPI = {
  getCourses: () => apiClient.get<Array<{ id: string; name: string; description?: string; address?: string }>>('/courses'),
  getSlots: (courseId: string, date?: string) =>
    apiClient.get<Array<{ id: string; courseId: string; date: string; startTime: string; endTime: string; available: boolean }>>(
      `/courses/${courseId}/slots`,
      date ? { params: { date } } : undefined
    ),
};
