from setuptools import setup, find_packages

setup(
    name="billbox",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "numpy",
        "opencv-python",
        "pytesseract",
        "pdf2image",
        "pybind11",
        "fastapi",
        "uvicorn"
    ],
)
