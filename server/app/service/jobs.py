import os
import glob
import json
from flask import current_app as app


def _run_for_all(func):
    job_files = glob.glob(app.config['JOBS_DIR'] + '/*.json')
    for job_file in job_files:
        with open(job_file) as file:
            job = json.load(file)
            func(job)


def get_jobs_list():
    job_list = []

    def func(job):
        job_list.append({'name': job['name']})

    _run_for_all(func)

    return job_list


def get_job(name):
    jobs = []

    def func(job):
        if name == job['name']:
            jobs.append(job)

    _run_for_all(func)

    if len(jobs) >= 1:
        return jobs[0]
    return None


def update_job(name, data):
    pass
