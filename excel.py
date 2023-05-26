import pandas as pd

def excel_to_array(input_file):
    df = pd.read_excel(input_file)  # Read the Excel file
    data = []
    
    for row in df.itertuples(index=False):
        username = row[0]
        password = row[1]
        path = row[2]
        user_dict = {"username": username, "password": password,"path": path}
        data.append(user_dict)
    
    return data

# Example usage
input_file = "input.xlsx"  # Replace with the actual filename or path
result = excel_to_array(input_file)
print(result)
