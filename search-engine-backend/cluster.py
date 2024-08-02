import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from nltk.corpus import stopwords
nltk.download('wordnet')
from nltk.stem import WordNetLemmatizer
import pandas as pd
import os



def preprocess_text(text):
    stop_words = set(stopwords.words('english'))
    lemmatizer = WordNetLemmatizer()
    words = nltk.word_tokenize(text)
    words = [lemmatizer.lemmatize(word.lower()) for word in words if word.isalnum() and word.lower() not in stop_words]
    return ' '.join(words)

def cluster_documents(documents, max_clusters=3):
    processed_docs = [preprocess_text(doc) for doc in documents]
    
    vectorizer = TfidfVectorizer(ngram_range=(1, 2))
    X = vectorizer.fit_transform(processed_docs)

    
    n_clusters = min(len(documents), max_clusters)

    kmeans = KMeans(n_clusters=n_clusters, random_state=42)

    kmeans.fit(X)
    
    clusters = kmeans.labels_
    return clusters

def get_cluster_name(cluster_num):
    cluster_names = {0 : "Economics", 1: "Politics", 2:"Entertainment"}
    return cluster_names.get(cluster_num, "Unknown")

def save_to_csv(documents, clusters, filename='clustered_documents.csv'):
    data = {
        'Document': documents,
        'Cluster': clusters,
        'Cluster Name': [get_cluster_name(cluster) for cluster in clusters]
    }
    df = pd.DataFrame(data)
    
    if os.path.exists(filename):
        df.to_csv(filename, mode='a', header=False, index=False)
    else:
        df.to_csv(filename, mode='w', header=True, index=False)

    return df

def get_documents_from_csv(file):

    # Read file from uploaded file
    df = pd.read_csv(file.file)

    # Separate Content from file
    documents = df['content']

    # Return content of file as documents
    return documents