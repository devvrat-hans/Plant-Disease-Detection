document.addEventListener("DOMContentLoaded", () => {
    const imageInput = document.getElementById("imageInput");
    const previewImage = document.getElementById("previewImage");
    const uploadButton = document.getElementById("uploadButton");
    const resultText = document.getElementById("result");
    const spinner = document.getElementById("spinner");
    const previewContainer = document.getElementById("previewContainer");

    // Drag and drop handling
    previewContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        previewContainer.style.borderColor = '#28a745';
    });

    previewContainer.addEventListener('dragleave', () => {
        previewContainer.style.borderColor = '#ccc';
    });

    previewContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        previewContainer.style.borderColor = '#ccc';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            imageInput.files = e.dataTransfer.files;
            handleImageSelect(file);
        }
    });

    imageInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) handleImageSelect(file);
    });

    function handleImageSelect(file) {
        previewImage.src = URL.createObjectURL(file);
        previewImage.style.display = "block";
        uploadButton.disabled = false;
    }

    uploadButton.addEventListener("click", async () => {
        const file = imageInput.files[0];
        if (!file) {
            showResult("Please select an image first", true);
            return;
        }
    
        try {
            uploadButton.disabled = true;
            spinner.style.display = 'block';
            uploadButton.textContent = "Processing...";
            
            const formData = new FormData();
            formData.append("file", file);
    
            const response = await fetch("http://localhost:5000/predict", {
                method: "POST",
                body: formData,
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Server error occurred');
            }
            
            const data = await response.json();
            showResult(`Prediction: ${data.prediction}`, false);
        } catch (error) {
            console.error("Error:", error);
            showResult(error.message, true);
        } finally {
            uploadButton.disabled = false;
            spinner.style.display = 'none';
            uploadButton.textContent = "Upload & Predict";
        }
    });

    function showResult(message, isError) {
        resultText.textContent = message;
        resultText.className = isError ? 'result-error' : 'result-success';
    }
});