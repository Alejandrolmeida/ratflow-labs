#!/usr/bin/env python3

import csv
import json
import os

def read_csv(file_path):
    with open(file_path, mode='r') as file:
        reader = csv.DictReader(file)
        return [row for row in reader]

def process_files():
    base_path = '../report/'
    advisor_data = read_csv(os.path.join(base_path, 'azqr_report_2025_02_26_T150613.advisor.csv'))
    costs_data = read_csv(os.path.join(base_path, 'azqr_report_2025_02_26_T150613.costs.csv'))
    services_data = read_csv(os.path.join(base_path, 'azqr_report_2025_02_26_T150613.services.csv'))
    defender_data = read_csv(os.path.join(base_path, 'azqr_report_2025_02_26_T150613.defender.csv'))

    result = [
        {
            "id": "1",
            "Name": "Boss Labs",
            "Subscription": "f2e4cd19-7c93-4a22-a9b3-df34a6e7c0af",
            "Tenant": "123e4567-e89b-12d3-a456-426614174000",
            "advisor": advisor_data,
            "costs": costs_data,
            "services": services_data,
            "defender": defender_data
        }
    ]

    with open('output.json', 'w') as json_file:
        json.dump(result, json_file, indent=4)

if __name__ == "__main__":
    process_files()
