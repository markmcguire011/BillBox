#include <gtest/gtest.h>
#include "ocr_processor.h"
#include "image_preprocessor.h"
#include <opencv2/opencv.hpp>
#include <filesystem>
#include <fstream>
#include <string>

namespace fs = std::filesystem;

class OCRTest : public ::testing::Test {
protected:
    void SetUp() override {
        // Create test directory if it doesn't exist
        test_dir = fs::temp_directory_path() / "billbox_test";
        fs::create_directories(test_dir);
        
        // Create a test image with text
        test_image_path = (test_dir / "test_image.png").string();
        create_test_image(test_image_path);
        
        // Set Tesseract data path (adjust as needed for your environment)
        tesseract_data_path = "/usr/share/tesseract-ocr/4.00/tessdata";
        // Check if the path exists, otherwise try common alternatives
        if (!fs::exists(tesseract_data_path)) {
            tesseract_data_path = "/usr/share/tesseract-ocr/tessdata";
        }
        if (!fs::exists(tesseract_data_path)) {
            tesseract_data_path = "/usr/local/share/tessdata";
        }
        // For Windows
        if (!fs::exists(tesseract_data_path)) {
            tesseract_data_path = "C:/Program Files/Tesseract-OCR/tessdata";
        }
    }
    
    void TearDown() override {
        // Clean up test directory
        fs::remove_all(test_dir);
    }
    
    void create_test_image(const std::string& path) {
        // Create a simple image with text for testing
        cv::Mat image(300, 800, CV_8UC3, cv::Scalar(255, 255, 255));
        cv::putText(image, "BillBox OCR Test", cv::Point(50, 150), 
                   cv::FONT_HERSHEY_SIMPLEX, 2.0, cv::Scalar(0, 0, 0), 3);
        
        cv::imwrite(path, image);
    }
    
    fs::path test_dir;
    std::string test_image_path;
    std::string tesseract_data_path;
};

TEST_F(OCRTest, TestOCRProcessor) {
    // Skip test if Tesseract data path doesn't exist
    if (!fs::exists(tesseract_data_path)) {
        GTEST_SKIP() << "Tesseract data path not found. Skipping OCR test.";
    }
    
    // Create OCR processor
    billbox::OCRProcessor ocr(tesseract_data_path);
    
    // Process test image
    std::string text = ocr.process_image(test_image_path);
    
    // Check that the text contains our test string
    EXPECT_TRUE(text.find("BillBox OCR Test") != std::string::npos);
}

TEST_F(OCRTest, TestImagePreprocessor) {
    // Create image preprocessor
    billbox::ImagePreprocessor preprocessor;
    
    // Preprocess test image
    std::string preprocessed_path = preprocessor.preprocess_image(test_image_path);
    
    // Check that the preprocessed file exists
    EXPECT_TRUE(fs::exists(preprocessed_path));
    
    // Check that the preprocessed image can be loaded
    cv::Mat preprocessed_image = cv::imread(preprocessed_path);
    EXPECT_FALSE(preprocessed_image.empty());
    
    // Clean up
    fs::remove(preprocessed_path);
}

TEST_F(OCRTest, TestPreprocessingAndOCR) {
    // Skip test if Tesseract data path doesn't exist
    if (!fs::exists(tesseract_data_path)) {
        GTEST_SKIP() << "Tesseract data path not found. Skipping OCR test.";
    }
    
    // Create image preprocessor and OCR processor
    billbox::ImagePreprocessor preprocessor;
    billbox::OCRProcessor ocr(tesseract_data_path);
    
    // Preprocess test image
    std::string preprocessed_path = preprocessor.preprocess_image(test_image_path);
    
    // Process preprocessed image
    std::string text = ocr.process_image(preprocessed_path);
    
    // Check that the text contains our test string
    EXPECT_TRUE(text.find("BillBox OCR Test") != std::string::npos);
    
    // Clean up
    fs::remove(preprocessed_path);
}

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
