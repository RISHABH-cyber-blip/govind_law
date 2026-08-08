export interface Review {
  id: string;
  name: string;
  rating: number;
  title: string;
  text: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
  attestationConfirmed: boolean;
  reportCount: number;
}

export interface ReviewStats {
  average: number;
  total: number;
  breakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface CreateReviewPayload {
  name?: string;
  rating: number;
  title: string;
  text: string;
  attestationConfirmed: boolean;
  website?: string; // Honeypot field (must be empty)
}
