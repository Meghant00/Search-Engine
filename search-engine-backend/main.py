from typing import Union

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

import schedule
import time
import threading

from search import search
from search import crawl_and_parse
from search import create_inverted_index
from search import calculate_tf_idf

from cluster import get_documents_from_csv
from cluster import cluster_documents
from cluster import save_to_csv

from typing import List
from pydantic import BaseModel

import pandas as pd
import json

class Document(BaseModel):
    document: str


app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

documents = []

def crawl():
    global documents
    url = 'https://pureportal.coventry.ac.uk/en/organisations/eec-school-of-computing-mathematics-and-data-sciences-cmds/publications/'
    documents = crawl_and_parse(url)


schedule.every(1).weeks.do(crawl)

def run_scheduler():
    while True:
        schedule.run_pending()
        time.sleep(1)

@app.on_event("startup")
def on_startup():
    # Run crawl function at startup
    crawl()
    
    # Schedule Crawl to run every week
    threading.Thread(target=run_scheduler, daemon=True).start()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/search/")
def search_documents(query:str):
    global documents
 
    inverted_index = create_inverted_index(documents)
    tfidf_matrix, vectorizer = calculate_tf_idf(documents)

    search_results = search(query, inverted_index, documents, tfidf_matrix, vectorizer)

    parsed_search_results = []

    for result, score in search_results:
        result = result
        result["score"] = score

        if type(result['concepts']) != type([1]):
            result["concepts"] = result['concepts'].split(', ')


        parsed_search_results.append(result)

    return {"results":parsed_search_results}


@app.post("/cluster/")
def upload_documents(file: UploadFile):
    # Get documents from uploaded csv file
    documents = get_documents_from_csv(file)

    try:
        df = pd.read_csv('clustered_documents.csv')
        documents_in_csv = df['Document']
        documents = pd.concat([documents_in_csv, documents])
    except:
        print('error')

    # Cluster Documents
    clusters = cluster_documents(documents)

    save_to_csv(documents, clusters)

    return {"success":True}

@app.post("/cluster/new")
def cluster_new_document(documents_for_clustering:List[Document]):
    
    documents_only = []
    documents = []
    
    for document in documents_for_clustering:
       documents_only.append(document.document)

    df = pd.read_csv('clustered_documents.csv')
    documents_in_csv = df['Document']

    documents_only = pd.DataFrame(data={'Document':documents_only})

    documents = pd.concat([documents_in_csv, documents_only['Document']])

    # Cluster Documents
    clusters = cluster_documents(documents)

    new_documents = documents[len(documents_in_csv):len(documents)]
    new_clusters = clusters[len(documents_in_csv):len(documents)]

    results = save_to_csv(new_documents, new_clusters)

    results = results.to_json(orient='records', lines=False)

    results = json.loads(results)

    return {"success":True, "results":results}