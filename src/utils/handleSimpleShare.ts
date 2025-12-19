import { Property } from "../types";

export const handleSimpleShare = (property: Property) => {
  if (navigator.share) {
    navigator.share({
      title: property.title,
      text: `Check out this room: ${property.title}`,
      url: `${window.location.origin}/properties/${property.id}`
    });
  } else {
    // Fallback to copying to clipboard
    navigator.clipboard.writeText(`${window.location.origin}/properties/${property.id}`);
    alert('Property link copied to clipboard!');
  }
};
