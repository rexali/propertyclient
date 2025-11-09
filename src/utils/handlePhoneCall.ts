export const handleContact = (phone: string) => {
    // Open contact modal or redirect to contact form
    window.location.href = 'tel:+234' + phone;
};