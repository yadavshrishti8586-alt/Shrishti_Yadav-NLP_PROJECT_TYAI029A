# One-Hot Encoding Example

words = ["NLP", "Machine", "Learning"]

for i, word in enumerate(words):
    vector = [0] * len(words)
    vector[i] = 1
    print(word, ":", vector)

