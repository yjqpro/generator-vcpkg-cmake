SET (PROJECT_NAME "<%= projectName %>")
SET (PROJECT_PATH "<%= projectPath %>")



cmake_minimum_required(VERSION 3.15...3.17)

set(CMAKE_TOOLCHAIN_FILE "$ENV{VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake")
set(VCPKG_TARGET_TRIPLET "x64-windows-static" CACHE STRING "")


set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "${CMAKE_SOURCE_DIR}/cmake")

add_compile_options("$<$<C_COMPILER_ID:MSVC>:/utf-8>")
add_compile_options("$<$<CXX_COMPILER_ID:MSVC>:/utf-8>")

########################################################################################################################################################

## Project Configuration

project(${PROJECT_NAME}
    VERSION 0.0.1
    LANGUAGES CXX
)

########################################################################################################################################################

set(CMAKE_MSVC_RUNTIME_LIBRARY "MultiThreaded$<$<CONFIG:Debug>:Debug>")


add_subdirectory("src/${PROJECT_PATH}")

