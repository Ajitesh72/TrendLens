import PIL.Image

import pathlib
import textwrap
from PIL import Image

import google.generativeai as genai

from IPython.display import display
from IPython.display import Markdown


def to_markdown(text):
  text = text.replace('•', '  *')
  print("text is:",text)
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

def generate_image_caption(image_path):
    # Or use `os.getenv('GOOGLE_API_KEY')` to fetch an environment variable.
    print("hii there 1")
    raw_image = Image.open(image_path).convert('RGB')
    print("hii there")
    # img = PIL.Image.open(image_path)


    GOOGLE_API_KEY="AIzaSyCtHLluVa1-XYV_lKsYtTWtFftq8elrPHc"
    genai.configure(api_key=GOOGLE_API_KEY)

    model = genai.GenerativeModel('gemini-pro-vision')
    response = model.generate_content(raw_image)
    print(response.text)

    to_markdown(response.text) 

    model1 = genai.GenerativeModel('gemini-pro')
    text_to_generate = f"generate hashtags on: {response.text}"
    response1 = model1.generate_content(text_to_generate)
    to_markdown(response1.text)
    # print(tags.text)  

    return response1.text