import pandas as pd
import numpy as np
import re
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from scipy.stats import rankdata

data = pd.read_csv('/Users/angatshah0511/Desktop/smart_phone_dataset.csv')

data = data.drop(columns=['Unnamed: 0'])
data.head()

def extract_numeric(value):
    match = re.search(r'\d+', str(value))
    return int(match.group()) if match else None

def extract_android_version(memory_info):
    match = re.search(r'Android v(\d+)', memory_info)
    match2 = re.search(r'HarmonyOS v(\d+)', memory_info)
    match3 = re.search(r'EMUI v(\d+)', memory_info)
    if match:
        return match.group(1)
    elif match2:
        return match2.group(1)
    elif match3:
        return match3.group(1)
    return None

def extract_max_megapixel(value):
    megapixels = re.findall(r'\d+\.?\d*', value)
    return max(map(float, megapixels)) if megapixels else None

def data_cleaning(data):
  data['Ram'] = data['Ram'].apply(extract_numeric)
  data['Battery'] = data['Battery'].apply(extract_numeric)
  data['Display'] = data['Display'].apply(lambda x: float(re.search(r'\d+(\.\d+)?', str(x)).group()))
  data['Rating'] = pd.to_numeric(data['Rating'], errors='coerce')
  data['Spec_score'] = pd.to_numeric(data['Spec_score'], errors='coerce')
  data['fast_charging'] = data['fast_charging'].apply(extract_numeric)
  data['Processor'] = data['Processor'].apply(lambda x: 'Octa Core' in x if isinstance(x, str) else False)
  data['Inbuilt_memory'] = data['Inbuilt_memory'].apply(extract_numeric)

  missing_android_version = data['Android_version'].isnull()

  extracted_versions = data.loc[missing_android_version, 'External_Memory'].apply(extract_android_version)

  data.loc[missing_android_version, 'Android_version'] = extracted_versions

  data.loc[missing_android_version & extracted_versions.notnull(), 'External_Memory'] = 'Memory Card Not Supported'

  data['Android_version'] = data['Android_version'].apply(extract_numeric)

  data = data.dropna(subset=['Android_version'])
  data = data.dropna(subset=['Inbuilt_memory', 'No_of_sim'])

  data['fast_charging'].fillna(5, inplace=True)
  data['fast_charging'] = data['fast_charging'].astype(float)

  data['Price'] = data['Price'].str.replace(',', '').astype(float)
  data['Camera'] = data['Camera'].apply(extract_max_megapixel)
  data['External_Memory_GB'] = data['External_Memory'].str.extract(r'(\d+) TB|(\d+) GB').apply(lambda x: x[0] if pd.notna(x[0]) else x[1], axis=1).astype(float)
  data['External_Memory_GB'] = data['External_Memory_GB'].fillna(0) * np.where(data['External_Memory'].str.contains('TB'), 1024, 1)
  data = data.drop(columns=['External_Memory'])

  data['Company'] = data['Name'].str.split().str[0]
  data = data.drop(columns=['Name'])

  brand_priority = {
    'Samsung': 95, 'Google': 90, 'OnePlus': 85, 'Sony': 80, 'Xiaomi': 75, 'Motorola': 70, 'Nokia': 65, 'Realme': 60, 'Oppo': 60, 'Vivo': 60,
  }

  data['Brand_Priority'] = data['Company'].map(brand_priority)
  data['Brand_Priority'].fillna(50, inplace=True)

  data = data.dropna()

  return data

def data_preprocessing(data):
  for column in ['Ram', 'Battery', 'Display', 'Rating', 'Spec_score', 'fast_charging', 'Inbuilt_memory', 'Android_version', 'Camera']:
    data[f'{column}'] = rankdata(data[column]) / len(data[column]) * 100

  X = data[['Ram', 'Battery', 'Display', 'Rating', 'Spec_score', 'fast_charging', 'Processor', 'Inbuilt_memory', 'Android_version', 'Camera', 'Brand_Priority']]

  y = np.log(data['Price'])

  return X, y

cleaned_data = data_cleaning(data)
cleaned_data.head()

X_processed, Y_processed = data_preprocessing(cleaned_data)
X_processed.head()

X_train, X_test, y_train, y_test = train_test_split(X_processed, Y_processed, test_size=0.20, random_state=21)

model = LinearRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

mse = mean_squared_error(y_test, y_pred)

accuracy = model.score(X_test, y_test)
print(f'--> Accuracy: {accuracy * 100}%')
print(f'--> Mean Squared Error: {mse}')

test_df = pd.DataFrame({'Actual Price': np.exp(y_test), 'Predicted Price': np.exp(y_pred)})
print(test_df.head(10))