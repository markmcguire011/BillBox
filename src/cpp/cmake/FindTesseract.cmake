find_path(Tesseract_INCLUDE_DIR
    NAMES tesseract/baseapi.h
    PATHS /usr/include
          /usr/local/include
)

find_library(Tesseract_LIBRARY
    NAMES tesseract
    PATHS /usr/lib
          /usr/local/lib
)

include(FindPackageHandleStandardArgs)
find_package_handle_standard_args(
    Tesseract
    DEFAULT_MSG
    Tesseract_LIBRARY
    Tesseract_INCLUDE_DIR
)

if(Tesseract_FOUND)
    set(Tesseract_LIBRARIES ${Tesseract_LIBRARY})
    set(Tesseract_INCLUDE_DIRS ${Tesseract_INCLUDE_DIR})
endif() 