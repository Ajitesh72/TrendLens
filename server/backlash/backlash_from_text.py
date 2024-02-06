
import PIL.Image

import pathlib
import textwrap
from PIL import Image

import google.generativeai as genai

from IPython.display import display
from IPython.display import Markdown

def backlash_from_text(input_text):
    
    backlash="hii"
     # Or use `os.getenv('GOOGLE_API_KEY')` to fetch an environment variable.
    GOOGLE_API_KEY="AIzaSyCtHLluVa1-XYV_lKsYtTWtFftq8elrPHc"

    genai.configure(api_key=GOOGLE_API_KEY)

    model = genai.GenerativeModel('gemini-pro')
    user_data=input_text

    text_to_generate = f"generate the possiblity of backlash possiblity for this tweet: {user_data}.Give me a score of backlash possiblity(eg 0.2)  and the reason why it might face backlash"
    response = model.generate_content(text_to_generate)

    print(user_data)
    print(response.text)
    result=response.text
    return response.text