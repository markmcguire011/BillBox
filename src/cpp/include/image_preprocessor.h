#pragma once

#include <string>
#include <vector>
#include <memory>

namespace billbox {

/**
 * @class ImagePreprocessor
 * @brief Handles image preprocessing for OCR
 * 
 * This class provides methods for preprocessing images to improve
 * OCR accuracy, including operations like grayscale conversion,
 * thresholding, noise removal, and deskewing.
 */
class ImagePreprocessor {
public:
    /**
     * @brief Constructor
     */
    ImagePreprocessor();
    
    /**
     * @brief Destructor
     */
    ~ImagePreprocessor();
    
    /**
     * @brief Preprocess an image file for OCR
     * @param input_path Path to the input image
     * @param output_path Path to save the preprocessed image (optional)
     * @return Path to the preprocessed image
     */
    std::string preprocess_image(const std::string& input_path, const std::string& output_path = "");
    
    /**
     * @brief Preprocess image data in memory
     * @param image_data Raw image data
     * @param width Image width
     * @param height Image height
     * @param channels Number of channels (1 for grayscale, 3 for RGB)
     * @return Preprocessed image data
     */
    std::vector<unsigned char> preprocess_image_data(const unsigned char* image_data, 
                                                    int width, int height, int channels);
    
    /**
     * @brief Enable or disable grayscale conversion
     * @param enable True to enable, false to disable
     */
    void enable_grayscale(bool enable);
    
    /**
     * @brief Enable or disable thresholding
     * @param enable True to enable, false to disable
     * @param threshold_value Threshold value (0-255)
     */
    void enable_threshold(bool enable, int threshold_value = 128);
    
    /**
     * @brief Enable or disable noise removal
     * @param enable True to enable, false to disable
     */
    void enable_noise_removal(bool enable);
    
    /**
     * @brief Enable or disable deskewing
     * @param enable True to enable, false to disable
     */
    void enable_deskew(bool enable);

private:
    class Impl;
    std::unique_ptr<Impl> pImpl; // Pointer to implementation (PIMPL idiom)
};

} // namespace billbox
