---
title: "Building a RAG Pipeline with Local Embeddings"
description: "How to build a retrieval-augmented generation system that runs entirely on your machine using local models."
pubDate: 2026-01-22
category: "AI & Automation"
readTime: "8 min read"
tags: ["Local AI", "RAG", "Automation"]
draft: false
---

# Building a RAG Pipeline with Local Embeddings

RAG — Retrieval-Augmented Generation — is the most practical pattern in AI engineering. Instead of asking an LLM to remember everything, you give it relevant documents and let it answer from context. Running this locally means your data never leaves your machine.

### The Architecture

A RAG pipeline has three stages:

1. **Ingest**: Split documents into chunks, embed them, store in a vector database
2. **Retrieve**: Embed the user's query, find the most similar chunks
3. **Generate**: Feed the retrieved chunks + query to an LLM for the final answer

### Choosing Local Models

For embeddings, I use `nomic-embed-text` via Ollama — it's fast, accurate, and runs on CPU. For generation, Llama 3 handles the answer synthesis:

```bash
ollama pull nomic-embed-text
ollama pull llama3
```

### The Embedding Step

```python
import ollama

def embed_chunks(chunks: list[str]) -> list[list[float]]:
    embeddings = []
    for chunk in chunks:
        response = ollama.embeddings(model='nomic-embed-text', prompt=chunk)
        embeddings.append(response['embedding'])
    return embeddings
```

Each chunk gets a 768-dimensional vector that captures its semantic meaning.

### Vector Storage

For a small project, a simple in-memory store works:

```python
import numpy as np

class VectorStore:
    def __init__(self):
        self.vectors = []
        self.chunks = []

    def add(self, chunk: str, embedding: list[float]):
        self.chunks.append(chunk)
        self.vectors.append(np.array(embedding))

    def search(self, query_embedding: list[float], top_k: int = 3):
        query = np.array(query_embedding)
        similarities = [
            np.dot(query, v) / (np.linalg.norm(query) * np.linalg.norm(v))
            for v in self.vectors
        ]
        top_indices = np.argsort(similarities)[-top_k:][::-1]
        return [self.chunks[i] for i in top_indices]
```

For production, use ChromaDB or Qdrant — both support local operation.

### The Generation Step

```python
def rag_query(query: str, store: VectorStore):
    query_emb = ollama.embeddings(model='nomic-embed-text', prompt=query)
    relevant_chunks = store.search(query_emb['embedding'], top_k=3)
    
    context = "\n---\n".join(relevant_chunks)
    prompt = f"Answer based on this context:\n{context}\n\nQuestion: {query}"
    
    response = ollama.generate(model='llama3', prompt=prompt)
    return response['response']
```

### Real Use Cases

I use this pattern for:
- Querying my own codebase ("How does the auth system work?")
- Searching through documentation I've written
- Finding relevant notes across hundreds of markdown files

### The Trade-off

Local RAG is slower than cloud-based solutions and the embedding quality is lower than OpenAI's `text-embedding-3`. But for personal tools and private data, the trade-off is worth it. Your documents stay on your machine.
