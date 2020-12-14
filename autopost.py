from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
import time
import pyautogui

# from selenium.webdriver.common.action_chains import ActionChains
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support import expected_conditions as EC


chrome_option = webdriver.ChromeOptions()
chrome_option.add_argument('--incognito')
driver = webdriver.Chrome(
    executable_path="./chromedriver", options=chrome_option)

username = 'mellado827@gmail.com'
password = '6448d672'

driver.get("http:facebook.com/login")

emailInput = driver.find_element_by_id("email")
emailInput.send_keys(username)

passInput = driver.find_element_by_id("pass")
passInput.send_keys(password)
passInput.send_keys(Keys.ENTER)
time.sleep(5)

pyautogui.keyDown('ctrl')
pyautogui.keyDown('t')
pyautogui.keyUp('t')
pyautogui.keyUp('ctrl')
montevideoGroups = ["112863052073932", "897527373710221"]

for i in range(len(montevideoGroups)):
    link = 'http://facebook.com/groups/'+montevideoGroups[i]
    pyautogui.typewrite(link)
    pyautogui.typewrite('\n')

    # post = driver.find_element_by_xpath(
    #     "//div/span[contains(text(), 'your mind')]")
    # post.click()

    pyautogui.keyDown('ctrl')
    pyautogui.keyDown('enter')
    pyautogui.keyUp('enter')
    pyautogui.keyUp('ctrl')

    time.sleep(3)

    pyautogui.write(['f6'])
