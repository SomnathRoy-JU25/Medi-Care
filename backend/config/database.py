from pymongo import MongoClient

client = MongoClient("mongodb+srv://somnathroy0340:nWXgQlhalZzcS12X@cluster0.okzjo3u.mongodb.net/?retryWrites=true&w=majority")


db = client.MediCare
collection_name1 = db["user"]
# collection_name2 = db[""]
