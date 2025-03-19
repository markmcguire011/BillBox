#pragma once

#include <string>
#include <vector>
#include <memory>

namespace billbox {

/**
 * @class OCRProcessor
 * @brief Handles OCR processing using Tesseract
 * 
 * This class provides an interface for extracting text from images
 * using the Tesseract OCR engine.
 */
class OCRProcessor {
public:
    /**
     * @brief Constructor
     * @param tesseract_data_path Path to Tesseract language data files
     * @param language Language to use for OCR (default: "eng")
     */
    OCRProcessor(const std::string& tesseract_data_path, const std::string& language = "eng");
    
    /**
     * @brief Destructor
     */
    ~OCRProcessor();
    
    /**
     * @brief Process an image file and extract text
     * @param image_path Path to the image file
     * @return Extracted text as string
     */
    std::string process_image(const std::string& image_path);
    
    /**
     * @brief Process image data in memory and extract text
     * @param image_data Raw image data
     * @param width Image width
     * @param height Image height
     * @param bytes_per_pixel Bytes per pixel (1 for grayscale, 3 for RGB)
     * @return Extracted text as string
     */
    std::string process_image_data(const unsigned char* image_data, int width, int height, int bytes_per_pixel);
    
    /**
     * @brief Set page segmentation mode
     * @param mode Tesseract page segmentation mode
     */
    void set_page_segmentation_mode(int mode);
    
    /**
     * @brief Set OCR engine mode
     * @param mode Tesseract OCR engine mode
     */
    void set_ocr_engine_mode(int mode);

private:
    class Impl;
    std::unique_ptr<Impl> pImpl; // Pointer to implementation (PIMPL idiom)
};

} // namespace billbox
