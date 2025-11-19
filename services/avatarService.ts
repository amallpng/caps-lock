import { AvatarData } from '../types';

const CUSTOM_AVATARS_KEY = 'custom-avatars';

// Get default, component-based avatars
// This now returns an empty array to remove all default avatars from selection lists.
const getDefaultAvatars = (): AvatarData[] => {
    return [];
};

// Get custom avatars from localStorage
export const getCustomAvatars = (): AvatarData[] => {
    try {
        const stored = localStorage.getItem(CUSTOM_AVATARS_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Failed to parse custom avatars from localStorage", e);
        return [];
    }
};

// Get all avatars, combining default and custom
// This now effectively only returns custom avatars.
export const getAvatars = (): AvatarData[] => {
    const defaultAvatars = getDefaultAvatars();
    const customAvatars = getCustomAvatars();
    return [...defaultAvatars, ...customAvatars];
};


// Add a new custom avatar
export const addAvatar = (base64Data: string): void => {
    const customAvatars = getCustomAvatars();
    const newAvatar: AvatarData = {
        id: `custom-${Date.now()}`,
        type: 'base64',
        data: base64Data,
    };
    const updatedAvatars = [...customAvatars, newAvatar];
    localStorage.setItem(CUSTOM_AVATARS_KEY, JSON.stringify(updatedAvatars));
};

// Delete a custom avatar by its ID
export const deleteAvatar = (id: string): void => {
    if (!id.startsWith('custom-')) {
        console.error("Cannot delete a non-custom avatar.");
        return;
    }
    const customAvatars = getCustomAvatars();
    const updatedAvatars = customAvatars.filter(avatar => avatar.id !== id);
    localStorage.setItem(CUSTOM_AVATARS_KEY, JSON.stringify(updatedAvatars));
};

// Helper to convert File to Base64
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};
