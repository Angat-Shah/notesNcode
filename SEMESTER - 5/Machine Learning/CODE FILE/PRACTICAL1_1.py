import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import numpy as np

def train_multiple_linear_regression(csv_file):
    data = pd.read_csv(csv_file, encoding='ISO-8859-1')
    
    X = data.iloc[:, :6].values  # Features
    Y = data.iloc[:, 6].values   # Target_value
    
    # Train-Test Splitting
    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)
    
    # Initializing the LR Model
    model = LinearRegression()
    
    # Training the Model
    model.fit(X_train, Y_train)
    
    # prediction on test data
    Y_pred = model.predict(X_test)
    
    # Calculation of the Mean Squared Error
    mse = mean_squared_error(Y_test, Y_pred)
    
    return model, mse

def predict_new_input(model, new_input):
    new_input_array = np.array(new_input).reshape(1, -1)
    predicted_value = model.predict(new_input_array)
    
    return predicted_value

# Demo Use
csv_file = '/Users/angatshah0511/Desktop/re - re.csv'
model, mse = train_multiple_linear_regression(csv_file)
print(f'--> Mean Squared Error : {mse}')

new_input = [2018, 5, 20, 8, 24.98298, 121.54024]
predicted_value = predict_new_input(model, new_input)
print(f'--> Predicted Value : {predicted_value}')