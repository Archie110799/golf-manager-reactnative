import axios from 'axios';

type ErrorPayload = {
  message?: string;
};

export function getAuthErrorMessage(
  error: unknown,
  fallbackMessage: string
): string {
  if (axios.isAxiosError<ErrorPayload>(error)) {
    const message = error.response?.data?.message;
    if (message) {
      return message;
    }
  }

  return fallbackMessage;
}
