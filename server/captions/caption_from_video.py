# import av
# import numpy as np
# import torch
# from transformers import AutoImageProcessor, AutoTokenizer, VisionEncoderDecoderModel

# device = "cuda" if torch.cuda.is_available() else "cpu"

# # load pretrained processor, tokenizer, and model
# image_processor = AutoImageProcessor.from_pretrained("MCG-NJU/videomae-base")
# tokenizer = AutoTokenizer.from_pretrained("gpt2")
# model = VisionEncoderDecoderModel.from_pretrained("Neleac/timesformer-gpt2-video-captioning").to(device)

# def generate_video_caption(image_path):
#     # Or use `os.getenv('GOOGLE_API_KEY')` to fetch an environment variable.
#     # load video
#     # video_path = "/content/Screen Recording 2024-02-05 at 9.51.51 PM.mov"
#     video_path = image_path
#     container = av.open(video_path)
#     interval=5

#     # extract evenly spaced frames from video
#     seg_len = container.streams.video[0].frames
#     clip_len = model.config.encoder.num_frames
#     num_frames=int(seg_len/interval)
#     indices = set(np.linspace(0, seg_len, num=clip_len, endpoint=False).astype(np.int64))
#     frames = []
#     container.seek(0)
#     for i, frame in enumerate(container.decode(video=0)):
#         if i %interval == 0:
#             frames.append(frame.to_ndarray(format="rgb24"))
#             if len(frames)==num_frames:
#                 break;

#     # generate caption
#     gen_kwargs = {
#         "min_length": 10,
#         "max_length": 20,
#         "num_beams": 5,
#     }
#     pixel_values = image_processor(frames, return_tensors="pt").pixel_values.to(device)
#     tokens = model.generate(pixel_values, **gen_kwargs)
#     caption = tokenizer.batch_decode(tokens, skip_special_tokens=True)[0]
#     print(caption)

#     return caption