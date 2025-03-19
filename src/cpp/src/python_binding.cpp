#include <pybind11/pybind11.h>
#include <pybind11/stl.h>
#include <pybind11/numpy.h>
#include "ocr_processor.h"
#include "image_preprocessor.h"

namespace py = pybind11;

PYBIND11_MODULE(billbox_cpp, m) {
    m.doc() = "BillBox C++ extension for high-performance OCR and image processing";
    
    // OCRProcessor binding
    py::class_<billbox::OCRProcessor>(m, "OCRProcessor")
        .def(py::init<const std::string&, const std::string&>(),
             py::arg("tesseract_data_path"), py::arg("language") = "eng")
        .def("process_image", &billbox::OCRProcessor::process_image,
             "Process an image file and extract text",
             py::arg("image_path"))
        .def("process_image_data", [](billbox::OCRProcessor& self, py::array_t<unsigned char> array) {
            py::buffer_info buf = array.request();
            
            if (buf.ndim != 3 && buf.ndim != 2) {
                throw std::runtime_error("Image array must be 2D (grayscale) or 3D (color)");
            }
            
            int height = buf.shape[0];
            int width = buf.shape[1];
            int channels = buf.ndim == 3 ? buf.shape[2] : 1;
            
            return self.process_image_data(static_cast<unsigned char*>(buf.ptr), 
                                          width, height, channels);
        }, "Process image data from numpy array and extract text")
        .def("set_page_segmentation_mode", &billbox::OCRProcessor::set_page_segmentation_mode,
             "Set Tesseract page segmentation mode",
             py::arg("mode"))
        .def("set_ocr_engine_mode", &billbox::OCRProcessor::set_ocr_engine_mode,
             "Set Tesseract OCR engine mode",
             py::arg("mode"));
    
    // ImagePreprocessor binding
    py::class_<billbox::ImagePreprocessor>(m, "ImagePreprocessor")
        .def(py::init<>())
        .def("preprocess_image", &billbox::ImagePreprocessor::preprocess_image,
             "Preprocess an image file for OCR",
             py::arg("input_path"), py::arg("output_path") = "")
        .def("preprocess_image_data", [](billbox::ImagePreprocessor& self, py::array_t<unsigned char> array) {
            py::buffer_info buf = array.request();
            
            if (buf.ndim != 3 && buf.ndim != 2) {
                throw std::runtime_error("Image array must be 2D (grayscale) or 3D (color)");
            }
            
            int height = buf.shape[0];
            int width = buf.shape[1];
            int channels = buf.ndim == 3 ? buf.shape[2] : 1;
            
            std::vector<unsigned char> result = self.preprocess_image_data(
                static_cast<unsigned char*>(buf.ptr), width, height, channels);
            
            // Create output numpy array
            std::vector<ssize_t> shape;
            if (channels == 1) {
                shape = {height, width};
            } else {
                shape = {height, width, channels};
            }
            
            return py::array_t<unsigned char>(shape, result.data());
        }, "Preprocess image data from numpy array")
        .def("enable_grayscale", &billbox::ImagePreprocessor::enable_grayscale,
             "Enable or disable grayscale conversion",
             py::arg("enable"))
        .def("enable_threshold", &billbox::ImagePreprocessor::enable_threshold,
             "Enable or disable thresholding",
             py::arg("enable"), py::arg("threshold_value") = 128)
        .def("enable_noise_removal", &billbox::ImagePreprocessor::enable_noise_removal,
             "Enable or disable noise removal",
             py::arg("enable"))
        .def("enable_deskew", &billbox::ImagePreprocessor::enable_deskew,
             "Enable or disable deskewing",
             py::arg("enable"));
}
