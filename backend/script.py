import csv
from jobspy import scrape_jobs
import time
import requests
import json
def scraper():
    jobs = scrape_jobs(
        # site_name=["indeed", "zip_recruiter", "glassdoor", "google"],
        site_name=["indeed", "linkedin", "zip_recruiter", "glassdoor", "google"],
        search_term="software engineer",
        google_search_term="software engineer jobs near Delhi, India since yesterday",
        location="India",
        results_wanted=10,
#         results_wanted=10,
        hours_old=72,
        country_indeed='India',

#         linkedin_fetch_description=True, # gets more info such as description, direct job url (slower)
        #proxies=["208.195.175.46:65095", "208.195.175.45:65095", "localhost"],
    )
    print(f"Found {len(jobs)} jobs")
    jobs.to_csv("jobs.csv", quoting=csv.QUOTE_NONNUMERIC, escapechar="\\", index=False) # to_excel
    valid=['job_url','title','company','location','date_posted','description','site']
    final=jobs[valid]
    final=final.rename(columns={'job_url':'jobUrl','title':'role','date_posted':'datePosted','site':'source'})
    final['datePosted'] = final['datePosted'].astype(str)
    json_data=final.to_json(orient='records')
    json_list = json.loads(json_data)
    return json_list
def send_to_api(json_data, url):
    try:
        headers = {"Content-Type": "application/json"}
        response = requests.post(url, json=json_data, headers=headers)
        if response.status_code == 200:
            print("Data sent successfully:", response.json())
        else:
            print(f"Failed to send data: {response.status_code}, {response.text}")
    except Exception as e:
        print(f"An error occurred: {e}")
url='http://localhost:8080/api/jobs/addMultiple'
while(True):
    json_data=scraper()
    send_to_api(json_data, url)
    print("Task completed. Waiting for 3 hours...")
    time.sleep(3*60*60)#timeInSeconds
