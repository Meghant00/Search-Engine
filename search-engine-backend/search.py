import requests
from bs4 import BeautifulSoup
import re
from collections import defaultdict
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

nltk.download('punkt')
nltk.download('stopwords')

ps = PorterStemmer()
stop_words = set(stopwords.words('english'))

def preprocess(text):
    tokens = nltk.word_tokenize(text)
    tokens = [word.lower() for word in tokens if word.isalnum()]
    tokens = [word for word in tokens if word not in stop_words]
    tokens = [ps.stem(word) for word in tokens]
    tokens = [word.replace('-', ' ') for word in tokens]
    return tokens

def crawl_and_parse(url):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        
        publications = soup.find_all('div', class_='result-container')
        results = []
        
        for pub in publications:
            title_tag = pub.find('h3', class_='title')
            title = title_tag.text.strip() if title_tag else 'No title'
            link = title_tag.find('a')['href'] if title_tag and title_tag.find('a') else 'No link'
            
            authors = []
            authorsWithLinks = []
            finalAuthors = []
            authorsAndLinks = []
            for author_tag in pub.find_all('a', class_='link person'):
                authors.append(author_tag.text.strip())
                
                authorWithLink = author_tag['href'].split('/')[-1].replace('-', ' ')
                authorsWithLinks.append(authorWithLink)
                authorsAndLinks.append({"link": author_tag['href'], "author":authorWithLink})
                
            finalAuthors.extend(author for author in authors)
            finalAuthors.extend(author for author in authorsWithLinks)
            
            finalAuthors = ', '.join(finalAuthors) if finalAuthors else 'No authors'
                
            authors = ', '.join(authors) if authors else 'No authors'
            
            concepts = []
            
            for concept in pub.find_all('span', class_='concept'):
                concepts.append(concept.text.strip())
                
            concepts = ', '.join(concepts) if concepts else 'No concept'
        
        
            date_tag = pub.find('span', class_='date')
            publication_date = date_tag.text.strip() if date_tag else 'No date'
            
            results.append({
                'title': title,
                'link': link,
                'authors': authors,
                'publication_date': publication_date,
                'concepts':concepts,
                'content': f"{title} {finalAuthors} {concepts} {publication_date}",
                "authorsAndLinks":authorsAndLinks
            })
        
        return results
    else:
        return []

def create_inverted_index(documents):
    inverted_index = defaultdict(list)
    
    for doc_id, doc in enumerate(documents):
        content = doc['content']
        words = preprocess(content)
        for word in words:
            if doc_id not in inverted_index[word]:
                inverted_index[word].append(doc_id)
    
    return inverted_index

def calculate_tf_idf(documents):
    corpus = [doc['content'] for doc in documents]
    vectorizer = TfidfVectorizer(tokenizer=preprocess)
    tfidf_matrix = vectorizer.fit_transform(corpus)
    return tfidf_matrix, vectorizer

def search(query, inverted_index, documents, tfidf_matrix, vectorizer):
    query_vector = vectorizer.transform([query])
    cosine_similarities = cosine_similarity(query_vector, tfidf_matrix).flatten()
    relevant_docs_indices = cosine_similarities.argsort()[-10:][::-1]
    results = [(documents[idx], cosine_similarities[idx]) for idx in relevant_docs_indices if cosine_similarities[idx] > 0]
    return results

