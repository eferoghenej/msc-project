import json
import boto3
from boto3.dynamodb.conditions import Key

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('CurrencyRates')

def lambda_handler(event, context):
    # Scan the DynamoDB table
    response = table.scan()
    data = response.get('Items', [])
    
    # Return the items
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(data)
    }