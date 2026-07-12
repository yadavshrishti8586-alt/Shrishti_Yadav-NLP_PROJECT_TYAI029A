import nltk
from nltk.tokenize import word_tokenize, sent_tokenize

nltk.download('punkt')

text = "Hello! I am learning NLP. It is very interesting."

# Character Tokenization
characters = list(text)

# Word Tokenization
words = word_tokenize(text)

# Sentence Tokenization
sentences = sent_tokenize(text)

print("Character Tokens:")
print(characters)

print("\nWord Tokens:")
print(words)

print("\nSentence Tokens:")
print(sentences)