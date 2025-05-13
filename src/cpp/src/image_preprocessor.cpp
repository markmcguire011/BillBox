#include "image_preprocessor.h"
#include <stdexcept>

ImagePreprocessor::ImagePreprocessor() {}

ImagePreprocessor::~ImagePreprocessor() {}

bool ImagePreprocessor::loadImage(const std::string& imagePath) {
    originalImage = cv::imread(imagePath);
    if (originalImage.empty()) {
        return false;
    }
    return true;
}

cv::Mat ImagePreprocessor::preprocess() {
    if (originalImage.empty()) {
        throw std::runtime_error("No image loaded. Call loadImage() first.");
    }

    // Convert to grayscale
    cv::Mat gray = convertToGrayscale(originalImage);
    
    // Apply Gaussian blur to reduce noise
    cv::Mat blurred = applyGaussianBlur(gray);
    
    // Enhance contrast
    cv::Mat enhanced = enhanceContrast(blurred);
    
    // Remove noise
    cv::Mat denoised = removeNoise(enhanced);
    
    // Apply adaptive thresholding
    processedImage = applyAdaptiveThreshold(denoised);
    
    return processedImage;
}

cv::Mat ImagePreprocessor::getCurrentImage() const {
    return processedImage;
}

bool ImagePreprocessor::saveImage(const std::string& outputPath) {
    if (processedImage.empty()) {
        return false;
    }
    return cv::imwrite(outputPath, processedImage);
}

cv::Mat ImagePreprocessor::convertToGrayscale(const cv::Mat& input) {
    cv::Mat gray;
    if (input.channels() == 3) {
        cv::cvtColor(input, gray, cv::COLOR_BGR2GRAY);
    } else {
        gray = input.clone();
    }
    return gray;
}

cv::Mat ImagePreprocessor::applyGaussianBlur(const cv::Mat& input) {
    cv::Mat blurred;
    cv::GaussianBlur(input, blurred, cv::Size(5, 5), 0);
    return blurred;
}

cv::Mat ImagePreprocessor::applyAdaptiveThreshold(const cv::Mat& input) {
    cv::Mat binary;
    cv::adaptiveThreshold(
        input,
        binary,
        255,
        cv::ADAPTIVE_THRESH_GAUSSIAN_C,
        cv::THRESH_BINARY,
        11,  // Block size
        2    // Constant subtracted from mean
    );
    return binary;
}

cv::Mat ImagePreprocessor::removeNoise(const cv::Mat& input) {
    cv::Mat denoised;
    cv::fastNlMeansDenoising(input, denoised, 10.0, 7, 21);
    return denoised;
}

cv::Mat ImagePreprocessor::enhanceContrast(const cv::Mat& input) {
    cv::Mat enhanced;
    cv::equalizeHist(input, enhanced);
    return enhanced;
}
