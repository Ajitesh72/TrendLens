import textwrap

import google.generativeai as genai

from IPython.display import display
from IPython.display import Markdown


def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))


def generate_tags_from_text(input_text):
    # Or use `os.getenv('GOOGLE_API_KEY')` to fetch an environment variable.
    GOOGLE_API_KEY="AIzaSyCtHLluVa1-XYV_lKsYtTWtFftq8elrPHc"

    genai.configure(api_key=GOOGLE_API_KEY)

    model = genai.GenerativeModel('gemini-pro')
    user_data=input_text

    text_to_generate = f"generate hashtags on: {user_data}"
    response = model.generate_content(text_to_generate)

    print(user_data)
    print(response.text)
    result=response.text
    

    
    return result