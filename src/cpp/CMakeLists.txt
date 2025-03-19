cmake_minimum_required(VERSION 3.14)
project(billbox_cpp VERSION 0.1.0 LANGUAGES CXX)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Find required packages
find_package(OpenCV REQUIRED)
list(APPEND CMAKE_MODULE_PATH ${CMAKE_CURRENT_SOURCE_DIR}/cmake)
find_package(Tesseract REQUIRED)
find_package(Leptonica REQUIRED)
find_package(pybind11 REQUIRED)

# Include directories
include_directories(
    ${CMAKE_CURRENT_SOURCE_DIR}/include
    ${OpenCV_INCLUDE_DIRS}
    ${Tesseract_INCLUDE_DIRS}
    ${Leptonica_INCLUDE_DIRS}
)

# Add library sources
set(SOURCES
    src/ocr_processor.cpp
    src/image_preprocessor.cpp
)

# Create shared library
add_library(billbox_core SHARED ${SOURCES})
target_link_libraries(billbox_core
    ${OpenCV_LIBS}
    ${Tesseract_LIBRARIES}
    ${Leptonica_LIBRARIES}
)

# Create Python module
pybind11_add_module(billbox_cpp src/python_binding.cpp ${SOURCES})
target_link_libraries(billbox_cpp PRIVATE
    ${OpenCV_LIBS}
    ${Tesseract_LIBRARIES}
    ${Leptonica_LIBRARIES}
)

# Install targets
install(TARGETS billbox_core
    LIBRARY DESTINATION lib
    ARCHIVE DESTINATION lib
    RUNTIME DESTINATION bin
)

install(TARGETS billbox_cpp
    LIBRARY DESTINATION ${PYTHON_SITE_PACKAGES}
)

# Add tests
if(BUILD_TESTING)
    enable_testing()
    add_executable(test_ocr tests/test_ocr.cpp)
    target_link_libraries(test_ocr
        billbox_core
        ${OpenCV_LIBS}
        ${Tesseract_LIBRARIES}
        ${Leptonica_LIBRARIES}
        GTest::GTest
        GTest::Main
    )
    add_test(NAME test_ocr COMMAND test_ocr)
endif()
