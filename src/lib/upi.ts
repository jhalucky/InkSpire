

/**
 * Generates a UPI payment URL for the given UPI ID and amount.
 *
 * @param upiId - The recipient's UPI ID (e.g., example@okaxis)
 * @param name - The recipient's name (optional)
 * @param amount - The amount to be paid (optional)
 * @param note - A note or message for the payment (optional)
 * @returns A string containing the UPI deep link
 */
export function generateUpiLink(
    upiId: string,
    name?: string,
    amount?: number,
    note?: string
  ): string {
    if (!upiId) return "";
  
    const params = new URLSearchParams();
    params.append("pa", upiId); 
    if (name) params.append("pn", name); 
    if (amount) params.append("am", amount.toFixed(2)); 
    if (note) params.append("tn", note);
    params.append("cu", "INR"); 
  
    return `upi://pay?${params.toString()}`;
  }
  
  /**
   * Opens the UPI app on the user's device using the generated UPI link
   *
   * @param upiLink - The UPI deep link
   */
  export function payViaUpi(upiLink: string) {
    if (!upiLink) return;
    
    window.location.href = upiLink;
  }
  