#pragma once

#include <opencv2/opencv.hpp>
#include <string>
#include <vector>

class ImagePreprocessor {
public:
    ImagePreprocessor();
    ~ImagePreprocessor();

    // Load image from file
    bool loadImage(const std::string& imagePath);
    
    // Preprocess the loaded image
    cv::Mat preprocess();
    
    // Get the current image
    cv::Mat getCurrentImage() const;
    
    // Save the processed image
    bool saveImage(const std::string& outputPath);

private:
    cv::Mat originalImage;
    cv::Mat processedImage;
    
    // Helper methods
    cv::Mat convertToGrayscale(const cv::Mat& input);
    cv::Mat applyGaussianBlur(const cv::Mat& input);
    cv::Mat applyAdaptiveThreshold(const cv::Mat& input);
    cv::Mat removeNoise(const cv::Mat& input);
    cv::Mat enhanceContrast(const cv::Mat& input);
};
