import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from pylab import rcParams
import tensorflow as tf
from tensorflow.keras.datasets import cifar100
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPool2D, Dropout, Flatten, Dense, GlobalAveragePooling2D, BatchNormalization, InputLayer
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import Callback, EarlyStopping, ReduceLROnPlateau
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.applications.efficientnet import EfficientNetB0
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report, ConfusionMatrixDisplay
from skimage.transform import resize
from sklearn.model_selection import train_test_split, StratifiedShuffleSplit
import seaborn as sns
import cv2
import albumentations as albu

(x_train, y_train), (x_test, y_test) = cifar100.load_data(label_mode='fine')

# Flatten image data for easier DataFrame handling (reshape to 1D for each image)
x_train_flat = x_train.reshape(x_train.shape[0], -1)
x_test_flat = x_test.reshape(x_test.shape[0], -1)

# Load CIFAR-100 class names (fine labels)
fine_labels = [
    "apple", "aquarium_fish", "baby", "bear", "beaver", "bed", "bee", "beetle", "bicycle", "bottle",
    "bowl", "boy", "bridge", "bus", "butterfly", "camel", "can", "castle", "caterpillar", "cattle",
    "chair", "chimpanzee", "clock", "cloud", "cockroach", "couch", "crab", "crocodile", "cup", "dinosaur",
    "dolphin", "elephant", "flatfish", "forest", "fox", "girl", "hamster", "house", "kangaroo", "keyboard",
    "lamp", "lawn_mower", "leopard", "lion", "lizard", "lobster", "man", "maple_tree", "motorcycle", "mountain",
    "mouse", "mushroom", "oak_tree", "orange", "orchid", "otter", "palm_tree", "pear", "pickup_truck", "pine_tree",
    "plain", "plate", "poppy", "porcupine", "possum", "rabbit", "raccoon", "ray", "road", "rocket", "rose",
    "sea", "seal", "shark", "shrew", "skunk", "skyscraper", "snail", "snake", "spider", "squirrel", "streetcar",
    "sunflower", "sweet_pepper", "table", "tank", "telephone", "television", "tiger", "tractor", "train", "trout",
    "tulip", "turtle", "wardrobe", "whale", "willow_tree", "wolf", "woman", "worm"
]

x_train.shape, x_test.shape, y_train.shape, y_test.shape

n_classes = 100

y_train = to_categorical(y_train, n_classes)
y_test = to_categorical(y_test, n_classes)

x_train_data, x_val_data, y_train_data, y_val_data = train_test_split(x_train, y_train, test_size=0.2, random_state=123, stratify=y_train)

print("Number of training samples: ", x_train_data.shape[0])
print("Number of validation samples: ", x_val_data.shape[0])

# EfficientNetB0, the images need to be resized to the size (224, 224)
height = 224
width = 224
channels = 3

n_classes = 100
input_shape = (height, width, channels)

epochs = 15
batch_size = 16

def resize_img(img, shape):
  return cv2.resize(img, (shape[1], shape[0]), interpolation=cv2.INTER_CUBIC)

class DataGenerator(tf.keras.utils.Sequence):
    def __init__(self, images, labels=None, mode='fit', batch_size=batch_size, dim=(height, width), channels=channels, n_classes=n_classes, shuffle=True, augment=False):

        #initializing the configuration of the generator
        self.images = images
        self.labels = labels
        self.mode = mode
        self.batch_size = batch_size
        self.dim = dim
        self.channels = channels
        self.n_classes = n_classes
        self.shuffle = shuffle
        self.augment = augment
        self.on_epoch_end()
        super().__init__()

    #method to be called after every epoch
    def on_epoch_end(self):
        self.indexes = np.arange(self.images.shape[0])
        if self.shuffle == True:
            np.random.shuffle(self.indexes)

    #return numbers of steps in an epoch using samples and batch size
    def __len__(self):
        return int(np.floor(len(self.images) / self.batch_size))

    #this method is called with the batch number as an argument to obtain a given batch of data
    def __getitem__(self, index):
        #generate one batch of data
        #generate indexes of batch
        batch_indexes = self.indexes[index * self.batch_size:(index+1) * self.batch_size]

        #generate mini-batch of X
        X = np.empty((self.batch_size, *self.dim, self.channels), dtype=np.float32)

        for i, ID in enumerate(batch_indexes):
            #generate pre-processed image
            img = self.images[ID]
            #image rescaling
            img = img.astype(np.float32)/255.0
            #resizing as per new dimensions
            img = resize_img(img, self.dim)
            X[i] = img

        #generate mini-batch of y
        if self.mode == 'fit':
            y = self.labels[batch_indexes]

            #augmentation on the training dataset
            if self.augment == True:
                X = self.__augment_batch(X)
            return X, y

        elif self.mode == 'predict':
            return (X,)

        else:
            raise AttributeError("The mode should be set to either 'fit' or 'predict'.")

    #augmentation for one image
    def __random_transform(self, img):
        composition = albu.Compose([albu.HorizontalFlip(p=0.5),
                                   albu.VerticalFlip(p=0.5),
                                   albu.GridDistortion(p=0.2),
                                   albu.ElasticTransform(p=0.2)])
        return composition(image=img)['image']

    #augmentation for batch of images
    def __augment_batch(self, img_batch):
        for i in range(img_batch.shape[0]):
            img_batch[i] = self.__random_transform(img_batch[i])
        return img_batch

train_data_generator = DataGenerator(x_train_data, y_train_data, augment=True)
valid_data_generator = DataGenerator(x_val_data, y_val_data, augment=False)

