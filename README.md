# BillBox

BillBox is an intelligent invoice management tool that allows users to upload invoice images, extract key details (due dates, amounts, etc.) using OCR and machine learning, and automatically create Google Calendar reminders. The project is built using Python and C++ for optimal performance and scalability.

## Features

- **OCR-based Text Extraction:** Uses Tesseract OCR and OpenCV for image preprocessing and text recognition.
- **Machine Learning for Data Extraction:** Utilizes NLP models (spaCy/BERT) to accurately extract invoice details.
- **Google Calendar Integration:** Automatically creates reminders for invoice due dates.
- **User-Friendly Interface:** Available as either a web application (React + FastAPI) or a desktop application (Native with electron).
- **Secure and Efficient:** Supports encrypted local storage or cloud-based solutions for invoice history.

## Tech Stack

### Core Technologies

- **Python:** ML model training, backend API (FastAPI/Flask), Google Calendar integration
- **C++:** High-performance OCR processing and image preprocessing
- **React/Next.js:** Frontend for the web app
- **Electron** Desktop app

## Usage

1. Upload an invoice image (JPG, PNG, or PDF).
2. The system extracts key details using OCR and ML.
3. The extracted due date is automatically added to Google Calendar.
4. Users can review and edit the extracted details before finalizing.

## License

This project is licensed under the MIT License.

