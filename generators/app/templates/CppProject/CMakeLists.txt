
find_package(fmt CONFIG REQUIRED)

find_package(spdlog CONFIG REQUIRED)

add_executable(${PROJECT_NAME})

target_sources(${PROJECT_NAME}
  PRIVATE
    main.cc
)


target_include_directories(${PROJECT_NAME}
  PRIVATE
    ${CMAKE_CURRENT_LIST_DIR}/..
)

target_link_libraries(${PROJECT_NAME}
  PRIVATE
    spdlog::spdlog
    fmt::fmt
)

target_compile_features(${PROJECT_NAME}
  PRIVATE
    cxx_std_17
)



if (UNIX)
    install(TARGETS
        ${PROJECT_NAME}
        RUNTIME DESTINATION bin)
endif()

# build a CPack driven installer package
include (InstallRequiredSystemLibraries)
set (CPACK_PACKAGE_VERSION_MAJOR ${PROJECT_VERSION_MAJOR})
set (CPACK_PACKAGE_VERSION_MINOR ${PROJECT_VERSION_MINOR})
set (CPACK_PACKAGE_VERSION_PATCH ${PROJECT_VERSION_PATCH})
include (CPack)
