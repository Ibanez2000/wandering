import requests
import json
import gtts
import os
import pyzip
import re


def read_folders(path):
    return [name for name in os.listdir(path) if os.path.isdir(os.path.join(path, name))]


def askUserForVocabularyName():
    vocabularyName = input("Enter the name of the vocabulary: ");
    return vocabularyName; 

def read_js_file(path):
    with open(path, 'r') as f:
        data = f.read()

    # Add double quotes around keys to make it valid JSON
    data = re.sub(r'(\w+):', r'"\1":', data)

    # Parse the JSON string into a Python dictionary
    return json.loads(data)


def main():
    appDataPath = '/home/hauke/repos/wandering/files/apps/drillAppData/';
    appDataFolderContent = read_folders(appDataPath);

    print('Choose the deck to process:' + str(appDataFolderContent));
    #vocabularyName = askUserForVocabularyName();
    vocabularyName = 'GEWords';
    jsFilePath = str(appDataPath)+  str(vocabularyName)+ '/' +vocabularyName + '.js';
    data = read_js_file(jsFilePath);



# read the json file



main();

# vocabularyName = 'doranmon';

# response = requests.get('https://raw.githubusercontent.com/Ibanez2000/wandering/main/files/japanese/'+vocabularyName+'/'+vocabularyName+'.json');

# data = json.loads(response.content);

# key = 'doranmon';
# print(len(data[key]));

# #Create folder if does not exist
# if os.path.exists(key):
#   print('The directory exists.')
# else:
#   os.mkdir(key);

# #Create the Mp3s
# for i in range(0,len(data[key])):
#   text = data[key][i]['hiragana'];
#   tts = gtts.gTTS(text, lang="ja");
#   tts.save(os.path.join(key, str(i) + ".mp3"))


# # Get the current working directory.
# current_dir = os.getcwd()

# # Create a ZIP file object.
# zip_file = pyzip.ZipFile('all_mp3s.zip', 'w')

# # Iterate over all MP3 files in the `jlpt` directory.
# for file in os.listdir(os.path.join(current_dir, key)):
#   if file.endswith('.mp3'):
#     # Add the MP3 file to the ZIP file.
#     zip_file.write(os.path.join(key, file))

# # Close the ZIP file.
# zip_file.close()