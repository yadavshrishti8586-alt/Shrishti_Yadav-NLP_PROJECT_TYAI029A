# Tokenization 

import nltk
from nltk.tokenize import word_tokenize
nltk.download('punkt')
text = "Natural Language Processing is interesting."
tokens = word_tokenize(text)
print(tokens)

# Lowercasing

text = "Natural Language Processing Is Interesting"
lower_text = text.lower()
print(lower_text)

# Remove Punctuation

import string
from nltk.tokenize import word_tokenize

text = "Hello! NLP, is amazing."
tokens = word_tokenize(text)
clean_tokens = [word for word in tokens if word not in string.punctuation]
print(clean_tokens)

# Remove Stopwords

import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

nltk.download('stopwords')
text = "NLP is a field of Artificial Intelligence"
tokens = word_tokenize(text.lower())
stop_words = set(stopwords.words('english'))
filtered_words = [word for word in tokens if word not in stop_words]
print(filtered_words)

# Vocabulary Size

from nltk.tokenize import word_tokenize

text = "NLP is interesting. NLP is powerful."
tokens = word_tokenize(text.lower())
vocab = set(tokens)
print("Vocabulary:", vocab)
print("Vocabulary Size:", len(vocab))

# Stemming

from nltk.stem import PorterStemmer

stemmer = PorterStemmer()
words = ["running", "playing", "studies"]
for word in words:
    print(word, "->", stemmer.stem(word))

# Lemmitization

import nltk
from nltk.stem import WordNetLemmatizer

nltk.download('wordnet')
lemmatizer = WordNetLemmatizer()
words = ["cars", "books", "studies"]
for word in words:
    print(word, "->", lemmatizer.lemmatize(word))

