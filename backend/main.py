import eel


#Import module that eel works
import model




eel.init('frontend/web', allowed_extensions=['.js', '.html', '.css'])


def onStart():
    print("Started APP")
  

def main():

    eel.start('index.html', port = 8080, shutdown_delay= 0.0, app_mode=True, close_callback= onStart())


if __name__ == '__main__':
    main()




