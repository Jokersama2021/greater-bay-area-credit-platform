
import pandas as pd
import mysql.connector

# Replace with your actual file path
csv_file_path = 'path_to_your_csv_file.csv'

# Load the CSV file
df = pd.read_csv('D:\\vison-project3.0\\imooc-visualization-master\\企业数据分析 的副本.csv', encoding='gbk')

mydb = mysql.connector.connect(
  host="localhost",
  user="1113",
  password="1113",
  database="my_database"
)

cursor = db.cursor()

# Assuming your table is called 'financial_data' and it's already created with the proper structure
# Replace 'your_table_name' with the actual table name
insert_query = """
INSERT INTO your_table_name (stock_code, stock_name, indicator_name, indicator_value)
VALUES (%s, %s, %s, %s)
"""

# Loop through the dataframe and prepare data for insertion
for index, row in df.iterrows():
    # Replace 'column_names' with the actual column names from your CSV file
    stock_code = row['证券代码']
    stock_name = row['证券简称']

    # You might need to loop through each indicator for a single stock code and stock name
    for indicator_name in row.index[2:]:  # Skipping the first two columns
        indicator_value = row[indicator_name]
        cursor.execute(insert_query, (stock_code, stock_name, indicator_name, indicator_value))

# Commit the transaction
db.commit()

# Close the cursor and the connection
cursor.close()
db.close()
