# CL Bulder #
**A open source local LLM powered cover letter creator**

![image](https://github.com/jasonpantoronto/CL-Builder/assets/172641020/dfc5b825-7763-4b98-932f-74384e38107e)

**Description:**
<br>
CL Builder allows you to expedite your cover letter creation processs by generating it using a LLM and outputing it as a formatted PDF ready to be subbited to your next job! All you have to do is enter simple information about you and copy paste the job description + your experience and a cover letter will be tailor made for you.


**Features:**
- Save your personal information to be used for future letters
- Automatic PDF export & formatting
- Letter tone tuning
- Letter length tuning
- User friendly web app UI

**Dependencies**
- Python 3.8 or above
- teknium/OpenHermes-2.5-Mistral-7B

**Method**
- CL-Builder is primarly build in JS with HTML serving as the frontend of the app
- The creation of PDF files is made possible using the jsPDF liberary from ajax
- JS fetch is used to make API calls to the server ran in Python
- The backend is a Python server built with the Flask framework
- The llama-cpp-python framework is used to host the open source LLM; OpenHermes-2.5-Mistral-7B.
