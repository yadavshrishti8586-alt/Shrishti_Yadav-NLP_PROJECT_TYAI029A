import nltk
import string

from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.stem import WordNetLemmatizer

# Download required resources (run once)
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

text = "Hello! I am learning NLP with Python."

# Step 1: Lowercase
text = text.lower()

# Step 2: Remove punctuation
text = text.translate(str.maketrans('', '', string.punctuation))

# Step 3: Tokenization
tokens = word_tokenize(text)

# Step 4: Remove stop words
stop_words = set(stopwords.words('english'))
tokens = [word for word in tokens if word not in stop_words]

# Step 5: Stemming
stemmer = PorterStemmer()
stemmed = [stemmer.stem(word) for word in tokens]

# Step 6: Lemmatization
lemmatizer = WordNetLemmatizer()
lemmatized = [lemmatizer.lemmatize(word) for word in tokens]

print("Tokens:", tokens)
print("Stemmed:", stemmed)
print("Lemmatized:", lemmatized)