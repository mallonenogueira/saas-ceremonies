export interface Ceremony {
  id: string;
  publicId: number;
  start?: string;
  end?: string;
  description?: string;
  published: boolean;
  peopleName: string;
  peopleBirthDate?: string;
  peopleDeathDate?: string;
  peopleHistory?: string;

  // createdAt: Date
  /// updatedAt: Date
  // peopleImage: string | null
  // accountId: string
  // addressId: number | null
  // addressCemeteryId: number | null
}
