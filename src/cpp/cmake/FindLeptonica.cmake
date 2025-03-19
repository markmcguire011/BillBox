find_path(Leptonica_INCLUDE_DIR
    NAMES leptonica/allheaders.h
    PATHS /usr/include
          /usr/local/include
)

find_library(Leptonica_LIBRARY
    NAMES lept
    PATHS /usr/lib
          /usr/local/lib
          /usr/lib/aarch64-linux-gnu
)

include(FindPackageHandleStandardArgs)
find_package_handle_standard_args(
    Leptonica
    DEFAULT_MSG
    Leptonica_LIBRARY
    Leptonica_INCLUDE_DIR
)

if(Leptonica_FOUND)
    set(Leptonica_LIBRARIES ${Leptonica_LIBRARY})
    set(Leptonica_INCLUDE_DIRS ${Leptonica_INCLUDE_DIR})
endif() 