import nltk
from nltk.stem import PorterStemmer

# Create stemmer object
stemmer = PorterStemmer()

words = ["running", "playing", "studies", "learning"]

for word in words:
    print(word, "->", stemmer.stem(word)) 

