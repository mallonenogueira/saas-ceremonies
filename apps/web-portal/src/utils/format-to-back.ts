export function formatDate(value?: string ): string | undefined {
    return value && new Date(value).toISOString();
  }
  