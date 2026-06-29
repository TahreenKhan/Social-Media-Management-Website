// Centralized Configuration for Nexoresha

export const siteConfig = {
  contact: {
    whatsappNumber: "+911234567890", // Placeholder, replace with actual
    email: "mohdsaadkhan4150@gmail.com",
  },
  socialLinks: {
    instagram: "https://instagram.com/nexoresha_placeholder",
    facebook: "https://facebook.com/nexoresha_placeholder",
    linkedin: "https://linkedin.com/company/nexoresha_placeholder",
    whatsapp: "https://wa.me/911234567890" // Standard WhatsApp wa.me link
  },
  // Formspree / EmailJS placeholder configuration
  formIntegration: {
    endpoint: "https://formspree.io/f/placeholder_endpoint",
  }
};

/**
 * Utility to generate a WhatsApp chat link with a prefilled message
 */
export const generateWhatsAppLink = (message) => {
  const encodedMessage = encodeURIComponent(message);
  // Remove any spaces or '+' from the number for the wa.me link
  const cleanNumber = siteConfig.contact.whatsappNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
};
