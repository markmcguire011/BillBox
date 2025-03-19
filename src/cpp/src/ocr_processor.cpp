#include "ocr_processor.h"
#include <tesseract/baseapi.h>
#include <leptonica/allheaders.h>
#include <stdexcept>
#include <iostream>
#include <string>

namespace billbox {

class OCRProcessor::Impl {
public:
    Impl(const std::string& tesseract_data_path, const std::string& language) {
        // Initialize Tesseract API
        api = new tesseract::TessBaseAPI();
        if (api->Init(tesseract_data_path.c_str(), language.c_str())) {
            throw std::runtime_error("Could not initialize tesseract with data path: " + 
                                     tesseract_data_path + " and language: " + language);
        }
    }
    
    ~Impl() {
        // Clean up
        api->End();
        delete api;
    }
    
    std::string process_image(const std::string& image_path) {
        // Open input image with leptonica library
        Pix* image = pixRead(image_path.c_str());
        if (!image) {
            throw std::runtime_error("Could not open image: " + image_path);
        }
        
        // Set image data
        api->SetImage(image);
        
        // Get OCR result
        char* outText = api->GetUTF8Text();
        std::string result(outText);
        
        // Cleanup
        delete[] outText;
        pixDestroy(&image);
        
        return result;
    }
    
    std::string process_image_data(const unsigned char* image_data, int width, int height, int bytes_per_pixel) {
        // Set image data directly
        api->SetImage(image_data, width, height, bytes_per_pixel, bytes_per_pixel * width);
        
        // Get OCR result
        char* outText = api->GetUTF8Text();
        std::string result(outText);
        
        // Cleanup
        delete[] outText;
        
        return result;
    }
    
    void set_page_segmentation_mode(int mode) {
        api->SetPageSegMode(static_cast<tesseract::PageSegMode>(mode));
    }
    
    void set_ocr_engine_mode(int mode) {
        api->SetVariable("tessedit_ocr_engine_mode", std::to_string(mode).c_str());
    }
    
private:
    tesseract::TessBaseAPI* api;
};

// OCRProcessor implementation using PIMPL idiom
OCRProcessor::OCRProcessor(const std::string& tesseract_data_path, const std::string& language)
    : pImpl(new Impl(tesseract_data_path, language)) {}

OCRProcessor::~OCRProcessor() = default;

std::string OCRProcessor::process_image(const std::string& image_path) {
    return pImpl->process_image(image_path);
}

std::string OCRProcessor::process_image_data(const unsigned char* image_data, int width, int height, int bytes_per_pixel) {
    return pImpl->process_image_data(image_data, width, height, bytes_per_pixel);
}

void OCRProcessor::set_page_segmentation_mode(int mode) {
    pImpl->set_page_segmentation_mode(mode);
}

void OCRProcessor::set_ocr_engine_mode(int mode) {
    pImpl->set_ocr_engine_mode(mode);
}

} // namespace billbox
