import nltk
from nltk.tokenize import word_tokenize

nltk.download('punkt')
nltk.download('punkt_tab')

text = "Natural Language Processing is interesting."

tokens = word_tokenize(text)

print(tokens) 