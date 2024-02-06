from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS extension
from hashtags.hashtags_from_text import generate_tags_from_text  
from backlash.backlash_from_text import backlash_from_text
from captions.captions_from_image import generate_image_caption
# from captions.caption_from_video import generate_video_caption

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = '../static/uploads'

@app.route('/api/v1/Tags_generation/using_text', methods=['POST'])
def generate_tags():
    try:
        # Extract JSON data from the request
        data = request.get_json()

        # Access the 'input_text' from the request body
        input_text = data.get('input_text')
        result = generate_tags_from_text(input_text)
        # Perform any processing based on the input_text if needed

        # Return the response
        return jsonify({"response": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/v1/Backlash_generation/using_text', methods=['POST'])
def generate_backlash():
    try:
        # Extract JSON data from the request
        data = request.get_json()

        # Access the 'input_text' from the request body
        input_text = data.get('query_input')
        result = backlash_from_text(input_text)
        # Perform any processing based on the input_text if needed

        # Return the response
        return jsonify({"response": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/v1/code_generation/from_image', methods=['POST'])
def generate_code_from_image():
    try:
        print("hii")
        image_file = request.files['file']
        print(image_file)
        image_path = f"{UPLOAD_FOLDER}/uploaded_image.jpg"
        image_file.save(image_path)
        caption = generate_image_caption(image_path)
        # generated_code = generate_code_from_caption(caption)
        return jsonify({ "image_caption": caption})
    except:
        print("some error occured")
    
# @app.route('/api/v1/code_generation/from_video', methods=['POST'])
# def generate_code_from_video():
#     try:
#         print("hii")
#         image_file = request.files['file']
#         print(image_file)
#         video_path = f"{UPLOAD_FOLDER}/uploaded_video.mov"
#         image_file.save(video_path)
#         caption = generate_video_caption(video_path)
#         # generated_code = generate_code_from_caption(caption)
#         return jsonify({ "image_caption": caption})

#     except Exception as e:
#         return jsonify({"error":str(e)})

if __name__ == '__main__':
    app.run(debug=True)
