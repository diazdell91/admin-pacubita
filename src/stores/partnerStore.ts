import { create } from 'zustand';

export interface Partner {
  id: string;
  name: string;
}

export interface PartnerUser {
  id: string;
  type: string;
  isEnabled: boolean;
  partner: {
    id: string;
    name: string;
  };
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: string;
}

export interface PartnerStore {
  selectedPartner: Partner | null;
  setSelectedPartner: (partner: Partner | null) => void;
  clearSelectedPartner: () => void;
}

export const usePartnerStore = create<PartnerStore>((set) => ({
  selectedPartner: null,
  setSelectedPartner: (partner) => set({ selectedPartner: partner }),
  clearSelectedPartner: () => set({ selectedPartner: null }),
}));