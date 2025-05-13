cmake_minimum_required(VERSION 3.10)
project(BillBox)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find OpenCV package
find_package(OpenCV REQUIRED)
include_directories(${OpenCV_INCLUDE_DIRS})

# Add include directories
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/include)

# Add source files
set(SOURCES
    src/image_preprocessor.cpp
)

# Create library
add_library(image_preprocessor ${SOURCES})
target_link_libraries(image_preprocessor ${OpenCV_LIBS})

# Add tests if needed
if(BUILD_TESTING)
    add_subdirectory(tests)
endif()
