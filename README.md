# Plant Disease Classification with CNN

This project aims to build a plant disease classification model using a **Convolutional Neural Network (CNN)**, powered by **TensorFlow** and **Keras**. The goal is to classify images of plants into one of 38 categories, identifying various diseases and plant types. The dataset used is the **PlantVillage dataset** from Kaggle.

## Key Features

- **Reproducibility**: Random seeds for TensorFlow, Numpy, and Python ensure experiments are reproducible.
- **Data Curation**: The project utilizes the Kaggle API to download and manage the **PlantVillage** dataset, which includes three types of images: **segmented**, **color**, and **grayscale**.
- **Data Preprocessing**: Essential preprocessing steps, such as image resizing, normalization, and augmentation, are performed to optimize the dataset for model training.
- **Model Building**: A simple yet effective CNN architecture with **convolutional layers**, **max-pooling layers**, and **dense layers** for classification.
- **Training and Evaluation**: The model is trained and evaluated on the dataset, with insights on accuracy and loss.
- **Prediction System**: A function to predict plant disease from new images using the trained model.
- **Model Saving**: The trained model is saved for later use in production or further research.

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/plant-disease-classification.git
   cd plant-disease-classification
   ```

2. Install the required dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Ensure you have the **Kaggle API** set up for downloading the dataset. You will need a Kaggle account and an API key:

   - Go to [Kaggle](https://www.kaggle.com/) → Account → Create API Token.
   - Place the `kaggle.json` file in the root directory of this project.

4. Download the dataset using the Kaggle API:

   ```bash
   kaggle datasets download -d emmarex/plantdisease
   ```

## Data Overview

The dataset contains images of plants categorized into 38 classes (plant types or diseases). The images are grouped into three categories:

- **Segmented**: Images with clear plant features isolated.
- **Color**: Natural colored images of plants.
- **Grayscale**: Black and white images.

## Workflow

### 1. **Reproducibility Setup**
   Random seeds for Python, Numpy, and TensorFlow are set to ensure reproducibility of results.

### 2. **Data Preprocessing**
   - Images are resized and normalized.
   - Data augmentation (e.g., rescaling) is applied to improve model generalization.
   - The dataset is split into training (80%) and validation (20%) sets.

### 3. **Model Building (CNN)**
   - A simple CNN with two convolutional layers followed by max-pooling layers is built.
   - The model ends with two dense layers for multi-class classification.
   - The **Adam optimizer** and **categorical cross-entropy** loss function are used for training.

### 4. **Model Training**
   - The model is trained for 5 epochs.
   - Batches of 32 images are used with a target size of 224x224 pixels.

### 5. **Model Evaluation**
   - The trained model is evaluated on the validation dataset.
   - Accuracy and loss plots are generated to track model performance.

### 6. **Prediction System**
   - The `predict_image_class` function allows you to predict plant diseases from new images.
   - Class indices are saved in a JSON file for easy reference.

### 7. **Model Saving**
   - The trained model is saved as `plant_disease_prediction_model.h5` for future use.

##  Insights

- **Data Augmentation**: Improves model performance by introducing variability in the training data.
- **Overfitting Prevention**: Monitoring loss curves helps detect overfitting. Regularization techniques may be necessary if overfitting is detected.
- **Model Evaluation**: Both accuracy and loss are crucial for understanding how well the model generalizes to unseen data.
- **Model Saving**: Saves time by allowing you to use the model later without retraining.

## Future Work

- **Hyperparameter Tuning**: Try different architectures and hyperparameters (e.g., learning rate, number of layers) for better performance.
- **Deployment**: Host the model using a web service to allow users to upload images and get predictions in real-time.
- **Advanced Data Augmentation**: Experiment with more complex augmentation techniques (e.g., rotation, flipping) to improve model robustness.

## References

- [Kaggle PlantVillage Dataset](https://www.kaggle.com/datasets/emmarex/plantdisease)
- [TensorFlow Documentation](https://www.tensorflow.org/)
- [Keras Documentation](https://keras.io/)

## Contributing

Feel free to fork this repository and create pull requests. Contributions are always welcome!

---

🌱 Happy coding and best of luck in plant disease classification! 🌿
