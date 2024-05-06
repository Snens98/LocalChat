from huggingface_hub import hf_hub_download
from llama_cpp import Llama
import sys
import eel
import os
import Global
import re







repo_id = "PrunaAI/Phi-3-mini-128k-instruct-GGUF-Imatrix-smashed"
model_file_name = "Phi-3-mini-128k-instruct.Q5_K_M.gguf"


model_file_name="tinyllama-1.1b-chat-v1.0.Q5_K_M.gguf"
repo_id="TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF"

model_file_name="Phi-3-mini-4k-instruct-q4.gguf"
repo_id="microsoft/Phi-3-mini-4k-instruct-gguf"

repo_id="lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF"
model_file_name="Meta-Llama-3-8B-Instruct-Q6_K.gguf"

template="|begin_of_text|><|start_header_id|>system<|end_header_id|>\n{SystemPrompt}<|eot_id|>\n\n<|start_header_id|>user<|end_header_id|>\n{UserPrompt}<|eot_id|>\n\n<|start_header_id|>assistant<|end_header_id|><|eot_id|>"




eel.init('web', allowed_extensions=['.js', '.html', '.css'])



def getPathToModelOrDownload():
    return hf_hub_download(repo_id=repo_id, filename=model_file_name, repo_type='model')




def createModelInstance():
    
    return Llama(
        model_path=getPathToModelOrDownload(),
        chat_format="llama-3",
        n_gpu_layers=-1,
        verbose=True, 
        n_batch=1024,
        n_ctx=7936,
        use_mmap=False,
        use_mlock=False,

        flash_attn=True,
        n_threads=8,
        n_threads_batch=8,
        last_n_tokens_size = 64
    )




@eel.expose
def get_slider_value(value):
    Global.set_Max_OutputToken(int(value))



@eel.expose
def loadModel():
    Global.set_LLM(createModelInstance())

    


@eel.expose
def isModelLoaded():

    result = False

    if Global.get_LLM() == None:
        result = False
    else:
        result = True
    print(result)
    return result




def startLLMProcess(input):

    if Global.get_LLM() == None:
        print("No model loaded!")


    if Global.get_LLM() != None:
        output = Global.get_LLM().create_chat_completion(
            max_tokens=Global.get_Max_OutputToken(),
            stream=True,
            messages = [
            {"role": "system", "content": "Du bist ein hilfreicher Assistent namens 'Diesel-Sören'. Deine Aufgabe ist es alle anliegen und Fragen des Nutzer ordnungsgemäß, nett und möglichst genau zu erfüllen. Antworte in einer angemessenen länge aber nicht zu lang. Beantworte nur die gestellte Frage, mehr nicht! Wenn du aufgeforderst wird ein bild zu erstellen oder darzustellen, stelle es mit markdown dar!"},
                {
                    "role": "user",
                    "content": input
                }
            ])
        
        text = ""
        for chunk in output:
            delta = chunk['choices'][0]['delta']
            if 'content' in delta:
                token = delta['content']
                print(token)
                text += token
                eel.writeLLMOutput(text)  # This calls the Javascript function
        print(text)






@eel.expose
def receiveTextAndEnter(text="", is_enter_pressed=False):
    input = text, is_enter_pressed
    Global.set_input_text(input[0])
    startLLMProcess(text)


@eel.expose
def unloadModel():
    Global.set_LLM(None)

        
        




def onStart():
    print("Started APP")


        

def main():

    eel.start('index.html', port = 8080, shutdown_delay= 0.0, app_mode=True, close_callback= onStart())





if __name__ == '__main__':
    main()




