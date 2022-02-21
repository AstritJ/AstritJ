FROM jfloff/alpine-python:3.6-onbuild
COPY script.py script.py
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["python", "script.py"]