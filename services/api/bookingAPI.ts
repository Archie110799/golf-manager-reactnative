/**
 * Booking API (DESIGN_REACTNATIVE.md §5)
 */

import { apiClient } from './apiClient';

export type BookingPayload = {
  courseId: string;
  slotId: string;
  date: string;
};

export const BookingAPI = {
  getSlots: (courseId: string) =>
    apiClient.get(`/courses/${courseId}/slots`),

  bookHole: (data: BookingPayload) =>
    apiClient.post('/bookings', data),

  cancel: (bookingId: string) =>
    apiClient.delete(`/bookings/${bookingId}`),

  getMyBookings: () =>
    apiClient.get('/bookings/me'),
};
