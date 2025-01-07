import warnings
warnings.filterwarnings("ignore",category=UserWarning)
warnings.filterwarnings("ignore",category=DeprecationWarning)
warnings.filterwarnings("ignore",category=FutureWarning)
import pickle
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
import os
import sys
input_path=r"D:\JobCurator\backend"
with open(os.path.join(input_path, "model.pkl"), 'rb') as model_file:
    loaded_model = pickle.load(model_file)

with open(os.path.join(input_path, "vec.pkl"), 'rb') as vec_file:
    vec = pickle.load(vec_file)
#input_skills = ["Javascript", "Python", "Java"]
# Convert input skills to TF-IDF features
def output(input_skills):
    input_vector = vec.transform([' '.join(input_skills)]).toarray()
    
    probabilities = loaded_model.predict_proba(input_vector)
    
    # Get top 5 job titles
    top_n_indices = probabilities[0].argsort()[-5:][::-1]
    top_n_jobs = [loaded_model.classes_[i] for i in top_n_indices]
    return top_n_jobs
user_skills=sys.argv[1].split(",")
#user_skills=["JavaScript","Java","Python"]
recommended_jobs=output(user_skills)
for job in recommended_jobs:
    print(job)
#hadoop,spark,database
