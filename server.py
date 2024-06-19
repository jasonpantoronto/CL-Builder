from flask import Flask, render_template, request
from llama_cpp import Llama
from flask import jsonify
from flask_cors import CORS
import json

#Llama things 
llm = Llama(model_path="openhermes-2.5-mistral-7b.Q8_0.gguf", n_ctx=512, n_batch=126)

def generate_text(
    prompt="null",
    max_tokens=256,
    temperature=0.1,
    top_p=0.5,
    echo=False,
    stop=["#"],
):
    output = llm(
        prompt,
        max_tokens=max_tokens,
        temperature=temperature,
        top_p=top_p,
        echo=echo,
        stop=stop,
    )
    output_text = output["choices"][0]["text"].strip()
    return output_text

def generate_prompt_from_template(input):
    chat_prompt_template = f"""<|im_start|>system
You are a helpful chatbot.<|im_end|>
<|im_start|>user
{input}<|im_end|>"""
    return chat_prompt_template

#Llama things 

#Flask things
app = Flask(__name__)
CORS(app)#CORS stuff, if this isn't here Chrome will freak out. 

@app.route('/')
def index():
    return ("I am new to all this server API stuff I got no clue what I am suppose to do with this page yet.")

@app.route('/generate')
def generate():
    prompt = json.loads(request.args.get('prompt'))
    print("Prompt Log: "+prompt)#Log
    prompt = generate_prompt_from_template(prompt)#Formats the prompt
    result = str(generate_text(prompt, max_tokens=356))#Generates the prompt
    return jsonify({"result": result})

if __name__ == "__main__":
    app.run()