efnb0 = EfficientNetB0(weights='imagenet', include_top=False, input_shape=input_shape, classes=n_classes)

model = Sequential()
model.add(InputLayer(input_shape=input_shape))
model.add(efnb0)
model.add(GlobalAveragePooling2D())
model.add(Dropout(0.5))
model.add(Dense(n_classes, activation='softmax'))

model.summary()

optimizer = Adam(learning_rate=0.0001)

# early stopping
early_stopping = EarlyStopping(monitor='val_accuracy', mode='max', verbose=1, patience=10, restore_best_weights=True)

# reducing learining rate on plateau
rlrop = ReduceLROnPlateau(monitor='val_loss', mode='min', patience=5, factor=0.5, min_lr=1e-6, verbose=1)

model.compile(optimizer=optimizer, loss='categorical_crossentropy', metrics=['accuracy'])

model_history = model.fit(train_data_generator,
                                    validation_data=valid_data_generator,
                                    callbacks=[early_stopping, rlrop],
                                    verbose=1,
                                    epochs=epochs)

#saving the trained model as data file in .h5 format
model.save('cifar_100_efficientnetb0_model.keras')

plt.figure(figsize=(18,8))

plt.suptitle('Loss and Accuracy Plots', fontsize=18)

plt.subplot(1,2,2)
plt.plot(model_history.history['accuracy'], label='Train Accuracy')
plt.plot(model_history.history['val_accuracy'], label='Validation Accuracy')
plt.legend()
plt.xlabel('Number of epochs', fontsize=14)
plt.ylabel('Accuracy', fontsize=14)
plt.show()

y_pred = model.predict(DataGenerator(x_test, mode='predict', augment=False, shuffle=False), verbose=1)
y_pred = np.argmax(y_pred, axis=1)
test_accuracy = accuracy_score(np.argmax(y_test, axis=1), y_pred)

print('Test Accuracy: ', round((test_accuracy * 100), 2), "%")

def preprocess_image(image_path):
    image = Image.open(image_path).resize((32, 32))
    image = image.convert('RGB')
    image = np.array(image) / 255.0  # Normalize the image
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

    def predict_image_label(image_path):
      image = preprocess_image(image_path)
      predictions = model.predict(image)
      predicted_label = class_names[np.argmax(predictions)]
      confidence = np.max(predictions)  # Get the confidence of the prediction
      return predicted_label, confidence

    # Get the number of uploaded images
      num_images = len(uploaded)

      # Calculate grid dimensions (e.g., 2 rows if 2-4 images, 3 rows if 5-9 images, etc.)
      num_rows = int(np.ceil(np.sqrt(num_images)))
      num_cols = int(np.ceil(num_images / num_rows))

      # Create a figure and subplots
      fig, axes = plt.subplots(num_rows, num_cols, figsize=(12, 12))
      fig.subplots_adjust(hspace=0.5)  # Adjust spacing between subplots

      # Flatten the axes array for easier indexing
      axes = axes.flatten()

# Iterate through uploaded images and display them
      for i, file_name in enumerate(uploaded.keys()):
          predicted_label, confidence = predict_image_label(file_name)
          print(f"Predicted Label for {file_name}: {predicted_label} (Confidence: {confidence:.2f})")

          # Display image on the corresponding subplot
          img = Image.open(file_name)
          axes[i].imshow(img)
          axes[i].set_title(f"Predicted: {predicted_label} ({confidence:.2f})")
          axes[i].axis('off')

      # Hide any unused subplots
      for j in range(num_images, num_rows * num_cols):
          axes[j].axis('off')

"""Function to resize the image"""

def resize_test_image(test_img):

    img = cv2.imread(test_img)
    #plt.imshow(img)
    img_RGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    #plt.imshow(img_RGB)
    resized_img = cv2.resize(img_RGB, (224, 224))
    #plt.imshow(resized_img)
    resized_img = resized_img / 255.0
    # plt.imshow(resized_img)
    return resized_img

def predict_test_image(test_img):

    resized_img = resize_test_image(test_img)
    prediction = model.predict(np.array([resized_img]))

    return prediction

def sort_prediction_test_image(test_img):

    prediction = predict_test_image(test_img)

    index = np.arange(0,100)

    for i in range(100):
        for j in range(100):
            if prediction[0][index[i]] > prediction[0][index[j]]:
                temp = index[i]
                index[i] = index[j]
                index[j] = temp

    return index

def df_top5_prediction_test_image(test_img):

    sorted_index = sort_prediction_test_image(test_img)
    prediction = predict_test_image(test_img)

    class_name = []
    prediction_score = []

    k = sorted_index[:5]

    for i in range(5):
        class_name.append(fine_labels[k[i]])
        prediction_score.append(prediction[0][k[i]])

    df = pd.DataFrame(list(zip(class_name, prediction_score)), columns=['Label', 'Probability'])

    return df

def df_top5_prediction_test_image(test_img):
    prediction = predict_test_image(test_img)
    sorted_index = sort_prediction_test_image(test_img)

    class_name = []
    prediction_score = []

    k = sorted_index[:5]

    for i in range(5):
        class_name.append(fine_labels[k[i]])
        prediction_score.append(prediction[0][k[i]])

    df = pd.DataFrame(list(zip(class_name, prediction_score)), columns=['Label', 'Probability'])
    return df

plot_top5_prediction_test_image('src/orange.jpeg')
plot_top5_prediction_test_image('src/cloud.jpeg')
plot_top5_prediction_test_image('src/can.jpg')
plot_top5_prediction_test_image('src/house.jpg')
plot_top5_prediction_test_image('src/worm.jpeg')