#include "image_preprocessor.h"
#include <opencv2/opencv.hpp>
#include <filesystem>
#include <stdexcept>

namespace fs = std::filesystem;

namespace billbox {

class ImagePreprocessor::Impl {
public:
    Impl() 
        : use_grayscale(true), 
          use_threshold(true), 
          threshold_value(128),
          use_noise_removal(true),
          use_deskew(true) {}
    
    std::string preprocess_image(const std::string& input_path, const std::string& output_path) {
        // Check if input file exists
        if (!fs::exists(input_path)) {
            throw std::runtime_error("Input image does not exist: " + input_path);
        }
        
        // Read the image
        cv::Mat image = cv::imread(input_path);
        if (image.empty()) {
            throw std::runtime_error("Failed to read image: " + input_path);
        }
        
        // Apply preprocessing steps
        cv::Mat processed = apply_preprocessing(image);
        
        // Determine output path
        std::string actual_output_path;
        if (output_path.empty()) {
            // Generate temporary file path
            fs::path input_fs(input_path);
            fs::path temp_dir = fs::temp_directory_path();
            actual_output_path = (temp_dir / ("preprocessed_" + input_fs.filename().string())).string();
        } else {
            actual_output_path = output_path;
        }
        
        // Save the processed image
        if (!cv::imwrite(actual_output_path, processed)) {
            throw std::runtime_error("Failed to write preprocessed image to: " + actual_output_path);
        }
        
        return actual_output_path;
    }
    
    std::vector<unsigned char> preprocess_image_data(const unsigned char* image_data, 
                                                    int width, int height, int channels) {
        // Create OpenCV Mat from raw data
        cv::Mat image(height, width, channels == 1 ? CV_8UC1 : CV_8UC3, const_cast<unsigned char*>(image_data));
        
        // Apply preprocessing steps
        cv::Mat processed = apply_preprocessing(image);
        
        // Convert processed image to vector
        std::vector<unsigned char> result;
        if (processed.isContinuous()) {
            result.assign(processed.data, processed.data + processed.total() * processed.channels());
        } else {
            for (int i = 0; i < processed.rows; ++i) {
                result.insert(result.end(), processed.ptr<unsigned char>(i), 
                             processed.ptr<unsigned char>(i) + processed.cols * processed.channels());
            }
        }
        
        return result;
    }
    
    void enable_grayscale(bool enable) {
        use_grayscale = enable;
    }
    
    void enable_threshold(bool enable, int value) {
        use_threshold = enable;
        threshold_value = value;
    }
    
    void enable_noise_removal(bool enable) {
        use_noise_removal = enable;
    }
    
    void enable_deskew(bool enable) {
        use_deskew = enable;
    }
    
private:
    bool use_grayscale;
    bool use_threshold;
    int threshold_value;
    bool use_noise_removal;
    bool use_deskew;
    
    cv::Mat apply_preprocessing(const cv::Mat& input) {
        cv::Mat result = input.clone();
        
        // Convert to grayscale if needed
        if (use_grayscale && result.channels() > 1) {
            cv::cvtColor(result, result, cv::COLOR_BGR2GRAY);
        }
        
        // Apply noise removal if enabled
        if (use_noise_removal) {
            cv::GaussianBlur(result, result, cv::Size(3, 3), 0);
        }
        
        // Apply thresholding if enabled
        if (use_threshold && result.channels() == 1) {
            cv::threshold(result, result, threshold_value, 255, cv::THRESH_BINARY | cv::THRESH_OTSU);
        }
        
        // Apply deskewing if enabled
        if (use_deskew) {
            result = deskew(result);
        }
        
        return result;
    }
    
    cv::Mat deskew(const cv::Mat& input) {
        // Convert to binary if not already
        cv::Mat binary;
        if (input.channels() > 1) {
            cv::cvtColor(input, binary, cv::COLOR_BGR2GRAY);
            cv::threshold(binary, binary, 0, 255, cv::THRESH_BINARY | cv::THRESH_OTSU);
        } else if (input.type() != CV_8UC1) {
            input.convertTo(binary, CV_8UC1);
        } else {
            binary = input.clone();
        }
        
        // Calculate skew angle
        cv::Moments moments = cv::moments(binary, true);
        double skew = 0.0;
        
        if (moments.m00 > 0) {
            double m11 = moments.m11;
            double m02 = moments.m02;
            double m20 = moments.m20;
            
            if (m20 - m02 != 0) {
                skew = 0.5 * atan2(2 * m11, m20 - m02);
            }
        }
        
        // Convert angle to degrees
        double angle = skew * 180.0 / CV_PI;
        
        // Only correct if angle is significant
        if (std::abs(angle) < 0.1) {
            return input.clone();
        }
        
        // Create rotation matrix and rotate the image
        cv::Point2f center(binary.cols / 2.0f, binary.rows / 2.0f);
        cv::Mat rotation_matrix = cv::getRotationMatrix2D(center, angle, 1.0);
        cv::Mat rotated;
        cv::warpAffine(input, rotated, rotation_matrix, input.size(), 
                      cv::INTER_LINEAR, cv::BORDER_CONSTANT, cv::Scalar(255, 255, 255));
        
        return rotated;
    }
};

// ImagePreprocessor implementation using PIMPL idiom
ImagePreprocessor::ImagePreprocessor() : pImpl(new Impl()) {}

ImagePreprocessor::~ImagePreprocessor() = default;

std::string ImagePreprocessor::preprocess_image(const std::string& input_path, const std::string& output_path) {
    return pImpl->preprocess_image(input_path, output_path);
}

std::vector<unsigned char> ImagePreprocessor::preprocess_image_data(const unsigned char* image_data, 
                                                                  int width, int height, int channels) {
    return pImpl->preprocess_image_data(image_data, width, height, channels);
}

void ImagePreprocessor::enable_grayscale(bool enable) {
    pImpl->enable_grayscale(enable);
}

void ImagePreprocessor::enable_threshold(bool enable, int threshold_value) {
    pImpl->enable_threshold(enable, threshold_value);
}

void ImagePreprocessor::enable_noise_removal(bool enable) {
    pImpl->enable_noise_removal(enable);
}

void ImagePreprocessor::enable_deskew(bool enable) {
    pImpl->enable_deskew(enable);
}

} // namespace billbox
