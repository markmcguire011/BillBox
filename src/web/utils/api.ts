/**
 * API client for interacting with the backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://0.0.0.0:8000";

/**
 * Upload an invoice file to the backend
 */
export async function uploadInvoice(file: File): Promise<any> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API_BASE_URL}/invoices/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to upload invoice");
    }

    return await response.json();
  } catch (error) {
    console.error("Error uploading invoice:", error);
    throw error;
  }
}

/**
 * Get all invoices
 */
export async function getInvoices(): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/invoices`);

    if (!response.ok) {
      throw new Error("Failed to fetch invoices");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
}

/**
 * Fetches all invoices from the API
 * @returns Promise containing the list of invoices
 */
export async function fetchInvoices() {
  try {
    const response = await fetch(`${API_BASE_URL}/invoices`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
}
