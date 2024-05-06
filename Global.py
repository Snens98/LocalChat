# Globale Variable
input_text = ""
LLM = None
max_tokens = 512


# Funktion zum Setzen der globalen Variable
def set_input_text(text):
    global input_text
    input_text = text

# Funktion zum Abrufen der globalen Variable
def get_input_text():
    return input_text




def set_LLM(model):
    global LLM
    LLM = model

def get_LLM():
    return LLM




def set_Max_OutputToken(max_Output_tokens):
    global max_tokens
    max_tokens = max_Output_tokens

def get_Max_OutputToken():
    return max_tokens